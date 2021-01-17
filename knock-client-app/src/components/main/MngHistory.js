import React, { Component } from "react";
import ProfileEdit from "./ProfileEditForm";
import "../../styles/history.css";
import SendRetrospect from "./retrospect";

class MngHistory extends Component {
  constructor(props) {
    super(props);

    this.registerJouranl = this.registerJouranl.bind(this);
    this.keepJournal = this.keepJournal.bind(this);

    this.state = {
      // isClick: false,
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

  render() {
    // console.log("props", this.state);
    return (
      <div className="mypageContainer">
        <div className="mypageContainer_blankSec"></div>
        <ProfileEdit />

        <div className="mypageContainer_editUserInfoFormSec">
          <textarea
            className="Journal_box"
            placeholder="Why not to keep a journal about what you did!!!??"
            onChange={(e) => this.keepJournal(e)}
          />
          <button onClick={() => this.registerJouranl()} className="His_submit">
            <p className="His_submit_p">등록</p>
          </button>
          <ul className="Retro_list">
            <SendRetrospect value={this.state.journals} />
          </ul>
        </div>
      </div>
    );
  }
}

export default MngHistory;

// const MngHistory = () => {
//   return (
//     <div className="mypageContainer">
//       <div className="mypageContainer_blankSec"></div>
//       <ProfileEdit />

//       <div className="mypageContainer_editUserInfoFormSec">
//         <>ㅁㅇㄹㄴㅁㅇㄹ</>
//       </div>
//     </div>
//   );
// };

// export default MngHistory;
