/* eslint-disable */
import React from "react";
import "../../styles/history.css";

const SendRetrospect = ({ journals, userData, retroDeleteHandler }) => {
  const list = journals.map((journal, idx) => {
    if (idx >= 0) {
      return (
        <>
          <li key={idx} className="His_JournalForm">
            <button
              onClick={() => retroDeleteHandler(journal.id)}
              className="Journal_DelBtn"
            ></button>
            <div className="Journal_username_date">
              <div className="Journal_username">{userData.username}</div>
              <div className="Journal_date">
                {journal.created_at.split("T")[0]}
              </div>
            </div>
            <div
              className="Journal_text"
              dangerouslySetInnerHTML={{
                __html: journal.content.replace(/(?:\r\n|\r|\n)/g, "<br/>"),
              }}
            ></div>
          </li>
        </>
      );
    }
  });

  return <>{list}</>;
};

export default SendRetrospect;
