import React from "react";


import { Input } from "antd";
import { AntButton2 } from "./Button2";
import { AntButton3 } from "./Button3";
import { AntButton4 } from "./Button4";

function InputB() {
  return (
    <div>
      <Input
        placeholder="Code"
        style={{
          width: "30.8%",
          position: "relative",
          top: "5px",
          right: "50px",
          height: "40px",
          marginBottom: "30px",
          
        }}
        className="success"
      />
      <Input
        placeholder="Name"
        style={{
          width: "31%",
          position: "relative",
          top: "5px",
          right: "20px",
          height: "40px",
          marginBottom: "30px",
        }}
        className="success"
      />
      <AntButton2
        style={{
          width: "7%",
          position: "relative",
          top: "5px",
          right: "-10px",
          background: "white",
          border: "1px solid rgb(204, 202, 202)",
          color: "#00a148",
        }}
        
      />
      <AntButton3
        style={{
          width: "6%",
          position: "relative",
          top: "5px",
          right: "-20px",
          background: "#00a148",
        }}
      />
      <AntButton4
        style={{
          width: "16%",
          position: "relative",
          top: "5px",
          right: "-30px",
          background: "#00a148",
        }}
      />
    </div>
  );
}

export default InputB;
