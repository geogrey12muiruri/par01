import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ClientDetails = ({ client }) => {
  const [measurements, setMeasurements] = useState({});
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchClientDetails = async () => {
      try {
        const measurementsResponse = await axios.get(`/api/clients/${client.id}/measurements`);
        setMeasurements(measurementsResponse.data);

        const ordersResponse = await axios.get(`/api/clients/${client.id}/orders`);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error("Error fetching client details:", error.message);
      }
    };

    fetchClientDetails();
  }, [client.id]);

  const handleEmailClient = async () => {
    try {
      await axios.post(`/api/clients/${client.id}/email`, { measurements, orders });
      toast.success("Email sent successfully!");
    } catch (error) {
      toast.error("Error sending email");
      console.error("Error sending email:", error.message);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Client Details</h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Measurements</h3>
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          {Object.keys(measurements).length ? (
            <div>
              {Object.keys(measurements).map((apparel) => (
                <div key={apparel}>
                  <h4 className="text-lg font-semibold capitalize">{apparel}</h4>
                  <ul>
                    {Object.keys(measurements[apparel]).map((measurement) => (
                      <li key={measurement}>
                        {measurement}: {measurements[apparel][measurement]}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ) : (
            <p>No measurements available</p>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Orders</h3>
        <div className="bg-gray-800 text-white p-4 rounded-lg">
          {orders.length ? (
            <ul>
              {orders.map((order) => (
                <li key={order.id}>Order ID: {order.id}</li>
              ))}
            </ul>
          ) : (
            <p>No orders available</p>
          )}
        </div>
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleEmailClient}
      >
        Email Client
      </button>
    </div>
  );
};

export default ClientDetails;
