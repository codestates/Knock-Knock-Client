import React, { Component } from "react";
import "../../styles/profileEdit.css";
import { fakeData } from "../../utils/options";
class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fakeData,
      projectCategory: "",
    };

    this.filter = this.filter.bind(this);
    this.openDoor = this.openDoor.bind(this);
  }

  openDoor(e) {
    console.log(e.nativeEvent.path[0].attributes.value.value);
  }

  filter(event) {
    this.setState({ projectCategory: event.target.value });
  }

  render() {
    let filteredProject = [];

    if (this.state.projectCategory === "") {
      filteredProject = this.state.fakeData;
    } else {
      this.state.fakeData.forEach((project) => {
        if (project.category === this.state.projectCategory) {
          filteredProject.push(project);
        }
      });
    }

    console.log(filteredProject);
    return (
      <div className="mypageContainer_profileSec">
        <header className="P_headers">
          <p className="P_subtitle">히스토리</p>
        </header>

        <select className="List_filter" onChange={this.filter}>
          <option value="">카테고리를 선택해주세요.</option>
          <option value="Project">Project</option>
          <option value="Study">Study</option>
          <option value="Question">Question</option>
        </select>

        <nav className="List_container">
          {filteredProject.map((project, idx) => {
            return (
              <div onClick={this.openDoor} value={project.id}>
                <div className="MyList" key={idx} value={project.id}>
                  <ul className="Context" value={project.id}>
                    <li value="Project" value={project.id}>
                      {project.category}
                    </li>
                    <li className="Context_projectTitle" value={project.id}>
                      {project.projectTitle}
                    </li>
                    {project.stacks ? (
                      <li value={project.id}>{project.stacks.join("/")}</li>
                    ) : (
                      <li value={project.id}>스택 없음</li>
                    )}
                  </ul>
                  <div className="MyList_status" value={project.id}>
                    <div className="status_createdAt" value={project.id}>
                      {project.createdAt}
                    </div>
                    {project.status === "OPEN" ? (
                      <div className="status_projectOn" value={project.id}>
                        {project.status}
                      </div>
                    ) : (
                      <div className="status_projectOff" value={project.id}>
                        {project.status}
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
