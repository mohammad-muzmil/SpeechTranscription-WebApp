import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import CryptoJS from "crypto-js";
import axios from "axios";
import { auth, provider } from "../firebaseConfig";
import { Button } from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const secureKey = process.env.REACT_APP_SECURE_KEY;

  const handleLogin = useCallback(async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const data = result?.user;

      // You can access user details here
      // const { email, displayName, photoURL, uid } = user;
      const user = data?.providerData[0];
      console.log(user, "user");
      // Optionally call your API
      const response = await loginAPI(user);
      if (response?.data?.stored_data?.user_id) {
        navigate("/Home");
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(response?.data?.stored_data),
          secureKey
        ).toString();
        localStorage.setItem("user", encryptedData);
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  }, [navigate]);

  const loginAPI = async (payload) => {
    try {
      const response = await axios.post(
        `http://192.168.1.81:5050/store_user`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error during API call:", error);
      throw error;
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "20%",
        }}
      >
        <Button onClick={handleLogin} variant="contained">
          Sign in with Google
        </Button>
      </div>
    </>
  );
};

export default Login;
