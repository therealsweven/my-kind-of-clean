import { React, useState } from "react";
import { Link } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import UpdatePhoneForm from "../forms/UpdatePhoneForm";
import UpdateEmailForm from "../forms/UpdateEmailForm";
import UpdateCommMethodForm from "../forms/UpdateCommMethodForm";
import UpdateSubscribeForm from "../forms/UpdateSubscribeForm";
import UpdateAddressForm from "../forms/UpdateAddressForm";
import UpdatePasswordForm from "../forms/UpdatePasswordForm";
import DestroyAccountForm from "../forms/DestroyAccountForm";
import { SEND_VERIFICATION_LINK } from "../../utils/mutations";

const Settings = () => {
  const [linkSent, setLinkSent] = useState(false);
  const { loading, data, error } = useQuery(QUERY_ME, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });
  const me = data?.me || [];

  const [sendVerificationLink] = useMutation(SEND_VERIFICATION_LINK);
  const handleSendLink = async () => {
    console.log(me._id);
    const { data } = await sendVerificationLink({
      variables: {
        clientId: me._id,
      },
    });
    setLinkSent(true);
  };

  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    // console.log(me);
    // console.log(data);

    return (
      <>
        <h1 className="text-info text-3xl my-3 text-center font-bold">
          Account Manager
        </h1>
        <table className="table-auto bg-info w-full">
          <tr className=" bg-primary">
            <h2 className=" text-xl font-bold py-3 ml-12">Personal Details</h2>
            <td> </td>
            <td> </td>
          </tr>
          <tr className="border-y border-secondary">
            <th className="">Name</th>
            <td className="py-6">{me.firstName + " " + me.lastName}</td>
            <td className=""></td>
          </tr>
          <tr className="border-y border-secondary">
            <th>Email</th>
            <div className="flex flex-col py-6">
              <td className="">{me.email} </td>
              {me.verified && <td className="text-xs">✅ Verified</td>}
              {!me.verified && !linkSent && (
                <td>
                  <button
                    className="text-xs underline"
                    onClick={handleSendLink}
                  >
                    Send Verification Link
                  </button>
                </td>
              )}
              {!me.verified && linkSent && (
                <td>
                  <p className="text-xs ">Verification Link Sent To Email</p>
                </td>
              )}
            </div>
            <td>
              <UpdateEmailForm />
            </td>
          </tr>
          <tr className="border-y border-secondary">
            <th>Phone</th>
            <td className="py-6">{me.phone} </td>
            <td>
              <UpdatePhoneForm />
            </td>
          </tr>
          <tr className="border-y border-secondary">
            <th className="text-wrap">Preferred Communication Method</th>
            <td className="py-6">{me.commMethod} </td>
            <td>
              <UpdateCommMethodForm me={me} />
            </td>
          </tr>
          <tr className="border-y border-secondary">
            <th>Mailing Address</th>
            <td className="py-6">
              <div className="flex flex-col">
                <p>{me.street}</p>
                <p>{me.city + ", " + me.state + " " + me.zip}</p>
              </div>{" "}
            </td>
            <td>
              <UpdateAddressForm />
            </td>
          </tr>
          <tr className="bg-primary">
            <h2 className=" text-xl font-bold py-3 ml-12">Account Security</h2>
            <td> </td>
            <td className="p-2"></td>
          </tr>
          <tr className="border-y border-secondary">
            <th className="text-wrap">Password</th>
            <td className="py-6"></td>
            <td>
              <UpdatePasswordForm />
            </td>
          </tr>
          <tr className="border-y border-secondary">
            <th className="text-wrap">Delete Account</th>
            <td className="py-6"></td>
            <td>
              <DestroyAccountForm />
            </td>
          </tr>
          <tr className="bg-primary">
            <h2 className=" text-xl font-bold py-3 ml-12">Email Preferences</h2>
            <td> </td>
            <td> </td>
          </tr>
          <tr className="border-y border-secondary">
            <th>Subscriptions</th>
            {me.subscribe && (
              <td>
                <p>You are subcribed to receive all newsletters,</p>
                <p>promotional offers, and emails regarding</p>
                <p>billing to your account.</p>
              </td>
            )}
            <td>
              <UpdateSubscribeForm me={me} />
            </td>
          </tr>
          <tr className="bg-primary">
            <h2 className=" text-xl font-bold py-3 ml-12">Legal Policies</h2>
            <td> </td>
            <td> </td>
          </tr>
          <tr className="border-y border-secondary">
            <th>Privacy Policy</th>
            <td className="py-6 underline">
              <Link>View Privacy Policy</Link>
            </td>
          </tr>
          <tr className="border-y border-secondary">
            <th>Cookie Policy</th>
            <td className="py-6 underline">
              <Link>View Cookie Policy</Link>
            </td>
          </tr>
          <tr className="border-y border-secondary">
            <th>Terms of Service</th>
            <td className="py-6 underline">
              <Link>Terms of Service</Link>
            </td>
          </tr>
        </table>
      </>
    );
  }
};

export default Settings;
