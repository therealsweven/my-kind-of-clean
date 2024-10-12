import React from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_INQUIRIES } from "../../../utils/queries";
import { MARK_RESPONDED } from "../../../utils/mutations";
import { DELETE_INQUIRY } from "../../../utils/mutations";
export default function Inquiries() {
  const [markResponded] = useMutation(MARK_RESPONDED);
  const [deleteInquiry] = useMutation(DELETE_INQUIRY);
  const { loading, data, error, refetch } = useQuery(QUERY_INQUIRIES, {
    onCompleted: (data) => console.log("Query completed:", data),
    onError: (error) => console.error("Query error:", error),
  });
  const inquiries = data?.inquiries || [];
  console.log(data);

  if (loading) {
    return <h2>...loading</h2>;
  }
  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  if (!loading) {
    console.log(inquiries);

    const markInquiryResponded = async (event) => {
      console.log(event.target.id);
      await markResponded({
        variables: {
          inquiryId: event.target.id,
        },
      });
      refetch();
    };
    const markInquiryInactive = async (event) => {
      console.log(event.target.id);
      await deleteInquiry({
        variables: {
          inquiryId: event.target.id,
        },
      });
      refetch();
    };

    return (
      <>
        <h2 className="my-3 text-center text-2xl">Inquiries</h2>
        <div className="flex flex-wrap justify-center">
          {inquiries.map((inquiry) => (
            <div
              className="border border-accent rounded-lg bg-accent m-2 p-3 max-w-xl"
              key={inquiry._id}
            >
              <p>
                <b>Date of Inquiry: </b>
                {new Date(parseInt(inquiry.createdAt, 10)).toDateString()}
              </p>
              <p>
                <b>Name: </b>
                {inquiry.name}
              </p>
              <p>
                <b>Email: </b>
                <a className="hover:underline" href={"mailto:" + inquiry.email}>
                  {inquiry.email}
                </a>
              </p>
              <p>
                <b>Phone: </b>
                <a href={"tel:" + inquiry.phone} className="hover:underline">
                  {"(" +
                    inquiry.phone.slice(0, 3) +
                    ") " +
                    inquiry.phone.slice(3, 6) +
                    "-" +
                    inquiry.phone.slice(6, 10)}
                </a>
              </p>
              <p>
                <b>Comm: </b>
                {inquiry.commMethod}
              </p>
              <p>
                <b>Location: </b>
                {inquiry.location}
              </p>
              <p>
                <b>Message: </b> {inquiry.message}
              </p>
              <p>
                <b>Responded to: </b>
                {inquiry.responded ? "yes" : "no"}
              </p>
              {inquiry.responded ? (
                <></>
              ) : (
                <button
                  id={inquiry._id}
                  className="btn border border-accent rounded-lg"
                  onClick={markInquiryResponded}
                >
                  Mark Responded
                </button>
              )}
              <button
                id={inquiry._id}
                className="btn border border-accent rounded-lg"
                onClick={markInquiryInactive}
              >
                DELETE INQUIRY
              </button>
            </div>
          ))}
        </div>
      </>
    );
  }
}
