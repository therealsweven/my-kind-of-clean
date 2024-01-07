import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { VERIFY_EMAIL } from "../../utils/mutations";

const VerifyEmail = () => {
  const [isValidToken, setIsValidToken] = useState(false);

  const [verifyEmail] = useMutation(VERIFY_EMAIL);
  let { _id } = useParams();
  let { emailToken } = useParams();

  async function verifyEmailToken() {
    console.log(_id, emailToken);
    await verifyEmail(_id, emailToken);
  }

  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">VerifyEmail</h1>
      <p>id=${_id}</p>
      <p>token=${emailToken}</p>
      <button onClick={verifyEmailToken}>VERIFY EMAIL</button>
    </>
  );
};

export default VerifyEmail;
