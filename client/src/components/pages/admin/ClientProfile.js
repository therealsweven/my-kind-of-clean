import { React, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { QUERY_CLIENT_BY_ID } from "../../../utils/queries";
import UpdateClientForm from "./forms/UpdateClientForm";
export default function ClientProfile() {
  let [openUpdateClientForm, setOpenUpdateClientForm] = useState(false);
  let { clientId } = useParams();

  const { loading, data, error, refetch } = useQuery(
    QUERY_CLIENT_BY_ID,
    { variables: { clientId } },
    {
      onCompleted: (data) => console.log("Query completed:", data),
      onError: (error) => console.error("Query error:", error),
    }
  );
  const client = data?.clientById || [];

  // Update Client
  // show form
  const showUpdateClientForm = () => {
    setOpenUpdateClientForm((showUpdateContactForm) => !showUpdateContactForm);
  };
  //hide form
  const closeUpdateClientForm = () => {
    setOpenUpdateClientForm(false);
    refetch();
  };

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
        <Link to="/admin/clients" className="btn btn-sm mt-6 ml-6">
          Back
        </Link>
        <h1 className="text-2xl text-center">
          {client.firstName + " " + client.lastName}
        </h1>
        <div id="personalDetails border-bottom">
          <div className="flex justify-between p-5 px-24">
            <h2 className="text-xl">Personal Details</h2>
            <button
              id="updateClientBtn"
              className="btn btn-sm"
              onClick={() => showUpdateClientForm(true)}
            >
              Edit
            </button>
          </div>
          <div className="flex justify-center">
            <table className="bg-accent w-11/12 text-center mb-6">
              <tbody>
                <tr>
                  <td className="py-6">First </td>
                  <td className="px-3">{client.firstName}</td>
                </tr>
                <tr>
                  <td className="py-6">Last </td>
                  <td className="px-3">{client.lastName}</td>
                </tr>
                <tr>
                  <td className="py-6">Email </td>
                  <td>
                    <a
                      className="hover:underline px-3"
                      href={"mailto:" + client.email}
                    >
                      {client.email}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-6">Phone </td>
                  <td>
                    <a
                      href={"tel:" + client.phone}
                      className="hover:underline px-3"
                    >
                      {"(" +
                        client.phone.slice(0, 3) +
                        ") " +
                        client.phone.slice(3, 6) +
                        "-" +
                        client.phone.slice(6, 10)}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="py-6">Preffered Comm Method</td>
                  <td className="px-3">{client.commMethod}</td>
                </tr>
                <tr>
                  <td className="py-6">Address</td>
                  <td>
                    <div className="px-3">
                      <p>{client.street}</p>
                      {client.street2 ? <p>{client.street2}</p> : <></>}
                      <p>
                        {client.city + ", " + client.state + " " + client.zip}
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* Update Client Form */}
        {openUpdateClientForm && (
          <UpdateClientForm client={client} close={closeUpdateClientForm} />
        )}
      </>
    );
  }
}
