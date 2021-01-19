import React, { useContext, useEffect, useState } from "react";
import { stacks } from "../../utils/options";
import StackSelector from "./stackSelector";

const DataForm = (props) => {
  const [message, setMessage] = useState("");

  const isCheck = (e) => {
    e.target.checked
      ? props.crew(e.target.value)
      : setMessage("인원선택을 해주세요");
  };

  const choiceStack = () => {};
  const storage = [];

  const isPosition = (e) => {
    storage.push(e.target.value);
    if (storage.length === 2) {
      if (storage.reduce((cur, pre) => cur + pre) !== props.crew) {
        alert("인원수에 맞게 포지션의 비율을 다시 입력해주세요.");
      } else {
        props.position(storage[0], storage[1]);
      }
    }
    console.log(storage);
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
      <option key={idx} value={el}>
        {el}
      </option>
    );
  });

  const addStack = () => {
    return <>{stack}</>;
  };
  return (
    <>
      <form>
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
              <p>3. 원하시는 스택을 추가해주세요.</p>
              <StackSelector />
              {/* <select className="Stack">{stack}</select> */}
            </div>
          </>
        ) : (
          <div className="Q_three">
            ß<p>2.스택을 추가해주세요.</p>
            <StackSelector />
            {/* <select className="Stack">{stack}</select> */}
          </div>
        )}
      </form>
    </>
  );
};

export default DataForm;
