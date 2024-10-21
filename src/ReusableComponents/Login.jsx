import axios from "axios";
import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const APIURL = window?.location.hostname;
  let protocol = window.location.protocol;
  const REACT_APP_GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;
  const CryptoJS = require("crypto-js");
  const navigate = useNavigate();
  const secureKey = process.env.REACT_APP_SECURE_KEY;
  const handleCallbackResponse = useCallback(async (response) => {
    // The response includes a JWT token with user info
    console.log("Encoded JWT ID token: ", response.credential);

    // You can decode the JWT to get user information
    const decodedToken = JSON.parse(atob(response.credential.split(".")[1]));
    console.log("Decoded user info:", decodedToken);

    // Access user details
    const { email, name, picture, sub: userId } = decodedToken;

    if (decodedToken) {
      const response = await loginAPI(decodedToken);
      console.log(response, "response");
      if (response?.data?.stored_data?.user_id) {
        navigate("/Home");
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response?.data?.stored_data),
          secureKey
        ).toString();
        localStorage.setItem("user", encryptedData);
      }
    }
  }, []);

  useEffect(() => {
    // Load the Google Identity Services script
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      // Initialize Google Identity Services
      window.google.accounts.id.initialize({
        client_id: REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCallbackResponse,
      });

      // Render the Google Sign-In button
      window.google.accounts.id.renderButton(
        document.getElementById("google-signin-button"),
        {
          theme: "outline",
          size: "medium",
          type: "standard",
        }
      );

      // Optionally, display the One Tap dialog
      window.google.accounts.id.prompt();
    };

    // Cleanup
    return () => {
      document.body.removeChild(script);
    };
  }, [handleCallbackResponse]);
  const loginAPI = async (payload) => {
    try {
      const response = await axios.post(
        `http://192.168.1.81:5050/store_user`,
        payload,
        {
          headers: {
            "Content-Type": "application/json", // Set content type to JSON
          },
        }
      );
      console.log(response, "response");
      return response.data; // Return the response data if needed
    } catch (error) {
      console.error("Error during API call:", error);
      throw error; // Optionally re-throw the error for further handling
    }
  };
  return (
    <div>
      {/* The button will be rendered inside this div */}
      <div id="google-signin-button"></div>
    </div>
  );
};

export default Login;
