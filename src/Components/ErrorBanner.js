import React from "react";

const ErrorBanner = ({ message }) => {
  return <div style={{ color: "red", margin: "10px 0" }}>{message}</div>;
};

export default ErrorBanner;
