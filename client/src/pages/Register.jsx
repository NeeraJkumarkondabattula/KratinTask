import React, { useState } from "react";
import styled from "styled-components";
import medicate from "../assets/Medicate-logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Circles } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { closeLoader, showLoader } from "../redux/alertReducer";

const Register = () => {
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirm_Password] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      dispatch(showLoader());
      await axios
        .post("http://localhost:3433/api/user/register", {
          name,
          email,
          phone,
          password,
          confirm_password,
        })
        .then(() => {
          dispatch(closeLoader());
        });
      toast.success("Registration Success");
      setName("");
      setPhone("");
      setPassword("");
      setConfirm_Password("");
      setEmail("");
      setPassword("");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      dispatch(closeLoader());
      setTimeout(() => {
        toast.error(err.response.data.message);
      }, 0);
    }
  };

  return (
    <>
      {loading ? (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      ) : (
        <Container>
          <Toaster position="top-center" reverseOrder={false} />
          <img src={medicate} alt="" className="logo" />
          <form onSubmit={handleSubmit}>
            <h1>Registration</h1>
            <input
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Enter your email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Enter your phone number..."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter your password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              value={confirm_password}
              placeholder="Enter your confirm password..."
              onChange={(e) => setConfirm_Password(e.target.value)}
            />
            <button>Register</button>
            <p>
              Already have an account? <Link to={"/login"}>Login</Link>
            </p>
          </form>
        </Container>
      )}
    </>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  background-color: white;
  border-radius: 0.5rem;
  .logo {
    width: 6rem;
  }
  form {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    background-color: white;
    h1 {
      color: #42b883;
    }
    input {
      width: 300px;
      height: 30px;
      padding: 10px;
      border: 1px solid #42b883;
      outline: none;
    }

    button {
      padding: 0.4rem 3rem;
      background-color: #42b883;
      font-weight: 600;
      border: none;
      outline: none;
      color: white;
    }
  }
`;

export default Register;
