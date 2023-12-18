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
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";

const Home = () => {
  const [doctors, setDoctors] = useState();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.alerts);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetch() {
      dispatch(showLoader());
      await axios.get("http://localhost:3433/api/user/doctors").then((res) => {
        setDoctors(res.data.doctors);
        dispatch(closeLoader());
      });
    }
    fetch();
  }, []);

  return (
    <Layout>
      <Container>
        {doctors &&
          doctors.map((doctor) => {
            return (
              <>
                <div>
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
              </>
            );
          })}
      </Container>
    </Layout>
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

    p,
    h4 {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }
`;

export default Home;
