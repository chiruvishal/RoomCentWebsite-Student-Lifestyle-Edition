import React, { useState, useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/Loginpage.css";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  //from submit
  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/login", values);
      setLoading(false);
      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      console.log(data);
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("something went wrong");
    }
  };

  //prevent for login user
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <><div
    className={`login-page ${isHovered ? 'hovered' : ''}`}
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
  >
    
             {loading && <Spinner />}
               <h1>
               RoomCents: Student Lifestyle Edition
             </h1>
            <Form className="formf"layout="vertical" onFinish={submitHandler}>
            <div class="rowf">
              <Form.Item label="Email" name="email">
                <Input type="email" required />
              </Form.Item>
            </div>
              <div className="rowf">
                <Form.Item label="Password" name="password">
                <Input type="password" required />
                </Form.Item>
              </div>
              <div className="rowf">
              <div className="d-flex justify-content-between colorf">
                <Link to="/register">
                  Not a user ? Click Here to register !
                </Link>
                </div>
                <button className="btnf">Login</button>
              </div>
            </Form>
          </div>
    </>
  );
};

export default Login;
