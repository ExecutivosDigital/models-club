import { DashBoardLayoutProvider } from "@/components/dashboard-layout";
import moment from "moment";
import "moment/locale/pt-br";
import { Inter } from "next/font/google";
import "./globals.css";
moment.locale("pt-br");

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: {
    default: "Models Club",
  },
  icons: {
    icon: "/icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body className={`${inter.variable} bg-stone-950 text-neutral-300`}>
        <DashBoardLayoutProvider>{children}</DashBoardLayoutProvider>
      </body>
    </html>
  );
}
