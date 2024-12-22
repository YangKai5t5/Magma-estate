import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import toast from "react-hot-toast";
import "../styles/contact.css";
import { Link } from "react-router-dom";

const Contact = () => {
  const [loading, setLoading] = useState(false);
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    setLoading(true);
    emailjs
      .sendForm("service_3dxh07t", "template_rw2zp9c", form.current, {
        publicKey: "PkNDvuQ7XFSuWl7-2",
      })
      .then(
        () => {
          console.log("SUCCESS!");
          toast.success("Email sent", {
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setLoading(false);
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );

    e.target.reset();
  };

  return (
    <div className="contact-main">
      <form onSubmit={sendEmail} ref={form}>
       
      </form>
    </div>
  );
};

export default Contact;

// id service_kfstvlk
