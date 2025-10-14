import { DashBoardLayoutProvider } from "@/components/dashboard-layout";
import { PrivateHeader } from "@/components/ui/private-header";
import { UserProfileContextProvider } from "@/context/UserProfileContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashBoardLayoutProvider>
      <UserProfileContextProvider>
        <PrivateHeader />
        {children}
      </UserProfileContextProvider>
    </DashBoardLayoutProvider>
  );
}
