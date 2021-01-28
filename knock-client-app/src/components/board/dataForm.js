/* eslint-disable */
import React, { useEffect, useState } from "react";
// import { stacks } from "../../utils/options";
import "../../styles/createRoom.css";
import PrintLogo from "../mypage/PrintStackLogo";

const DataForm = (props) => {
  const [stack, setStack] = useState([]);
  const [isOver, setIsOver] = useState(false);
  const isCheck = (e) => {
    if (e.target.checked) {
      console.log(e.target.value);
      if (e.target.value === "4명이상") {
        setIsOver(true);
        alert("그룹 인원은 최대 8명까지 설정할 수 있습니다.");
      } else {
        setIsOver(false);
        props.crew(e.target.value);
      }
    }
  };

  const overCheck = (e) => {
    if (e.target.checked) {
      props.crew(e.target.value);
    }
  };

  const isPosition = (e) => {
    // 비율에 대한 에러 [이준희]
    props.position(e.target.value);
  };

  const howMany = [2, 3, 4, "4명이상"];
  const overPeople = [5, 6, 7, 8];

  const getTogether = howMany.map((el, idx) => {
    return (
      <span key={idx}>
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
        <label htmlFor={el}>{el === "4명이상" ? `${el}` : `${el}명`}</label>
      </span>
    );
  });

  const overMember = overPeople.map((el, idx) => {
    return (
      <span key={idx}>
        <input
          onChange={(e) => {
            overCheck(e);
          }}
          type="radio"
          id={el}
          name="dul"
          value={el}
        />
        <label htmlFor={el}>{el}명</label>
      </span>
    );
  });

  const getStack = (e) => {
    props.stack(e); // 크리에이트 룸

    if (stack.includes(e)) {
      //스택을 뭘 클릭햇는지 출력해주기 위해
      stack.splice(stack.indexOf(e), 1);
      setStack(() => [...stack]);
    } else {
      setStack(() => [...stack, e]);
    }
  };

  return (
    <div className="Data_Container">
      {props.category !== "Question" && props.category !== "Category" ? (
        <form className="DataForm">
          <div className="Q_one">
            {props.category === "Project" ? (
              <h2>모든 사항을 반드시 선택해주세요.</h2>
            ) : (
              <></>
            )}
            <h4>
              * 1. 인원을 선택해주세요.[project는 최대 4명이 권장사항 입니다.]
            </h4>
            <>{getTogether}</>
            {isOver ? (
              <div>
                <p>***최대 모집인원은 8명입니다***</p>
                <>{overMember}</>
              </div>
            ) : (
              <></>
            )}
          </div>
          {props.category === "Project" ? (
            <>
              <div className="Q_two">
                <h4> * 2. 원하시는 Position 비율을 입력해주세요.</h4>
                <h5>
                  [이때 본인의 포지션은 비율에서 제외합니다. 4명 모집에 본인이
                  백엔드를 원하면 /프론트 2명 백엔드 1명]
                </h5>
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
                <h4>* 3.스택을 추가해주세요.</h4>
                <div className="showStack">
                  {`현재 ${stack}을 선택하셨습니다.`}
                </div>
                <PrintLogo stack={getStack} />
                {/* <div className="Stack">{stack}</div> */}
              </div>
            </>
          ) : (
            <div className="Q_three">
              <h4>2.스택을 추가해주세요.</h4>
              <div className="showStack">
                {`현재 ${stack}을 선택하셨습니다.`}
              </div>
              <PrintLogo stack={getStack} />
              {/* <div className="Stack">{stack}</div> */}
            </div>
          )}
        </form>
      ) : (
        <></>
      )}
    </div>
  );
};

export default DataForm;
