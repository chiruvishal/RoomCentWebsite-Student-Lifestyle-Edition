import React, { useState, useEffect } from "react";
import { Form, Input, message, Modal, Select, Table, DatePicker } from "antd";
import {
  UnorderedListOutlined,
  AreaChartOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Layout from "./../components/Layout/Layout";
import axios from "axios";
import Spinner from "./../components/Spinner";
import moment from "moment";
import Analytics from "../components/Analytics";
import Dropdownm from "./Dropdown";
import './Homepage.css';

const { RangePicker } = DatePicker;

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [allTransection, setAllTransection] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectedDate, setSelectedate] = useState([]);
  const [type, setType] = useState("all");
  const [viewData, setViewData] = useState("table");
  const [editable, setEditable] = useState(null);

  //table data
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
    },
    {
      title: "Amount",
      dataIndex: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Refrence",
      dataIndex: "refrence",
    },
    {
      title: "Actions",
      render: (text, record) => (
        <div>
          <EditOutlined
            onClick={() => {
              setEditable(record);
              setShowModal(true);
            }}
          />
          <DeleteOutlined
            className="mx-2"
            onClick={() => {
              handleDelete(record);
            }}
          />
        </div>
      ),
    },
  ];
  //getall transactions
  const [numberOfPeople, setNumberOfPeople] = useState(0);
  const [peopleNames, setPeopleNames] = useState([]);

  useEffect(() => {
    const getUserDataById = async () => {
      try {
        const userq = JSON.parse(localStorage.getItem("user"));
        const resq = await axios.post("/users/getdata", {
          useridq: userq._id,
        });
  
        const { numberOfPeople, peopleNames } = resq.data; // Access the response data
  
        setNumberOfPeople(resq.data.numberOfPeople);
setPeopleNames(resq.data.peopleNames);

      } catch (error) {
        // Handle error if the request fails
        console.error(error);
      }
    };
  
    getUserDataById();
  }, []);
  

  //useEffect Hook
  useEffect(() => {
    const getAllTransactions = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        setLoading(true);
        const res = await axios.post("/transections/get-transection", {
          userid: user._id,
          frequency,
          selectedDate,
          type,
        });
        setAllTransection(res.data);
        setLoading(false);
      } catch (error) {
        message.error("Ftech Issue With Tranction");
      }
    };
    getAllTransactions();
  }, [frequency, selectedDate, type, setAllTransection]);

  //delete handler
  const handleDelete = async (record) => {
    try {
      setLoading(true);
      await axios.post("/transections/delete-transection", {
        transacationId: record._id,
      });
      setLoading(false);
      message.success("Transaction Deleted!");
      window.location.reload(); // Refresh the page

    } catch (error) {
      setLoading(false);
      console.log(error);
      message.error("unable to delete");
    }
  };

  // form handling
  const handleSubmit = async (values) => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      setLoading(true);
      if (editable) {
        await axios.post("/transections/edit-transection", {
          payload: {
            ...values,
            userId: user._id,
          },
          transacationId: editable._id,
        });
        setLoading(false);
        message.success("Transaction Updated Successfully");
        window.location.reload(); // Refresh the page

      } else {
        await axios.post("/transections/add-transection", {
          ...values,
          userid: user._id,
        });
        setLoading(false);
        message.success("Transaction Added Successfully");
      }
      setShowModal(false);
      setEditable(null);
    } catch (error) {
      setLoading(false);
      message.error("please fill all fields");
    }
  };

  return (
    <Layout>
     <div class="containert">
  <div class="imaget">
    <img src="https://i.postimg.cc/WbWkr3yK/Cool-Background-with-room-with-college-students-confused-how-to-manage-their-expenses-2.png" alt="Welcome Image" />
  </div>
  <div class="contentt">
    <h2 class="titlet">
      Welcome to RoomCents: Student Lifestyle Edition
    </h2>
    <p class="descriptiont">Inspired From RealLife Events and My College Life.
To get started, simply create an account and log in. Once you're in, you can easily input your expenses, categorize them, and assign them to specific dates. RoomCents provides a user-friendly interface where you can view your transactions, filter them based on frequency or type, and even set custom date ranges.
But that's not all! RoomCents goes beyond transaction tracking. Our powerful analytics feature provides you with meaningful insights into your spending patterns. You can visualize your expenses through interactive charts, identify areas where you can save money, and make informed decisions about your Room.
Whether you're a college student living in a shared room or an individual looking to manage your finances effectively, RoomCents is here to simplify your financial journey.
    </p>
  </div>
</div>
<Dropdownm/>

      {loading && <Spinner />}
      <div className="filters">
        <div>
          <h6>Select Frequency</h6>
          <Select value={frequency} onChange={(values) => setFrequency(values)}>
            <Select.Option value="7">LAST 1 Week</Select.Option>
            <Select.Option value="30">LAST 1 Month</Select.Option>
            <Select.Option value="365">LAST 1 year</Select.Option>
            <Select.Option value="custom">custom</Select.Option>
          </Select>
          {frequency === "custom" && (
            <RangePicker
              value={selectedDate}
              onChange={(values) => setSelectedate(values)}
            />
          )}
        </div>
        <div className="filter-tab ">
          <h6>Select Type</h6>
          <Select value={type} onChange={(values) => setType(values)}>
            <Select.Option value="all">ALL</Select.Option>
            <Select.Option value="income">INROOM_EXPENSES</Select.Option>
            <Select.Option value="expense">OTHER EXPENSE</Select.Option>
          </Select>
        </div>
        <div className="switch-icons">
          <UnorderedListOutlined
            className={`mx-2 ${
              viewData === "table" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("table")}
          />
          <AreaChartOutlined
            className={`mx-2 ${
              viewData === "analytics" ? "active-icon" : "inactive-icon"
            }`}
            onClick={() => setViewData("analytics")}
          />
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New
          </button>
        </div>
      </div>
      <div className="content">
        {viewData === "table" ? (
          <Table columns={columns} dataSource={allTransection} className="responsive-table"/>
        ) : (
          <Analytics
  allTransection={allTransection}
  numberOfPeople={numberOfPeople}
  peopleNames={peopleNames}
/>

        )}
      </div>
      <Modal
        title={editable ? "Edit Transaction" : "Add Transection"}
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={false}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={editable}
        >
          <Form.Item label="Amount" name="amount">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="type" name="type">
            <Select>
              <Select.Option value="income">InRoom Expenses</Select.Option>
              <Select.Option value="expense">Other Expenses</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Category" name="category">
            <Select>
              <Select.Option value="Room-Rent">Room-Rent</Select.Option>
              <Select.Option value="Electricity">Electricity</Select.Option>
              <Select.Option value="Groceries">Groceries</Select.Option>
              <Select.Option value="Eating Out">Eating Out</Select.Option>
              <Select.Option value="WIFI Bill">WIFI Bill</Select.Option>
              <Select.Option value="Utilities">Utilities</Select.Option>
              <Select.Option value="HouseHold Items">HouseHold Items</Select.Option>
              <Select.Option value="Cleaning Supplies">Cleaning Supplies</Select.Option>
              <Select.Option value="Transportation">Transportation</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Date" name="date">
            <Input type="date" />
          </Form.Item>
          <Form.Item label="Refrence" name="refrence">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <Input type="text" required />
          </Form.Item>
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              {" "}
              SAVE
            </button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
