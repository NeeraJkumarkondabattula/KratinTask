import React, { useState, useEffect } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { FaPhone } from "react-icons/fa6";
import { WiTime11 } from "react-icons/wi";
import { RiShieldStarLine } from "react-icons/ri";
import axios from "axios";
import styled from "styled-components";

const Profile = () => {
  const [user, setUser] = useState();
  useEffect(() => {
    async function getData() {
      // dispatch(showLoader());
      await axios
        .post("http://localhost:3433/api/user/profile", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          // dispatch(closeLoader());
          setUser(res.data.user);
        });
    }
    getData();
  }, []);

  return (
    <Container>
      {user && (
        <div>
          <h3>{user.name}</h3>
          <h4>
            <RiShieldStarLine />
            {(user.isUser && "User") ||
              (user.isAdmin && "Admin") ||
              (user.isDoctor && "Doctor")}
          </h4>
          <br />
          <p>
            <MdAlternateEmail />
            {user.email}
          </p>
          <p>
            <FaPhone />
            {user.phone}
          </p>
          <br />
        </div>
      )}
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem;
  p,
  h4 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;
export default Profile;
