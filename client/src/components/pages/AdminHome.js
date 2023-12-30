import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_INQUIRIES } from "../../utils/queries";
//import { UPDATE_CLIENT } from "../utils/mutations";
export default function AdminHome() {
  //const [updateCLient] = useMutation(UPDATE_CLIENT);
  const { loading, data, error } = useQuery(QUERY_INQUIRIES, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });
  const inquiries = data?.inquiries || [];

  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    console.log(inquiries);

    return <>TEST QUERY CHECK CONSOLE</>;
  }
}
