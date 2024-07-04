import { useState } from "react";
import ClientList from "./ClientList";
import ClientDetails from "./ClientDetails";

const Dashboard = () => {
  const [selectedClient, setSelectedClient] = useState(null);

  const handleClientSelect = (client) => {
    setSelectedClient(client);
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <nav className="bg-gray-800 text-white w-1/4 py-4 px-6">
        <ul className="space-y-4">
          <li className="font-semibold">Dashboard</li>
          <li className="cursor-pointer">Clients</li>
          <li className="cursor-pointer">Orders</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {!selectedClient ? (
          <ClientList onClientSelect={handleClientSelect} />
        ) : (
          <ClientDetails client={selectedClient} />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
