const imageBase = "./images/movie-quiz";

const quizzes = [
  {
    movie: "타이타닉",
    quote: "나 세상의 왕이야!",
    image: `${imageBase}/sunset-ship.svg`,
    alt: "석양 아래 거대한 배의 뱃머리에 선 두 사람의 실루엣",
  },
  {
    movie: "대부",
    quote: "그가 거절할 수 없는 제안을 하지.",
    image: `${imageBase}/don-study.svg`,
    alt: "어두운 서재에서 책상과 램프가 놓인 장면을 닮은 일러스트",
  },
  {
    movie: "포레스트 검프",
    quote: "인생은 초콜릿 상자 같은 거야. 열어보기 전엔 모르는 거지.",
    image: `${imageBase}/bench-feather.svg`,
    alt: "벤치와 날아가는 깃털이 있는 공원 풍경 일러스트",
  },
  {
    movie: "다크 나이트",
    quote: "왜 이렇게 진지해?",
    image: `${imageBase}/joker-night.svg`,
    alt: "도시 야경과 카드 문양을 연상시키는 밤 장면 일러스트",
  },
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
  },
];

const totalCount = document.querySelector("#total-count");
const gameStatus = document.querySelector("#game-status");
const stageTitle = document.querySelector("#stage-title");
const remainingPill = document.querySelector("#remaining-pill");
const sceneImage = document.querySelector("#scene-image");
const placeholder = document.querySelector("#placeholder");
const placeholderTicket = document.querySelector("#placeholder-ticket");
const placeholderTitle = document.querySelector("#placeholder-title");
const placeholderCopy = document.querySelector("#placeholder-copy");
const prompt = document.querySelector("#prompt");
const answerPanel = document.querySelector("#answer-panel");
const answerQuote = document.querySelector("#answer-quote");
const answerMovie = document.querySelector("#answer-movie");
const startButton = document.querySelector("#start-button");
const answerButton = document.querySelector("#answer-button");
const nextButton = document.querySelector("#next-button");

const state = {
  pool: [],
  currentQuiz: null,
  round: 0,
};

totalCount.textContent = String(quizzes.length);

const defaultPlaceholder = {
  ticket: placeholderTicket.textContent,
  title: placeholderTitle.textContent,
  copy: placeholderCopy.textContent,
};

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

function updateStaticLabels() {
  gameStatus.textContent = state.currentQuiz ? `문제 ${state.round}` : "대기 중";
  remainingPill.textContent = getRemainingLabel();
}

function restorePlaceholder() {
  placeholder.classList.remove("finish-state");
  placeholderTicket.textContent = defaultPlaceholder.ticket;
  placeholderTitle.textContent = defaultPlaceholder.title;
  placeholderCopy.textContent = defaultPlaceholder.copy;
}

function showQuiz(index) {
  const quiz = quizzes[index];
  state.currentQuiz = quiz;
  state.round += 1;

  restorePlaceholder();
  sceneImage.src = quiz.image;
  sceneImage.alt = quiz.alt;
  sceneImage.hidden = false;
  placeholder.hidden = true;

  stageTitle.textContent = `문제 ${state.round}. 이 장면의 명대사는 무엇일까요?`;
  prompt.hidden = true;
  answerPanel.hidden = true;
  answerQuote.textContent = "";
  answerMovie.textContent = "";

  answerButton.disabled = false;
  nextButton.disabled = false;
  startButton.textContent = "처음부터 다시 시작";

  updateStaticLabels();
}

function showCompletionState() {
  state.currentQuiz = null;

  sceneImage.hidden = true;
  sceneImage.removeAttribute("src");
  sceneImage.alt = "";

  placeholder.classList.add("finish-state");
  placeholderTicket.textContent = "The End";
  placeholderTitle.textContent = "끝!";
  placeholderCopy.textContent = "모든 문제를 사용했습니다. 다시 시작 버튼으로 새 라운드를 시작하세요.";
  placeholder.hidden = false;

  stageTitle.textContent = "모든 문제가 끝났습니다";
  prompt.textContent = "새 라운드를 시작하려면 다시 시작 버튼을 눌러 주세요.";
  prompt.hidden = false;

  answerPanel.hidden = true;
  answerQuote.textContent = "";
  answerMovie.textContent = "";

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

  answerQuote.textContent = `“${state.currentQuiz.quote}”`;
  answerMovie.textContent = `영화: ${state.currentQuiz.movie}`;
  answerPanel.hidden = false;
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
