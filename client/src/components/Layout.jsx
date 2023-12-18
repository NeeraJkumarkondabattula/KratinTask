import React, { useState, useEffect } from "react";
import styled from "styled-components";
import medicatelogo from "../assets/Medicate-logo.png";
import { FaRegUserCircle } from "react-icons/fa";
import { HiBookmark } from "react-icons/hi";
import { LuUsers } from "react-icons/lu";
import { RiHealthBookLine } from "react-icons/ri";
import { RiHome2Line } from "react-icons/ri";
import { FaUserDoctor } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import { CgMenuLeft } from "react-icons/cg";
import { Link } from "react-router-dom";
import { Circles } from "react-loader-spinner";
import axios from "axios";
import { RxCross2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { closeLoader, showLoader } from "../redux/alertReducer";

const Layout = ({ children }) => {
  const active = window.location.pathname;
  const { loading } = useSelector((state) => state.alerts);
  const [collapse, setCollapse] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState();
  const userMenu = [
    {
      option: "Home",
      icon: <RiHome2Line />,
      link: "/",
    },
    {
      option: "Profile",
      icon: <FaRegUserCircle />,
      link: "/profile",
    },
    {
      option: "Appointments",
      icon: <RiHealthBookLine />,
      link: "/appointments",
    },
    {
      option: "Apply Doctor",
      icon: <FaUserDoctor />,
      link: "/applydoctor",
    },
    {
      option: "Logout",
      icon: <LuLogOut />,
      link: "/logout",
    },
  ];
  const adminMenu = [
    {
      option: "Home",
      icon: <RiHome2Line />,
      link: "/",
    },
    {
      option: "Profile",
      icon: <FaRegUserCircle />,
      link: "/profile",
    },
    {
      option: "Users",
      icon: <LuUsers />,
      link: "/users",
    },
    {
      option: "Doctors",
      icon: <FaUserDoctor />,
      link: "/doctors",
    },
    {
      option: "Logout",
      icon: <LuLogOut />,
      link: "/logout",
    },
  ];
  useEffect(() => {
    async function getData() {
      dispatch(showLoader());
      await axios
        .post("http://localhost:3433/api/user/auth", {
          headers: {
            Authorization: JSON.parse(localStorage.getItem("token")),
          },
        })
        .then((res) => {
          dispatch(closeLoader());
          setUser(res.data.user);
        });
    }
    getData();
  }, []);

  var menu;
  var name;
  var nameArray;
  var shortName;
  // console.log(user);
  if (user && user.isAdmin) {
    menu = adminMenu;
  } else if (user && user.isUser) {
    menu = userMenu;
  }
  if (user) {
    name = user.name;
    nameArray = name.split(" ");
    shortName = nameArray[0][0] + nameArray[1][0];
  }

  return (
    <>
      <Container>
        <div className="main">
          <div className={collapse ? "collapse" : "side"}>
            <img src={medicatelogo} alt="" />
            <span>
              <h2>Medicate</h2>
            </span>

            <p>{collapse ? shortName : user && user.name}</p>
            {/* <p>user</p> */}
            <div className="menu">
              {menu &&
                menu.map((option, index) => {
                  const icon = option.icon;
                  return (
                    <div key={index}>
                      <div
                        className={
                          active === option.link ? "active option" : "option"
                        }>
                        <Link to={option.link} className="link">
                          {option.icon}
                          <span>
                            <h4>{option.option}</h4>
                          </span>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="content">
            <div className="header">
              {collapse ? (
                <CgMenuLeft onClick={() => setCollapse(false)} />
              ) : (
                <RxCross2 onClick={() => setCollapse(true)} />
              )}
            </div>
            <div className={loading ? "center" : "body"}>
              {loading ? (
                <Circles
                  height="80"
                  width="80"
                  color="#4fa94d"
                  ariaLabel="circles-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                  className="circles"
                />
              ) : (
                children
              )}
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

const Container = styled.div`
  max-width: 1440px;
  width: 95vw;
  height: 90vh;
  /* background-color: white; */
  .main {
    width: 100%;
    height: 90vh;
    /* background-color: red; */
    color: white;
    display: flex;
    align-items: center;
    .side {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      width: 15vw;
      height: 100%;
      transition: width 1s;
      background-color: #233142;
      /* border-radius: 1rem; */

      img {
        transition: width 1s;
        width: 8rem;
      }
      p {
        text-transform: capitalize;
        transition: width 1s;
        font-weight: 600;
      }
      h2 {
        transition: width 1s;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        color: #42b883;
      }
      .menu {
        transition: width 1s;
        margin-top: 20%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
        /* padding: 0.5rem; */
        /* background-color: red */
        .option {
          transition: width 1s;
          width: 100%;
          display: flex;
          align-items: center;
          gap: 1rem;

          .link {
            display: flex;
            align-items: center;
            gap: 1rem;
            color: white;
            .user-icon,
            .appointment-icon,
            .logout-icon,
            .home-icon {
              font-size: 1.5rem;
            }
            span h4 {
              font-weight: 500;
            }
          }
        }
        .active {
          .link {
            color: #42b883;
          }
        }
      }
    }
    .collapse {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 1rem;
      width: 5vw;
      height: 100%;
      transition: width 1s;
      background-color: #233142;
      /* border-radius: 1rem; */
      img {
        transition: width 1s;
        width: 3rem;
      }
      p {
        transition: width 1s;
        font-weight: 600;
      }
      h2 {
        transition: width 1s;
        margin: 0;
        padding: 0;
        display: flex;
        align-items: center;
        color: #42b883;
        display: none;
      }
      .menu {
        transition: width 1s;
        margin-top: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
        justify-content: center;
        padding: 0.5rem;
        /* background-color: red; */
        .option {
          transition: width 1s;
          display: flex;
          align-items: center;
          gap: 1rem;
          .link {
            display: flex;
            color: white;
            .user-icon,
            .appointment-icon,
            .logout-icon,
            .home-icon {
              font-size: 1.6rem;
            }
            span h4 {
              font-weight: 500;
              display: none;
            }
          }
        }
      }
    }
    .content {
      width: 85vw;
      height: 100%;
      /* background-color: blue; */
      .header {
        width: 100%;
        height: 10vh;
        color: #2a2438;
        padding: 1rem;
        background-color: white;
        /* border-radius: 1rem; */
      }
      .body {
        padding: 1rem;
        height: 80vh;
        color: #2a2438;
        background-color: white;
        /* border-radius: 1rem; */
      }
      .center {
        padding: 1rem;
        height: 80vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
      }
    }
  }
  @media screen and (max-width: 1280px) {
    .main {
      width: 100vw;
      height: 100vh;
      flex-direction: column;
      .side {
        padding: 0.5rem;
        width: 100%;
        height: 10vh;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        img {
          width: 2.5rem;
        }
        h2 {
          font-size: 1.2rem;
          /* display: none; */
        }
        p {
          display: none;
        }
        .menu {
          margin-top: 0;
          align-items: center;
          flex-direction: row;
          gap: 2rem;
          .option {
            span {
              display: none;
            }
          }
        }
      }
      .content {
        width: 100vw;
        height: 90vh;
        .body {
          width: 100%;
          height: 90vh;
        }
      }
    }
  }
`;
export default Layout;
