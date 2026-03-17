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

function showQuiz(index) {
  const quiz = quizzes[index];
  state.currentQuiz = quiz;
  state.round += 1;

  sceneImage.src = quiz.image;
  sceneImage.alt = quiz.alt;
  sceneImage.hidden = false;
  placeholder.hidden = true;

  stageTitle.textContent = `문제 ${state.round}. 이 장면의 명대사는 무엇일까요?`;
  prompt.textContent = "팀원들과 먼저 맞혀본 뒤 정답 보기 버튼으로 확인하세요.";
  answerPanel.hidden = true;
  answerQuote.textContent = "";
  answerMovie.textContent = "";

  answerButton.disabled = false;
  nextButton.disabled = false;
  startButton.textContent = "처음부터 다시 시작";

  updateStaticLabels();
}

function drawRandomQuiz({ reset = false } = {}) {
  if (reset || state.pool.length === 0) {
    refillPool();

    if (reset) {
      state.round = 0;
    }
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
