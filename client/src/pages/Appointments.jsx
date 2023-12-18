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
import { RxCross2 } from "react-icons/rx";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState();
  useEffect(() => {
    async function fetch() {
      await axios
        .post("http://localhost:3433/api/user/appointments", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          setAppointments(res.data.userBookedAppointments);
        });
    }
    fetch();
  }, []);

  const handleCancelAppointment = async (id) => {
    console.log(id);
    async function getData() {
      // dispatch(showLoader());
      await axios
        .post(`http://localhost:3433/api/user/cancelappointment/${id}`, {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          navigate("/");
          // dispatch(closeLoader());
          // setUser(res.data.user);
        });
    }
    getData();
  };

  return (
    <Container>
      {appointments &&
        appointments.map((doctor) => {
          return (
            <div>
              <RxCross2
                className="close"
                onClick={() => handleCancelAppointment(doctor._id)}
              />
              <h3 onClick={() => navigate(`/doctor/${doctor._id}`)}>
                {doctor.firstName + " " + doctor.lastName}
              </h3>
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
            </div>
          );
        })}
    </Container>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 1rem;
  /* background-color: red; */

  div {
    padding: 1rem;
    background-color: #e7eaf6;
    display: flex;
    flex-direction: column;
    .close {
      margin-left: 95%;
      /* background-color: red; */
    }
    p,
    h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

export default Appointments;
