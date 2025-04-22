
import Dashboard from "@/components/Dashboard";

const DashboardPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-white py-12">
      <h1 className="text-2xl md:text-3xl font-light mb-8 text-gray-900 tracking-tight">
        Minha Conta
      </h1>
      <Dashboard />
    </div>
  );
};

export default DashboardPage;
