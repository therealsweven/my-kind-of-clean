import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_CLIENT_BY_ID } from "../../../utils/queries";
import UpdateClientForm from "./forms/UpdateClientForm";
export default function ClientProfile() {
  let { clientId } = useParams();

  const { loading, data, error } = useQuery(
    QUERY_CLIENT_BY_ID,
    { variables: { clientId } },
    {
      onCompleted: (data) => console.log("Query completed:", data),
      onError: (error) => console.error("Query error:", error),
    }
  );
  const client = data?.clientById || [];
  console.log(data);
  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    console.log(client);
    return (
      <>
        <Link to="/admin/clients" className="btn btn-sm">
          Back
        </Link>
        <h1 className="text-2xl">{client.firstName + " " + client.lastName}</h1>
        <div id="personalDetails border-bottom">
          <div className="flex">
            <h2>Personal Details</h2>
            <button className="btn btn-sm">Edit</button>
          </div>
          <table>
            <tr>
              <td>First </td>
              <td className="px-3">{client.firstName}</td>
            </tr>
            <tr>
              <td>Last </td>
              <p className="px-3">{client.lastName}</p>
            </tr>
            <tr>
              <td>Email </td>
              <a
                className="hover:underline px-3"
                href={"mailto:" + client.email}
              >
                {client.email}
              </a>
            </tr>
            <tr>
              <td>Phone </td>
              <a href={"tel:" + client.phone} className="hover:underline px-3">
                {"(" +
                  client.phone.slice(0, 3) +
                  ") " +
                  client.phone.slice(3, 6) +
                  "-" +
                  client.phone.slice(6, 10)}
              </a>
            </tr>
            <tr>
              <td>Address</td>
              <td>
                <div className="px-3">
                  <p>{client.street}</p>
                  {client.street2 ? <p>{client.street2}</p> : <></>}
                  <p>{client.city + ", " + client.state + " " + client.zip}</p>
                </div>
              </td>
            </tr>
          </table>
        </div>
        <UpdateClientForm client={client} />
      </>
    );
  }
}
