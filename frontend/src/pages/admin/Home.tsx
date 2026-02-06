import { useAuth } from "../../hooks/useAuth";
import { DashboardLayout } from "../../components/dashboard/DashboardLayout";

export function Home() {
  const { user } = useAuth();
  return (
    <>
      <DashboardLayout>
        <div>
            <h1>
              Bienvenue {user?.firstName ? user.firstName.charAt(0).toUpperCase() + user.firstName.slice(1) : ""}!
            </h1>
        </div>
      </DashboardLayout>
      

    
    </>
  );
}
