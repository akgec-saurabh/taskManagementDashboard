import { useState } from "react";

export const useHttpClient = () => {
  const [loading, setLoding] = useState(false);
  const [error, setError] = useState();

  const sendReq = async (url, method = "GET", headers = {}, body = null) => {
    try {
      setLoding(true);
      const response = await fetch(url, {
        method,
        headers,
        body,
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.message || "Unable to Fetch Data");
      }

      setLoding(false);
      return responseData;
    } catch (error) {
      //   console.log( error);
      setError(error.message);
      setLoding(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  return {
    sendReq,
    loading,
    error,
    clearError,
  };
};
