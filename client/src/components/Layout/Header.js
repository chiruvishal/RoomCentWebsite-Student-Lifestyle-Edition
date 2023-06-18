import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserOutlined, DownOutlined } from "@ant-design/icons";
import { message, Dropdown, Menu } from "antd";
import axios from "axios";
import "../../styles/HeaderStyles.css";

const Header = () => {
  const [loginUser, setLoginUser] = useState("");
  const [peopleNames, setPeopleNames] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserDataById = async () => {
      try {
        const userq = JSON.parse(localStorage.getItem("user"));
        const resq = await axios.post("/users/getdata", {
          useridq: userq._id,
        });

        const { numberOfPeople, peopleNames } = resq.data; // Access the response data

        setPeopleNames(peopleNames);
      } catch (error) {
        // Handle error if the request fails
        console.error(error);
      }
    };

    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
      getUserDataById();
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };

  const menu = (
    <Menu>
      {peopleNames.map((name, index) => (
        <Menu.Item key={index} style={{ fontSize: "14px" }}>
          {name}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/">
              <img
                className="imagelogo"
                src="https://i.postimg.cc/28ZwsQ59/MCV-522edf6ecdfb9f643026.png"
                style={{ width: "auto", height: "50px" }}
                alt="Logo"
              />
              <span
                className="brand-heading d-none d-lg-inline"
                style={{
                  fontSize: "30px",
                  fontWeight: "bold",
                  color: "white",
                  marginLeft: "10px",
                  textDecoration: "none",
                }}
              >
                RoomCents: Student Lifestyle Edition
              </span>
            </Link>

            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
  <div className="nav-link" style={{ color: "white" }}>
    <UserOutlined /> Room: {loginUser && loginUser.name}
  </div>
</li>

              <li className="nav-item">
                <Dropdown overlay={menu} placement="bottomRight" arrow>
                  <h6 className="nav-link" style={{ color: "white" }}>
                    Roomsuperstars <DownOutlined />
                  </h6>
                </Dropdown>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
