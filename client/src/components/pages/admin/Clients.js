import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ACTIVE_CLIENTS } from "../../../utils/queries";
import { Link } from "react-router-dom";
export default function Clients() {
  const { loading, data, error, refetch } = useQuery(QUERY_ACTIVE_CLIENTS, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });
  const clients = data?.activeClients || [];
  console.log(data);

  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    console.log(clients);

    return (
      <>
        <h2>Client Management</h2>
        <div className="overflow-y">
          <table className="table-auto overflow-scroll w-full">
            <thead>
              <tr className="bg-accent text-white">
                <th className="px-3 py-2">First Name</th>
                <th className="px-3 py-2">Last Name</th>
                <th className="px-3 py-2">City</th>
                <th className=""></th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id}>
                  <td className="text-center">{client.firstName}</td>
                  <td className="text-center">{client.lastName}</td>
                  <td className="text-center">{client.city}</td>
                  <td className="text-center">
                    <Link
                      to={`/admin/clients/${client._id}`}
                      className="btn btn-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}
