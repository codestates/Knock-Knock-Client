/* eslint-disable */
import React from "react";
import "../../styles/navAndLogo.css";
import { stacks } from "../../utils/options";
import Javascript from "../../images/logo/javascript.png";
import Rust from "../../images/logo/Rust.png";
import Rudy from "../../images/logo/Ruby.png";
import typescript from "../../images/logo/typescript.png";
import node from "../../images/logo/node.png";
import gresql from "../../images/logo/postgresql.png";
import java from "../../images/logo/java.png";
import mysql from "../../images/logo/mysql.png";

const PrintLogo = (props) => {
  //   const makeArr = props.Logo.split(",");

  //   if (props.Logo === "Javascript")
  console.log(props.Logo);
  return (
    <div>
      <img className="StackLogo" src={Javascript} />
      <img className="StackLogo" src={Rust} />
      <img className="StackLogo" src={Rudy} />
      <img className="StackLogo" src={typescript} />
      <img className="StackLogo" src={java} />
      <img className="StackLogo" src={mysql} />
      <img className="StackLogo" src={gresql} />
    </div>
  );
};

export default PrintLogo;
