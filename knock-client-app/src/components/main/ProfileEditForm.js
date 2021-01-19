import React, { Component } from "react";
import "../../styles/profileEdit.css";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectList: [
        {
          id: 1,
          category: "Study",
          projectTitle: "즐거운 CSS 배우기",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          id: 2,
          category: "Project",
          projectTitle: "신나는 프로젝트와 함께 1",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          id: 3,
          category: "Project",
          projectTitle: "험난한 프로젝트랑 즐겁게",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          id: 4,
          category: "Project",
          projectTitle: "무난한 프로젝트와 함께",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          id: 5,
          category: "Study",
          projectTitle: "페어프로그래밍을 배워보자",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "CLOSED",
        },
        {
          id: 6,
          category: "Question",
          projectTitle: "코딩으로 보는 오늘의 운세",
          stacks: ["React", "Algorithm"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          id: 7,
          category: "Question",
          projectTitle: "나는 어떻게 여기까지 왔는가?",
          createdAt: "2020-01-17",
          status: "CLOSED",
        },
      ],
      projectCategory: "",
    };

    this.filter = this.filter.bind(this);
    this.openDoor = this.openDoor.bind(this);
  }

  openDoor(e) {
    console.log(e.nativeEvent.path[0].attributes[1].value);
  }

  filter(event) {
    this.setState({ projectCategory: event.target.value });
  }

  render() {
    let filteredProject = [];

    if (this.state.projectCategory === "") {
      filteredProject = this.state.projectList;
    } else {
      this.state.projectList.forEach((project) => {
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
