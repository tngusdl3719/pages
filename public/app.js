const imageBase = "./images/movie-quiz";

const quizzes = [
  {
    movie: "타짜",
    quote: "묻고 더블로 가!",
    image: `${imageBase}/card-table.svg`,
    alt: "초록색 카드 테이블과 칩, 카드가 펼쳐진 장면 일러스트",
  },
  {
    movie: "기생충",
    quote: "너는 다 계획이 있구나",
    image: `${imageBase}/parasite-plan.png`,
    alt: "영화 기생충의 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/-Ysf0_EvgEc?start=13&autoplay=1&playsinline=1&rel=0",
  },
];

const totalCount = document.querySelector("#total-count");
const gameStatus = document.querySelector("#game-status");
const scoreCount = document.querySelector("#score-count");
const stageTitle = document.querySelector("#stage-title");
const remainingPill = document.querySelector("#remaining-pill");
const sceneImage = document.querySelector("#scene-image");
const sceneVideo = document.querySelector("#scene-video");
const placeholder = document.querySelector("#placeholder");
const placeholderTicket = document.querySelector("#placeholder-ticket");
const placeholderTitle = document.querySelector("#placeholder-title");
const placeholderCopy = document.querySelector("#placeholder-copy");
const prompt = document.querySelector("#prompt");
const answerPanel = document.querySelector("#answer-panel");
const answerLabel = document.querySelector("#answer-label");
const answerQuote = document.querySelector("#answer-quote");
const answerMovie = document.querySelector("#answer-movie");
const startButton = document.querySelector("#start-button");
const answerButton = document.querySelector("#answer-button");
const correctButton = document.querySelector("#correct-button");
const nextButton = document.querySelector("#next-button");
const endButton = document.querySelector("#end-button");

const state = {
  pool: [],
  currentQuiz: null,
  round: 0,
  score: 0,
  isCurrentScored: false,
};

totalCount.textContent = String(quizzes.length);

const defaultPlaceholder = {
  ticket: placeholderTicket.textContent,
  title: placeholderTitle.textContent,
  copy: placeholderCopy.textContent,
};

const defaultAnswer = {
  label: answerLabel.textContent,
  quote: answerQuote.textContent,
};

function refillPool() {
  state.pool = quizzes.map((_, index) => index);
}

function getRemainingLabel() {
  return `문제 ${state.round} / ${quizzes.length}`;
}

function updateStaticLabels() {
  gameStatus.textContent = state.currentQuiz ? `문제 ${state.round}` : "대기 중";
  remainingPill.textContent = getRemainingLabel();
}

function resetSceneVideo() {
  sceneVideo.hidden = true;
  sceneVideo.removeAttribute("src");
  sceneVideo.title = "";
}

function restorePlaceholder() {
  placeholder.classList.remove("finish-state");
  placeholderTicket.textContent = defaultPlaceholder.ticket;
  placeholderTitle.textContent = defaultPlaceholder.title;
  placeholderCopy.textContent = defaultPlaceholder.copy;
}

function resetAnswerPanel() {
  answerPanel.dataset.state = "idle";
  answerPanel.setAttribute("aria-hidden", "true");
  answerLabel.textContent = defaultAnswer.label;
  answerQuote.textContent = defaultAnswer.quote;
  answerMovie.textContent = "";
}

function updateScore({ reveal = false } = {}) {
  scoreCount.textContent = reveal ? `${state.score}개` : "-";
}

function showQuiz(index) {
  const quiz = quizzes[index];
  state.currentQuiz = quiz;
  state.round += 1;
  state.isCurrentScored = false;

  restorePlaceholder();
  resetSceneVideo();
  sceneImage.src = quiz.image;
  sceneImage.alt = quiz.alt;
  sceneImage.hidden = false;
  placeholder.hidden = true;

  stageTitle.textContent = `문제 ${state.round}. 이 장면의 명대사는 무엇일까요?`;
  prompt.hidden = true;
  resetAnswerPanel();

  answerButton.disabled = false;
  correctButton.disabled = false;
  nextButton.disabled = false;
  endButton.disabled = false;
  startButton.textContent = "처음부터 다시 시작";

  updateScore();
  updateStaticLabels();
}

function showCompletionState() {
  state.currentQuiz = null;
  state.isCurrentScored = false;

  resetSceneVideo();
  sceneImage.hidden = true;
  sceneImage.removeAttribute("src");
  sceneImage.alt = "";

  placeholder.classList.add("finish-state");
  placeholderTicket.textContent = "Result";
  placeholderTitle.textContent = `${state.score}개 정답`;
  placeholderCopy.textContent = `${state.round}문제 진행, ${state.score}개 정답입니다. 다시 시작 버튼으로 새 라운드를 시작하세요.`;
  placeholder.hidden = false;

  stageTitle.textContent = "모든 문제가 끝났습니다";
  prompt.textContent = "새 라운드를 시작하려면 다시 시작 버튼을 눌러 주세요.";
  prompt.hidden = false;

  resetAnswerPanel();

  answerButton.disabled = true;
  correctButton.disabled = true;
  nextButton.disabled = true;
  endButton.disabled = true;
  startButton.textContent = "다시 시작";

  gameStatus.textContent = "종료";
  remainingPill.textContent = "최종 결과";
  updateScore({ reveal: true });
}

function drawRandomQuiz({ reset = false } = {}) {
  if (reset) {
    refillPool();
    state.round = 0;
    state.score = 0;
    updateScore();
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
  answerQuote.textContent = `“${state.currentQuiz.quote}”`;
  answerMovie.textContent = `영화: ${state.currentQuiz.movie}`;
  gameStatus.textContent = `정답 공개 ${state.round}`;

  if (state.currentQuiz.videoEmbed) {
    sceneImage.hidden = true;
    sceneImage.removeAttribute("src");
    sceneImage.alt = "";
    sceneVideo.src = state.currentQuiz.videoEmbed;
    sceneVideo.title = `${state.currentQuiz.movie} 정답 영상`;
    sceneVideo.hidden = false;
  }
}

function scoreCorrectAnswer() {
  if (!state.currentQuiz || state.isCurrentScored) {
    return;
  }

  state.score += 1;
  state.isCurrentScored = true;
  correctButton.disabled = true;
}

startButton.addEventListener("click", () => {
  drawRandomQuiz({ reset: true });
});

answerButton.addEventListener("click", revealAnswer);

correctButton.addEventListener("click", scoreCorrectAnswer);

nextButton.addEventListener("click", () => {
  drawRandomQuiz();
});

endButton.addEventListener("click", showCompletionState);

updateScore();
updateStaticLabels();
