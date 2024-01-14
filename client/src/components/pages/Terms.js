import { React, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
//import { Document, Page } from "react-pdf/dist/esm/";
//import { Link } from "react-router-dom";
//import { useQuery } from '@apollo/client';

const Terms = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <>
      <h1 className="text-info text-3xl my-3 text-center">
        Terms & Conditions
      </h1>
      <div className="flex flex-col align-middle">
        <nav className="flex justify-evenly my-3">
          <button className="btn btn-info text-primary" onClick={goToPrevPage}>
            Prev
          </button>
          <button className="btn btn-info text-primary" onClick={goToNextPage}>
            Next
          </button>
        </nav>
        <p className="text-center my-2">
          Page {pageNumber} of {numPages}
        </p>
        <div className="flex justify-center">
          <Document file="/terms.pdf" onLoadSuccess={onDocumentLoadSuccess}>
            <Page pageNumber={pageNumber} />
          </Document>
        </div>
      </div>
    </>
  );
};

export default Terms;
