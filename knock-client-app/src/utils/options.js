/*
로직에서 select tag에 있는 옵션들을 이곳에 정렬시켜놓자.
*/

const mbti = [
  "성향을 체크해주세요:)",
  "INTJ",
  "INPT",
  "ENTJ",
  "ENTP",
  "ISTJ",
  "ESTJ",
  "ESFJ",
  "ISFJ",
  "ESTP",
  "ISTP",
  "ESFP",
  "ISFP",
  "ENFJ",
  "INFJ",
  "INFP",
  "ENFP",
];

const stacks = [
  "C",
  "CC",
  "docker",
  "express",
  "graphql",
  "java",
  "mongo",
  "mysql",
  "nest",
  "node",
  "php",
  "post",
  "javascript",
  "typescript",
  "rudy",
  "rust",
  "go",
];

const fakeData = [
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
];

export { stacks, fakeData, mbti };
