import React, { Component } from "react";
import "../../styles/profileEdit.css";

class ProfileEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isClick: false,
      projectList: [
        {
          category: "Study",
          projectTitle: "즐거운 CSS 배우기",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          category: "Project",
          projectTitle: "신나는 프로젝트와 함께 1",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          category: "Project",
          projectTitle: "험난한 프로젝트랑 즐겁게",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          category: "Project",
          projectTitle: "무난한 프로젝트와 함께",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          category: "Study",
          projectTitle: "페어프로그래밍을 배워보자",
          stacks: ["React", "JS", "HTML", "CSS"],
          createdAt: "2020-01-17",
          status: "CLOSED",
        },
        {
          category: "Question",
          projectTitle: "코딩으로 보는 오늘의 운세",
          stacks: ["React", "Algorithm"],
          createdAt: "2020-01-17",
          status: "OPEN",
        },
        {
          category: "Question",
          projectTitle: "나는 어떻게 여기까지 왔는가?",
          createdAt: "2020-01-17",
          status: "CLOSED",
        },
      ],
      projectCategory: "",
    };

    this.filter = this.filter.bind(this);
    this.isClick = this.isClick.bind(this);
  }

  isClick() {
    !this.state.isClick
      ? this.setState({ isClick: true })
      : this.setState({ isClick: false });
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
          {filteredProject.map((project) => {
            return (
              <div className="MyList" onClick={() => this.isClick()}>
                <ul className="Context">
                  <li value="Project">{project.category}</li>
                  <li className="Context_projectTitle">
                    {project.projectTitle}
                  </li>
                  {project.stacks ? (
                    <li>{project.stacks.join("/")}</li>
                  ) : (
                    <li>스택 없음</li>
                  )}
                </ul>
                <div className="MyList_status">
                  <div className="status_createdAt">{project.createdAt}</div>
                  {project.status === "OPEN" ? (
                    <div className="status_projectOn">{project.status}</div>
                  ) : (
                    <div className="status_projectOff">{project.status}</div>
                  )}
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
