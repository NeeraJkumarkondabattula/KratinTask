import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";
import styled from "styled-components";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { WiTime11 } from "react-icons/wi";
import { RiShieldStarLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { closeLoader, showLoader } from "../redux/alertReducer";
import { useNavigate, useParams } from "react-router-dom";

const Doctor = () => {
  const [doctor, setDoctor] = useState();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    async function fetch() {
      // dispatch(showLoader());
      await axios
        .get(`http://localhost:3433/api/user/doctor/${id}`)
        .then((res) => {
          setDoctor(res.data.doctor);
          // dispatch(closeLoader());
        });
    }
    fetch();
  }, []);

  const handleAppointment = async () => {
    async function getData() {
      // dispatch(showLoader());
      await axios
        .post(`http://localhost:3433/api/user/bookappointment/${doctor._id}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          navigate("/appointments");
          // dispatch(closeLoader());
          // setUser(res.data.user);
        });
    }
    getData();
  };

  return (
    <Container>
      {doctor && (
        <div onClick={() => navigate(`/doctor/${doctor._id}`)}>
          <h3>{doctor.firstName + " " + doctor.lastName}</h3>
          <h4>
            <RiShieldStarLine />
            {doctor.specialization}
          </h4>
          <br />
          <p>
            <MdAlternateEmail />
            {doctor.email}
          </p>
          <p>
            <FaPhone />
            {doctor.phone}
          </p>
          <p>
            <WiTime11 />
            <p>
              {doctor.fromTime} - {doctor.toTime}
            </p>
          </p>
          <br />
          <button
            onClick={handleAppointment}
            style={{
              padding: "5px 20px",
              color: "white",
              backgroundColor: "#2a2438",
              outline: "none",
              border: "none",
              fontWeight: "600",
            }}>
            Book Appointments
          </button>
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
export default Doctor;
