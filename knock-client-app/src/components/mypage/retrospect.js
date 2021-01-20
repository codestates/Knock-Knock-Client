import React from "react";
import "../../styles/history.css";

const SendRetrospect = (props) => {
  console.log(props);
  const list = props.value.map((value, idx) => {
    if (idx >= 0) {
      return (
        <li key={idx} className="His_JournalForm">
          <p className="Journal_username">{value.username}</p>
          <p className="Journal_date">{value.date}</p>
          <p className="Journal_text">{value.retrospect}</p>
        </li>
      );
    }
  });

  return <>{list}</>;
};

export default SendRetrospect;
