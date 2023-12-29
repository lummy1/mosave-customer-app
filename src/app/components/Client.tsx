"use client";
import React, { useEffect } from "react";
import { Inter } from "next/font/google";
import ReduxProvider from "@/redux/provider/provider";
import Head from "next/head";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { redirect, useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import { Provider, useSelector } from "react-redux";
import { RootState, store } from "@/redux/store/store";
import { RedirectType } from "next/dist/client/components/redirect";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  return {
    props: {
      heading: "The best headlines around!",
      details: "This response is static.",
    },
  };
}

const Client = (
  { children }: { children: React.ReactNode },
  heading: string = "Moloyal Page"
) => {
  //   const { user } = useAuth();
  const user = useSelector((state: RootState) => state.auth.user);
  console.log(user);
  const router = useRouter();

  useEffect(() => {
    console.log("reach client outside");
    // Redirect to login if user is not logged in
    if (!user || user == null) {
      console.log("reach client inside");
      //router.push("/auth/login");
      redirect("/auth/login", "replace" as RedirectType);
    }
  }, [router]);

  return (
    // <ReduxProvider>
    <>
      <html lang="en">
        <Head>
          <title id="title">{heading}</title>
          <link rel="icon" href="../moloyal.ico" />
        </Head>
        <body className={`${inter.className}`} suppressHydrationWarning={true}>
          <ToastContainer />
          <ReduxProvider>{children}</ReduxProvider>
        </body>
      </html>
    </>
    // </ReduxProvider>
  );
};
export default Client;
