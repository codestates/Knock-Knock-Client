import React, { Component } from "react";
import ProfileEdit from "./ProfileEditForm";
import "../../styles/history.css";
import "../../styles/mypage.css";
import SendRetrospect from "./retrospect";
class MngHistory extends Component {
  constructor(props) {
    super(props);

    this.registerJouranl = this.registerJouranl.bind(this);
    this.keepJournal = this.keepJournal.bind(this);
    this.IsOpen = this.IsOpen.bind(this);

    this.state = {
      isClick: false,
      isOpen: false,
      journals: [],
    };
    this.journals = [];
    this.retrospect = "";
  }

  keepJournal(value) {
    this.retrospect = value.target.value;
  }

  registerJouranl() {
    let date = new Date().toLocaleDateString().split("/");
    let [day, month] = [date[0], date[1]];
    date[0] = month;
    date[1] = day;
    let register_At = date.reverse();
    let regiJournal = {
      username: "IM24 이준희",
      date: register_At.join("-"),
      retrospect: this.retrospect,
    };
    this.journals.unshift(regiJournal);
    return this.setState({ journals: this.journals });
  }

  IsOpen() {
    this.state.isOpen === false
      ? this.setState({ isOpen: true })
      : this.setState({ isOpen: false });
  }

  render() {
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <ProfileEdit />

        <button
          onClick={() => {
            this.IsOpen();
          }}
        >
          isTest
        </button>

        <div className="mypageContainer_editUserInfoFormSec">
          {this.state.isOpen === false ? (
            <>
              <div className="His_submitForm">
                <textarea
                  className="Journal_box"
                  placeholder="Why not to keep a journal about what you did!!!??"
                  onChange={(e) => this.keepJournal(e)}
                />

                <div className="His_submit">
                  <button onClick={() => this.registerJouranl()}>
                    <p className="His_submit_p">등록</p>
                  </button>
                </div>
              </div>
              <ul className="Retro_list">
                <SendRetrospect value={this.state.journals} />
              </ul>
            </>
          ) : (
            <div className="His_closeJournalForm">
              <div className="His_JournalForm">
                <p className="Journal_username">IM24 정인수</p>
                <p className="Journal_date">2021-01-03</p>
                <p className="Journal_text">나는 오늘 css에게 버림받았다.</p>
              </div>
              <div className="His_JournalForm">
                <p className="Journal_username">IM24 정인수</p>
                <p className="Journal_date">2021-01-03</p>
                <p className="Journal_text">나는 오늘 css에게 버림받았다.</p>
              </div>
              <div className="His_JournalForm">
                <p className="Journal_username">IM24 정인수</p>
                <p className="Journal_date">2021-01-03</p>
                <p className="Journal_text">나는 오늘 css에게 버림받았다.</p>
              </div>
              <div className="His_JournalForm">
                <p className="Journal_username">IM24 정인수</p>
                <p className="Journal_date">2021-01-03</p>
                <p className="Journal_text">나는 오늘 css에게 버림받았다.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MngHistory;
