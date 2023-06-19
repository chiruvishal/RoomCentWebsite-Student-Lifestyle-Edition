import React, { useState,useEffect } from "react";
import { Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Spinner from "../components/Spinner";
import "../styles/RegisterPage.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [names, setNames] = useState([""]);

  const submitHandler = async (values) => {
    try {
      setLoading(true);
      const { data } = await axios.post("/api/v1/users/register", {
        ...values,
        numberOfPeople,
        peopleNames: names,
      });
      console.log(data);
      message.success("Registration Successful");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong");
    }
  };

  const handleNumberOfPeopleChange = (value) => {
    setNumberOfPeople(value);
    const newNames = new Array(value).fill("");
    setNames(newNames);
  };

  const handleNameChange = (e, index) => {
    const { value } = e.target;
    const newNames = [...names];
    newNames[index] = value;
    setNames(newNames);
  };

  const addNameField = () => {
    setNumberOfPeople(numberOfPeople + 1);
    setNames([...names, ""]);
  };

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <>
     <div class="containert">
  <div class="imaget">
    <img src="https://www.casita.com/images/files/public/17012020031052PM-student-studying-casita-shared-room.jpg" alt="Welcome Image" />
  </div>
  <div class="contentt">
    <h2 class="titlet">
      Welcome to RoomCents: Student Lifestyle Edition
    </h2>
    <p class="descriptiont">
To get started, simply create an account and log in. Once you're in, you can easily input your expenses, categorize them, and assign them to specific dates. RoomCents provides a user-friendly interface where you can view your transactions, filter them based on frequency or type, and even set custom date ranges.
But that's not all! RoomCents goes beyond transaction tracking. Our powerful analytics feature provides you with meaningful insights into your spending patterns. You can visualize your expenses through interactive charts, identify areas where you can save money, and make informed decisions about your Room.
Whether you're a college student living in a shared room or an individual looking to manage your finances effectively, RoomCents is here to simplify your financial journey.
    </p>
  </div>
</div>
      <div className="register-page">
        {loading && <Spinner />}
        <Form className="register-form" layout="vertical" onFinish={submitHandler}>
          <h2>Register Form</h2>
          <Form.Item label="Room Name" name="name" rules={[{ required: true }]}>
            <Input type="text" />
          </Form.Item>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item label="Number of People">
            <Input
              type="number"
              min={1}
              value={numberOfPeople}
              onChange={(e) => handleNumberOfPeopleChange(parseInt(e.target.value, 10))}
            />
          </Form.Item>
          {names.map((name, index) => (
            <Form.Item label={`Name ${index + 1}`} key={index} rules={[{ required: true }]}>
              <Input value={name} onChange={(e) => handleNameChange(e, index)} />
            </Form.Item>
          ))}
          <div className="d-flex justify-content-between">
            <Link to="/login">Already Registered? Login here!</Link>
            <button className="btn" type="submit">
              Register
            </button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default Register;
