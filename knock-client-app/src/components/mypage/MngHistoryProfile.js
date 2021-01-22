import React, { Component } from "react";
import "../../styles/history_profile.css";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectCategory: "",
    };

    this.filter = this.filter.bind(this);
    this.retroClickHandler = this.retroClickHandler.bind(this);
  }

  retroClickHandler(e) {
    this.props.boardRetroHandler(e.nativeEvent.path[0].attributes.value.value);
  }

  filter(event) {
    this.setState({ projectCategory: event.target.value });
  }

  render() {
    let postStacksArr = [];

    let filteredPosts = [];

    if (this.state.projectCategory === "") {
      filteredPosts = this.props.userPosts;
    } else {
      this.props.userPosts.forEach((post) => {
        if (post.category === this.state.projectCategory) {
          filteredPosts.push(post);
        }
      });
    }

    // 스택 가공 코드 수정 해야함 [이준희]
    filteredPosts.forEach((post) => {
      if (post.post_stacks) {
        postStacksArr.push(post.post_stacks.slice(1, -1).split(","));
      } else {
        postStacksArr.push(null);
      }
    });

    return (
      <div className="mypageContainer_profileSec">
        <header className="P_headers">
          <p className="P_subtitle">히스토리</p>
          <button onClick={() => this.props.mypageHandleFromHisPro()}>
            마이페이지
          </button>
        </header>

        <select className="List_filter" onChange={this.filter}>
          <option value="">카테고리를 선택해주세요.</option>
          <option value="Project">Project</option>
          <option value="Study">Study</option>
          <option value="Question">Question</option>
        </select>

        <nav className="List_container">
          {filteredPosts.map((project, idx) => {
            return (
              <div
                onClick={this.retroClickHandler}
                key={idx}
                value={project.id}
              >
                <div className="MyList" value={project.id}>
                  <div className="Context" value={project.id}>
                    <div value="Project" value={project.id}>
                      {project.category}
                    </div>
                    <div className="Context_projectTitle" value={project.id}>
                      {project.title}
                    </div>
                    {postStacksArr[idx] ? (
                      postStacksArr[idx].map((stack) => {
                        return <div value={project.id}>{stack}</div>;
                      })
                    ) : (
                      <div value={project.id}>스택 없음</div>
                    )}
                  </div>
                  <div className="MyList_status" value={project.id}>
                    <div className="status_createdAt" value={project.id}>
                      {project.created_at.split("T")[0]}
                    </div>
                    {project.open ? (
                      <div className="status_projectOn" value={project.id}>
                        open
                      </div>
                    ) : (
                      <div className="status_projectOff" value={project.id}>
                        closed
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>
      </div>
    );
  }
}

export default ProfileEdit;
