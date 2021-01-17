import React, { Component } from "react";
import "../../styles/profileEdit.css";
class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClick: false,
    };

    this.isClick = this.isClick.bind(this);
  }

  isClick() {
    !this.state.isClick
      ? this.setState({ isClick: true })
      : this.setState({ isClick: false });
  }

  render() {
    return (
      <div className="mypageContainer_profileSec">
        <header className="P_headers">
          <p className="P_subtitle">히스토리</p>
        </header>
        <nav className="List_container">
          <div className="MyList" onClick={() => this.isClick()}>
            {/* <p className="start_at">시작일</p>
            <p>OPEN</p> */}
            <ul className="Context">
              <li>Project</li>
              <li>CSS makes me blue</li>
              <li>Front_End</li>
              <li>React</li>
            </ul>
          </div>
          <div className="MyList" onClick={() => this.isClick()}>
            {/* <p className="start_at">시작일</p>
            <p>OPEN</p> */}
            <ul className="Context">
              <li>Project</li>
              <li>Go for it !!! Back_end</li>
              <li>Back_End</li>
              <li>Typescript TypeORM</li>
            </ul>
          </div>
          <div className="MyList" onClick={() => this.isClick()}>
            {/* <p className="start_at">시작일</p>
            <p>OPEN</p> */}
            <ul className="Context">
              <li>Project</li>
              <li>뿌뿌뿌뿌뿌뿌뿌뿌뿌</li>
              <li>Front_End</li>
              <li>React</li>
            </ul>
          </div>
          <div className="MyList" onClick={() => this.isClick()}>
            {/* <p className="start_at">시작일</p>
            <p>OPEN</p> */}
            <ul className="Context">
              <li>Project</li>
              <li>빠빠빠빠빠빠빠빠빠</li>
              <li>Front_End</li>
              <li>React</li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default ProfileEdit;
