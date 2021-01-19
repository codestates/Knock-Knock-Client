import React, { useContext, useEffect, useState } from "react";
// import Context from "../../utils/context";
const DataForm = (props) => {
  // const [category, setCategory] = useContext(Context).categoryContext;
  console.log("프랍스", props);

  return (
    <>
      <form>
        {props.category === ""}?<></>:
        <div className="Q_one">
          <p>1. Project 인원을 선택해주세요.[최대 4명이 권장사항 입니다.]</p>
          <input type="radio" id="2" name="per" value="2"></input>
          <label htmlFor="2">2명</label>
          <input type="radio" id="3" name="per" value="3"></input>
          <label htmlFor="3">3명</label>
          <input type="radio" id="4" name="per" value="4"></input>
          <label htmlFor="4">4명</label>
          <input type="radio" id="over4" name="per" value="over4"></input>
          <label htmlFor="over4">4명이상</label>
        </div>
        {props.category === "Project"}?
        <div className="Q_two">
          <p>2. 원하시는 Position 비율을 입력해주세요.</p>
          <div>
            <textarea placeholder="프론트엔드" />
            <textarea placeholder="백엔드" />
          </div>
        </div>
        {/* :
        <div className="Q_three">
          <p>2. 원하시는 스택을 추가해주세요.</p>
          <select className="Stack">
            <option>스택을 선택해주세요.</option>
            <option>Javascript</option>
          </select>
        </div> */}
        {props.category === "Study"}?
        <div className="Q_three">
          <p>3. 원하시는 스택을 추가해주세요.</p>
          <select className="Stack">
            <option>스택을 선택해주세요.</option>
            <option>Javascript</option>
          </select>
        </div>
        :<></>
      </form>
    </>
  );
};

export default DataForm;
