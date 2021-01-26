/* eslint-disable */
import React from "react";
import "../../styles/history.css";

const SendRetrospect = ({ journals, userData, retroDeleteHandler }) => {
  const list = journals.map((journal, idx) => {
    if (idx >= 0) {
      return (
        <>
          <li key={idx} className="His_JournalForm">
            <p className="Journal_username">{userData.username}</p>
            <p className="Journal_date">{journal.created_at.split("T")[0]}</p>
            <div
              className="Journal_text"
              dangerouslySetInnerHTML={{
                __html: journal.content.replace(/(?:\r\n|\r|\n)/g, "<br/>"),
              }}
            ></div>
          </li>
          <button onClick={() => retroDeleteHandler(journal.id)}>삭제</button>
        </>
      );
    }
  });

  return <>{list}</>;
};

export default SendRetrospect;
