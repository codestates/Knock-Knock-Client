/* eslint-disable */
import React from "react";
import "../../styles/navAndLogo.css";
import c from "../../images/logo/c1.png";
import Cshop from "../../images/logo/c.png";
import CC from "../../images/logo/C++.png";
import docker from "../../images/logo/docker.png";
import express from "../../images/logo/express.png";
import go from "../../images/logo/go.png";
import java from "../../images/logo/java.png";
import Javascript from "../../images/logo/javascript.png";
import mongo from "../../images/logo/mongo.png";
import mysql from "../../images/logo/mysql.png";
import nest from "../../images/logo/nest.png";
import node from "../../images/logo/node.png";
import php from "../../images/logo/php.png";
import post from "../../images/logo/postgresql.png";
import react from "../../images/logo/react.png";
import Rust from "../../images/logo/Rust.png";
import Rudy from "../../images/logo/Ruby.png";
import typescript from "../../images/logo/typescript.png";

const PrintLogo = (props) => {
  const select = (e) => {
    props.stack ? props.stack(e.target.value) : props.userStack(e.target.value);
  };

  return (
    <div className="StackLogo">
      <input onChange={select} type="checkbox" name="logo" value="c" id="c" />
      <label htmlFor="c">
        <img src={c} className="logo" value="c" />
      </label>
      <input onChange={select} type="checkbox" name="logo" value="c#" id="c#" />
      <label htmlFor="c#">
        <img src={Cshop} className="logo" value="c#" />
      </label>
      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="c++"
        id="c++"
      />
      <label htmlFor="c++">
        <img src={CC} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="docker"
        id="docker"
      />
      <label htmlFor="docker">
        <img src={docker} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="express"
        id="express"
      />
      <label htmlFor="express">
        <img src={express} className="logo" />
      </label>

      <input onChange={select} type="checkbox" name="logo" value="go" id="go" />
      <label htmlFor="go">
        <img src={go} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="java"
        id="java"
      />
      <label htmlFor="java">
        <img src={java} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="Javascript"
        id="Javascript"
      />
      <label htmlFor="Javascript">
        <img src={Javascript} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="mongo"
        id="mongo"
      />
      <label htmlFor="mongo">
        <img src={mongo} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="mysql"
        id="mysql"
      />
      <label htmlFor="mysql">
        <img src={mysql} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="nest"
        id="nest"
      />
      <label htmlFor="nest">
        <img src={nest} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="node"
        id="node"
      />
      <label htmlFor="node">
        <img src={node} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="php"
        id="php"
      />
      <label htmlFor="php">
        <img src={php} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="post"
        id="post"
      />
      <label htmlFor="post">
        <img src={post} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="react"
        id="react"
      />
      <label htmlFor="react">
        <img src={react} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="Rust"
        id="Rust"
      />
      <label htmlFor="Rust">
        <img src={Rust} className="logo" />
      </label>

      <input
        onChange={select}
        type="checkbox"
        name="logo"
        value="Rudy"
        id="Rudy"
      />
      <label htmlFor="Rudy">
        <img src={Rudy} className="logo" />
      </label>

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
