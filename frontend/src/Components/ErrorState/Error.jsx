import React from "react";

const Error = () => {
  return (
    <div className="text-center p-10">
      <h1 className="text-3xl font-bold text-red-500">Something went wrong!</h1>
      <p className="text-lg mt-4">
        Please try refreshing the page or go back to home.
      </p>
    </div>
  );
};

export default Error;
