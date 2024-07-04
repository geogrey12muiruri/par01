import { useEffect, useState } from "react";
import axios from "axios";

const ClientList = ({ onClientSelect }) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("/api/clients");
        setClients(response.data);
      } catch (error) {
        console.error("Error fetching clients:", error.message);
      }
    };

    fetchClients();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Clients</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Name</th>
            <th className="py-2">Email</th>
            <th className="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="py-2">{client.name}</td>
              <td className="py-2">{client.email}</td>
              <td className="py-2">
                <button
                  className="bg-blue-500 text-white px-4 py-1 rounded"
                  onClick={() => onClientSelect(client)}
                >
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientList;
