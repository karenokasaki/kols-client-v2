import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../pages/api/api";
import Navbar from "./Navbar";

export default function Dashboard() {
  const [isLoading, setIsloading] = useState(true);
  const [user, setuser] = useState({});

  useEffect(() => {
    async function fetchBusiness() {
      try {
        const response = await api.get("/users/profile");
        setuser({ ...response.data });
        setIsloading(false);
        localStorage.removeItem("loggedInBusiness"); // toda vez que clica no dashboard, limpa o localStorage
      } catch (error) {
        console.error(error);
      }
    }
    fetchBusiness();
  }, []);

  return (
    <>
      <Navbar nav={{ name: "Dashboard", href: "/business", current: true }} />

      <header className="bg-white shadow">
        <div className="flex justify-between max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <button
            type="button"
            className=" inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            <Link href={`/business/create-business`}> + CRIAR UMA EMPRESA</Link>
          </button>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Replace with your content */}
          <div className="flex justify-evenly px-4 py-6 sm:px-0">
            {!isLoading &&
              user.business.map((cE) => {
                return (
                  <div key={cE._id}>
                    {cE.businessIsActive && (
                      <div key={cE._id} className="flex justify-center">
                        <div className="rounded-lg shadow-lg bg-white max-w-sm">
                          <div className="flex justify-center">
                            <img
                              width="100px"
                              height="100px"
                              className="rounded-t-lg flex"
                              src={cE.businessImg}
                              alt="Logo"
                            />
                          </div>
                          <div className="p-6 text-center">
                            <h5 className="text-gray-900 text-xl font-medium mb-2">
                              {cE.name}
                            </h5>
                            <p className="text-gray-700 text-base mb-4">
                              Razão Social: {cE.corporateName}
                            </p>
                            <p className="text-gray-700 text-base mb-4">
                              CNPJ: {cE.cnpj}
                            </p>
                            <button
                              type="button"
                              onClick={() =>
                                localStorage.setItem(
                                  "loggedInBusiness",
                                  JSON.stringify(cE._id)
                                )
                              }
                              className=" inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out"
                            >
                              <Link href={`/business/${cE._id}`}> Entrar</Link>
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                localStorage.setItem(
                                  "loggedInBusiness",
                                  JSON.stringify(cE._id)
                                )
                              }
                              className=" inline-block px-6 py-2.5 bg-emerald-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-emerald-700 hover:shadow-lg focus:bg-emerald-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-emerald-800 active:shadow-lg transition duration-150 ease-in-out ml-8"
                            >
                              <Link href={`/business/update/${cE._id}`}>
                                {" "}
                                Editar
                              </Link>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
}
