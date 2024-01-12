import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
//import { Link } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import { VERIFY_EMAIL, SEND_VERIFICATION_LINK } from "../../utils/mutations";
import { QUERY_USER_BY_ID } from "../../utils/queries";

const VerifyEmail = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const [needNewLink, setNeedNewLink] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const [verifyEmail] = useMutation(VERIFY_EMAIL);
  const [sendVerificationLink] = useMutation(SEND_VERIFICATION_LINK);
  let { clientId } = useParams();
  let { emailToken } = useParams();

  const { loading, data, error } = useQuery(
    QUERY_USER_BY_ID,
    { variables: { clientId } },
    {
      onCompleted: (data) => console.log("Query completed:", data),
      onError: (error) => console.error("Query error:", error),
    }
  );
  const client = data?.clientById || [];
  console.log(client.verified);
  const alreadyVerified = client.verified;

  if (loading) {
    return <h2>...loading</h2>;
  }

  async function verifyEmailToken() {
    console.log(clientId, emailToken);
    const response = await verifyEmail({ variables: { clientId, emailToken } });
    console.log(response.data.verifyEmail.verified);
    if (response.data.verifyEmail.verified === true) {
      setIsValidToken(true);
    } else {
      setNeedNewLink(true);
    }
  }

  const handleSendLink = async () => {
    const response = await sendVerificationLink({ variables: { clientId } });
    console.log(response);
    setLinkSent(true);
  };

  if (!alreadyVerified && !isValidToken) {
    return (
      <>
        <h1 className="text-info text-3xl my-3 text-center">
          Verify Your Email Address
        </h1>
        <p className="text-info text-xl my-3 text-center">
          Click the button below to verify your email address
        </p>
        <div className="flex justify-center">
          <button
            className="text-3xl btn btn-accent my-3"
            onClick={verifyEmailToken}
          >
            VERIFY
          </button>
        </div>
      </>
    );
  }

  if (isValidToken && !alreadyVerified) {
    return (
      <h1 className="text-info text-3xl my-3 text-center">
        Thanks for verifying your email address.
      </h1>
    );
  }

  if (alreadyVerified) {
    return (
      <h1 className="text-info text-3xl my-3 text-center">
        You've already verified your email address.
      </h1>
    );
  }

  if (needNewLink) {
    return (
      <>
        <h2 className="text-info text-2xl my-3 text-center">
          Sorry! Your verification link is expired; please click below to send a
          new one.
        </h2>
        <button className="btn btn-accent text-xl" onClick={handleSendLink}>
          Send New Link
        </button>
      </>
    );
  }
  if (linkSent) {
    return (
      <>
        <h2 className="text-info text-2xl my-3 text-center">
          A new verification link has been sent to your email, please check your
          inbox.
        </h2>
      </>
    );
  }
};

export default VerifyEmail;
