import "./globals.css";
import type { Metadata } from "next";
import Client from "./components/Client";
import ReduxProvider from "@/redux/provider/provider";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { useRouter } from "next/navigation";

export const metadata: Metadata = {
  title: "Moloyal Web",
  description: "Moloyal app for savings and ticketing",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const user = useSelector((state: RootState) => state.auth.user);
  // console.log(user);
  // const router = useRouter();

  return (
    <ReduxProvider>
      <Client>{children}</Client>
    </ReduxProvider>
  );
}
