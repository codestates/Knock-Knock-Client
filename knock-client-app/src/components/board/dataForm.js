import React, { useContext, useEffect, useState } from "react";
import { stacks } from "../../utils/options";
import "../../styles/createRoom.css";

const DataForm = (props) => {
  const [message, setMessage] = useState("");
  const stackStorage = [];

  const isCheck = (e) => {
    e.target.checked
      ? props.crew(e.target.value)
      : setMessage("인원선택을 해주세요");
  };

  const choiceStack = (e) => {
    if (e.target.checked) {
      stackStorage.push(e.target.value);
    } else {
      stackStorage.splice(stackStorage.indexOf(e.target.value), 1);
    }
    props.stack(stackStorage);
  };
  const storage = [];

  const isPosition = (e) => {
    props.position(e.target.value);
  };

  const howMany = [2, 3, 4, 5];

  const getTogether = howMany.map((el, idx) => {
    return (
      <>
        <input
          onChange={(e) => {
            isCheck(e);
          }}
          type="radio"
          id={el}
          name="per"
          value={el}
          key={idx}
        />
        <label htmlFor={el}>{el === 5 ? `${el}명이상` : `${el}명`}</label>
      </>
    );
  });

  const stack = stacks.map((el, idx) => {
    return (
      <>
        <input
          onChange={(e) => {
            choiceStack(e);
          }}
          type="checkbox"
          id={el}
          name="stack"
          value={el}
          key={idx}
        />
        <label htmlFor={el}>{el}</label>
      </>
    );
  });

  const addStack = () => {
    return <>{stack}</>;
  };

  return (
    <div className="Data_Container">
      <form className="DataForm">
        <div className="Q_one">
          <p>1. 인원을 선택해주세요.[project는 최대 4명이 권장사항 입니다.]</p>
          <>{getTogether}</>
        </div>
        {props.category === "Project" ? (
          <>
            <div className="Q_two">
              <p>2. 원하시는 Position 비율을 입력해주세요.</p>
              <div>
                <input
                  onChange={(e) => {
                    isPosition(e);
                  }}
                  className="Front_end"
                  type="text"
                  placeholder="프론트엔드"
                />
                <span>명</span>
                <input
                  onChange={(e) => {
                    isPosition(e);
                  }}
                  className="Back_end"
                  type="text"
                  placeholder="백엔드"
                />
                <span>명</span>
              </div>
            </div>

            <div className="Q_three">
              <p>3.스택을 추가해주세요.</p>
              <div className="Stack">{stack}</div>
            </div>
          </>
        ) : (
          <div className="Q_three">
            <p>2.스택을 추가해주세요.</p>
            <div className="Stack">{stack}</div>
          </div>
        )}
      </form>
    </div>
  );
};

export default DataForm;
