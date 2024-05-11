import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router-dom";
import { QUERY_CLIENT_BY_ID } from "../../../utils/queries";
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
  const client = data?.client || [];
  console.log(data);
  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    return (
      <>
        <h2>{client.firstName}</h2>
      </>
    );
  }
}
