
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-blue-50 to-blue-100 py-8">
      <h1 className="text-3xl font-bold mb-8 text-blue-900">Minha Conta</h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
