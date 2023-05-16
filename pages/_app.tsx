import React from "react";
import "../styles/globals.css";
import MatrixAnimation from "../components/MatrixAnimation";
import { AppProps } from "next/app";
import { useRouter } from "next/router";

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const router = useRouter();

  // Переадресація на /users при запуску сервера
  React.useEffect(() => {
    router.push("/users");
  }, []);

  return (
    <>
      <MatrixAnimation />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
