import React from "react";
import { InstagramOutlined, FacebookOutlined, MailOutlined } from "@ant-design/icons";
import './Footer.css';

const Footer = () => {
  return (
    <div className="bg-dark text-light p-4" style={{ marginTop: "auto" }}>
      <div className="row">
        <h6 className="text-center text-white">
          All rights reserved &copy; MCV
        </h6>
        <div className="text-center mt-3">
          <a href="https://www.instagram.com/chiru_vishal_molleti/" target="_blank" rel="noopener noreferrer">
            <InstagramOutlined className="icon mr-4 text-white" />
          </a>
          <a href="https://www.facebook.com/chiruvishal.molleti/" target="_blank" rel="noopener noreferrer">
            <FacebookOutlined className="icon mr-4 text-white" />
          </a>
          <a href="molletichiruvishal@gmail.com">
            <MailOutlined className="icon text-white" />
          </a>
        </div>
        <p className="text-center mt-3">
        Made with love by MCV | <a href="https://molletichiruvishalportfolio.netlify.app" target="_blank" rel="noopener noreferrer">Visit my portfolio</a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
