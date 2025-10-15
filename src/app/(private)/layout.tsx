import { DashBoardLayoutProvider } from "@/components/dashboard-layout";
import { PrivateHeader } from "@/components/ui/private-header";
import { ModelContextProvider } from "@/context/ModelContext";
import { UserProfileContextProvider } from "@/context/UserProfileContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DashBoardLayoutProvider>
      <UserProfileContextProvider>
        <ModelContextProvider>
          <PrivateHeader />
          {children}
        </ModelContextProvider>
      </UserProfileContextProvider>
    </DashBoardLayoutProvider>
  );
}
