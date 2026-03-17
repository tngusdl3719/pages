const imageBase = "./images/initial-quiz";

const quizzes = [
  {
    type: "영화",
    title: "기생충",
    clue: "ㄱㅅㅊ",
    image: `${imageBase}/parasite-house.svg`,
    alt: "계단과 대저택을 모티브로 한 기생충 일러스트",
  },
  {
    type: "드라마",
    title: "도깨비",
    clue: "ㄷㄲㅂ",
    image: `${imageBase}/goblin-night.svg`,
    alt: "촛불과 단풍을 모티브로 한 도깨비 일러스트",
  },
  {
    type: "드라마",
    title: "오징어 게임",
    clue: "ㅇㅈㅇ ㄱㅇ",
    image: `${imageBase}/squid-shapes.svg`,
    alt: "원형과 삼각형, 사각형을 활용한 오징어 게임 일러스트",
  },
  {
    type: "영화",
    title: "부산행",
    clue: "ㅂㅅㅎ",
    image: `${imageBase}/busan-train.svg`,
    alt: "달리는 열차를 모티브로 한 부산행 일러스트",
  },
  {
    type: "영화",
    title: "극한직업",
    clue: "ㄱㅎㅈㅇ",
    image: `${imageBase}/extreme-chicken.svg`,
    alt: "치킨 박스를 모티브로 한 극한직업 일러스트",
  },
];

const totalCount = document.querySelector("#total-count");
const gameStatus = document.querySelector("#game-status");
const stageTitle = document.querySelector("#stage-title");
const remainingPill = document.querySelector("#remaining-pill");
const initialStage = document.querySelector("#initial-stage");
const initialTicket = document.querySelector("#initial-ticket");
const initialClue = document.querySelector("#initial-clue");
const initialCopy = document.querySelector("#initial-copy");
const prompt = document.querySelector("#prompt");
const answerPanel = document.querySelector("#answer-panel");
const answerLabel = document.querySelector("#answer-label");
const answerTitle = document.querySelector("#answer-title");
const answerMeta = document.querySelector("#answer-meta");
const answerImage = document.querySelector("#answer-image");
const startButton = document.querySelector("#start-button");
const answerButton = document.querySelector("#answer-button");
const nextButton = document.querySelector("#next-button");

const state = {
  pool: [],
  currentQuiz: null,
  round: 0,
};

const defaultStage = {
  ticket: initialTicket.textContent,
  clue: initialClue.textContent,
  copy: initialCopy.textContent,
};

const defaultAnswer = {
  label: answerLabel.textContent,
  title: answerTitle.textContent,
};

totalCount.textContent = String(quizzes.length);

function refillPool() {
  state.pool = quizzes.map((_, index) => index);
}

function getRemainingLabel() {
  if (!state.currentQuiz) {
    return "문제 준비 완료";
  }

  if (state.pool.length === 0) {
    return "이번 사이클 마지막 문제";
  }

  return `남은 문제 ${state.pool.length}개`;
}

function restoreStage() {
  initialStage.classList.remove("finish-state");
  initialTicket.textContent = defaultStage.ticket;
  initialClue.textContent = defaultStage.clue;
  initialCopy.textContent = defaultStage.copy;
}

function updateStaticLabels() {
  gameStatus.textContent = state.currentQuiz ? `문제 ${state.round}` : "대기 중";
  remainingPill.textContent = getRemainingLabel();
}

function resetAnswerPanel() {
  answerPanel.dataset.state = "idle";
  answerPanel.setAttribute("aria-hidden", "true");
  answerLabel.textContent = defaultAnswer.label;
  answerTitle.textContent = defaultAnswer.title;
  answerMeta.textContent = "";
  answerImage.removeAttribute("src");
  answerImage.alt = "";
}

function showQuiz(index) {
  const quiz = quizzes[index];
  state.currentQuiz = quiz;
  state.round += 1;

  restoreStage();
  initialTicket.textContent = "Initial Clue";
  initialClue.textContent = quiz.clue;
  initialCopy.textContent = "초성을 보고 제목을 먼저 맞혀보세요.";
  stageTitle.textContent = `문제 ${state.round}. 이 초성의 제목은 무엇일까요?`;
  prompt.hidden = true;

  resetAnswerPanel();

  answerButton.disabled = false;
  nextButton.disabled = false;
  startButton.textContent = "처음부터 다시 시작";

  updateStaticLabels();
}

function showCompletionState() {
  state.currentQuiz = null;

  initialStage.classList.add("finish-state");
  initialTicket.textContent = "The End";
  initialClue.textContent = "끝!";
  initialCopy.textContent = "모든 문제를 사용했습니다. 다시 시작 버튼으로 새 라운드를 시작하세요.";
  stageTitle.textContent = "모든 문제가 끝났습니다";
  prompt.textContent = "새 라운드를 시작하려면 다시 시작 버튼을 눌러 주세요.";
  prompt.hidden = false;

  resetAnswerPanel();

  answerButton.disabled = true;
  nextButton.disabled = true;
  startButton.textContent = "다시 시작";

  gameStatus.textContent = "종료";
  remainingPill.textContent = "모든 문제 완료";
}

function drawRandomQuiz({ reset = false } = {}) {
  if (reset) {
    refillPool();
    state.round = 0;
  }

  if (state.pool.length === 0) {
    showCompletionState();
    return;
  }

  const pick = Math.floor(Math.random() * state.pool.length);
  const [quizIndex] = state.pool.splice(pick, 1);
  showQuiz(quizIndex);
}

function revealAnswer() {
  if (!state.currentQuiz) {
    return;
  }

  answerPanel.dataset.state = "revealed";
  answerPanel.setAttribute("aria-hidden", "false");
  answerLabel.textContent = "정답 공개";
  answerTitle.textContent = state.currentQuiz.title;
  answerMeta.textContent = `${state.currentQuiz.type} 정답`;
  answerImage.src = state.currentQuiz.image;
  answerImage.alt = state.currentQuiz.alt;
  gameStatus.textContent = `정답 공개 ${state.round}`;
}

startButton.addEventListener("click", () => {
  drawRandomQuiz({ reset: true });
});

answerButton.addEventListener("click", revealAnswer);

nextButton.addEventListener("click", () => {
  drawRandomQuiz();
});

updateStaticLabels();
