import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import logo from "./logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [homeBtnColor, setHomeBtnColor] = useState("#2b2b2b");
  const [savedBtnColor, setSavedBtnColor] = useState("#2b2b2b");

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 15px",
        backgroundColor: "#2b2b2b",
        color: "white",
        borderBottom: "2px solid black",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
        boxSizing: "border-box",
      }}
    >
      <img
        src={logo}
        alt="Logo"
        style={{
          height: "40px",
          cursor: "pointer" 
        }}
        onClick={() => navigate("/")}
      />
      <div style={{ 
        display: "flex",
        gap: "10px" 
        }}>
        <button
          onClick={() => navigate("/")}
          onMouseEnter={() => setHomeBtnColor("#666")}
          onMouseLeave={() => setHomeBtnColor("#2b2b2b")}
          onMouseDown={() => setHomeBtnColor("#888")}
          onMouseUp={() => setHomeBtnColor("#666")}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            borderRadius: 4,
            backgroundColor: homeBtnColor,
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.05s ease",
          }}
        >
          Home
        </button>
        <button
          onClick={() => navigate("/saved")}
          onMouseEnter={() => setSavedBtnColor("#666")}
          onMouseLeave={() => setSavedBtnColor("#2b2b2b")}
          onMouseDown={() => setSavedBtnColor("#888")}
          onMouseUp={() => setSavedBtnColor("#666")}
          style={{
            padding: "8px 16px",
            fontSize: 16,
            borderRadius: 4,
            backgroundColor: savedBtnColor,
            color: "white",
            border: "none",
            cursor: "pointer",
            transition: "background-color 0.05s ease",
          }}
        >
          Saved Products
        </button>
      </div>
    </div>
  );
};

export default Navbar;