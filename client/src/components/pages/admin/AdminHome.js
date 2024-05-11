import React from "react";
import Inquiries from "./Inquiries";
// import { useQuery, useMutation } from "@apollo/client";
// import { QUERY_INQUIRIES } from "../../../utils/queries";
//import { UPDATE_CLIENT } from "../utils/mutations";
export default function AdminHome() {
  //const [updateCLient] = useMutation(UPDATE_CLIENT);
  // const { loading, data, error } = useQuery(QUERY_INQUIRIES, {
  //   onCompleted: (data) => console.log("Query completed:", data),
  //   onError: (error) => console.error("Query error:", error),
  // });
  // const inquiries = data?.inquiries || [];

  return (
    <>
      <h1 className="text-2xl text-center">ADMIN CONSOLE</h1>
      <Inquiries />
    </>
  );
}
