/* eslint-disable */
import React from "react";
import { stacks } from "../../utils/options";
import "../../styles/navAndLogo.css";
import Cshop from "../../images/logo/c.png";
import CC from "../../images/logo/C++.png";
import docker from "../../images/logo/docker.png";
import express from "../../images/logo/express.png";
import gresql from "../../images/logo/postgresql.png";
import java from "../../images/logo/java.png";
import Javascript from "../../images/logo/javascript.png";
import mongo from "../../images/logo/mongo.png";
import mysql from "../../images/logo/mysql.png";
import nest from "../../images/logo/nest.png";
import node from "../../images/logo/node.png";
import php from "../../images/logo/php.png";
import post from "../../images/logo/postgresql.png";
import Rust from "../../images/logo/Rust.png";
import Rudy from "../../images/logo/Ruby.png";
import typescript from "../../images/logo/typescript.png";

const PrintLogo = (props) => {
  const select = (e) => {
    props.stack(e.target.value);
  };
  return (
    <div className="StackLogo">
      <img onClick={(e) => select(e)} src={Cshop} className="logo" value="C" />
      <img src={CC} className="logo" />
      <img src={docker} className="logo" />
      <img src={express} className="logo" />
      <img src={gresql} className="logo" />
      <img src={java} className="logo" />
      <img src={Javascript} className="logo" />
      <img src={mongo} className="logo" />
      <img src={mysql} className="logo" />
      <img src={nest} className="logo" />
      <img src={node} className="logo" />
      <img src={php} className="logo" />
      <img src={post} className="logo" />
      <img src={Rust} className="logo" />
      <img src={Rudy} className="logo" />
      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="typescript"
        id="typescript"
      />
      <label htmlFor="typescript">
        <img src={typescript} className="logo" />
      </label>
    </div>
  );
};

export default PrintLogo;
