import "@/styles/globals.css";
import { AuthContextComponent } from "@/contexts/authContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextComponent>
      <Component {...pageProps} />
    </AuthContextComponent>
  );
}
