const imageBase = "./images/movie-quiz";

const quizzes = [
  {
    movie: "타짜",
    quote: "묻고 더블로 가!",
    image: `${imageBase}/tazza.png`,
    alt: "영화 타짜의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/XsM-QWpDgBg?start=19&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "친구",
    quote: "아부지 뭐하시노?",
    image: `${imageBase}/friend.png`,
    alt: "영화 친구의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/SFiMZqJI9Ok?start=77&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "범죄와의 전쟁",
    quote: "느그 서장 남전동 살제? 에? 내가 인마 느그 서장이랑 인마 어저께도 으에? 같이 밥 묵꼬 으에? 사우나도 같이 가고 으에? 마 개섀끼야 마 다했어",
    image: `${imageBase}/crime-war.png`,
    alt: "푸른 조명 아래 실내에서 가운데 인물이 손가락질하며 말하고 양옆에 두 인물이 서 있는 장면을 표현한 일러스트",
    videoEmbed: "https://www.youtube.com/embed/TJJWAe0xqVM?start=34&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "해바라기",
    quote: "꼭 그렇게 다가져가야만 속이 후련했냐! 씨발새끼들아",
    image: `${imageBase}/sunflower.png`,
    alt: "영화 해바라기의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/tUMynEt-E60?start=31&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "내부자들",
    quote: "어차피 대중들은 개 돼집니다",
    image: `${imageBase}/inner.png`,
    alt: "영화 내부자들의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/Uhq_RjTokwg?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "내부자들",
    quote: "닥쳐 이 병신새끼야",
    image: `${imageBase}/shutup.png`,
    alt: "영화 내부자들의 또 다른 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/RxKjyDtY6I0?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "부당거래",
    quote: "호의가 계속되면 그게 권리인줄 알아요",
    image: `${imageBase}/budang.png`,
    alt: "영화 부당거래의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/EcTKvwthsMU?start=39&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "신세계",
    quote: "거 죽기 딱 좋은 날씨네",
    image: `${imageBase}/newworld.png`,
    alt: "영화 신세계의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/F8pJ-Mb4MPM?start=99&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "달콤한 인생",
    quote: "넌 나에게 모욕감을 줬어",
    image: `${imageBase}/sugarlife.png`,
    alt: "영화 달콤한 인생의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/cAbaVkQof7M?start=5&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "극한직업",
    quote: "지금까지 이런맛은 없었다 이것은 갈비인가 통닭인가",
    image: `${imageBase}/helljob.png`,
    alt: "영화 극한직업의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/fQUB-cfz1_k?start=30&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "범죄도시",
    quote: "진실의 방으로",
    image: `${imageBase}/crimecity.png`,
    alt: "영화 범죄도시의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/dqDvHCWI-BA?start=49&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "곡성",
    quote: "뭣이 중헌디?",
    image: `${imageBase}/goksung.png`,
    alt: "영화 곡성의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/AyHrh7PrE0Y?start=24&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "말아톤",
    quote: "초원이 다리는 백만불짜리 다리",
    image: `${imageBase}/malaton.png`,
    alt: "영화 말아톤의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/BeF_JrZhHl4?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "관상",
    quote: "어째 내가 왕이 될 상인가",
    image: `${imageBase}/face.png`,
    alt: "영화 관상의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/VCKvz84sFHY?start=18&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "바람",
    quote: "그라믄 안돼 음? 왜 왜 정상한테 처 갈피고 그렇게 해서는 안돼",
    image: `${imageBase}/wind.png`,
    alt: "영화 바람의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/yvXBRM6Mk1s?start=28&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "이웃사람",
    quote: "어이? 어이가 없네 개새끼가",
    image: `${imageBase}/eut.png`,
    alt: "영화 이웃사람의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/wp5e11-0_js?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "내 머릿속의 지우개",
    quote: "이거 마시면 우리 사귀는 거다",
    image: `${imageBase}/eraser.png`,
    alt: "영화 내 머릿속의 지우개의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/wp5e11-0_js?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "프리즌",
    quote: "7126번 대가리 박아",
    image: `${imageBase}/freezen.png`,
    alt: "영화 프리즌의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/LQGrmfD0e-I?start=212&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "강철비",
    quote: "하루 주갔어",
    image: `${imageBase}/ironbee.png`,
    alt: "영화 강철비의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/dRwDacTVaSQ?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "말죽거리 잔혹사",
    quote: "야이 개새끼야! 니가 그렇게 싸움을 잘해? 옥상으로 올라와",
    image: `${imageBase}/malzuk.png`,
    alt: "영화 말죽거리 잔혹사의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/ZzEbTs40eZ0?start=134&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "암살",
    quote: "구멍이 두개지요",
    image: `${imageBase}/twohole.png`,
    alt: "영화 암살의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/E_dAAyuquDE?start=122&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "더킹",
    quote: "역사적으로 흘러가듯 가",
    image: `${imageBase}/theking.png`,
    alt: "영화 더킹의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/-_pex2PRQcA?start=123&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "사랑이 무서워",
    quote: "이 새끼 아무튼 입만 벌리면 그짓말이 자동으로 나와",
    image: `${imageBase}/upbulgu.png`,
    alt: "영화 사랑이 무서워의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/7hX7HH_hGGg?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "서울의봄",
    quote: "실패하면 반역 성공하면 혁명 아닙니까!",
    image: `${imageBase}/sunggong.png`,
    alt: "영화 서울의봄의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/7B8vlRo0-RY?start=4&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "불량남녀",
    quote: "존나 카리스마 있어 그러니까 여자들이 뻑이 가지",
    image: `${imageBase}/carisma.png`,
    alt: "영화 불량남녀의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/u76Qw4YYb_k?autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "괴물",
    quote: "사망자인데 사망을 안했어요",
    image: `${imageBase}/monster.png`,
    alt: "영화 괴물의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/-3kUxDQ2ZO0?start=301&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "추격자",
    quote: "야 4885 너지?",
    image: `${imageBase}/chu.png`,
    alt: "영화 추격자의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/xsEDWomvSek?start=390&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "공공의 적",
    quote: "이거 너무한거 아니냐고 시팔",
    image: `${imageBase}/gonggong.png`,
    alt: "영화 공공의 적의 대표 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/gLZZe_3j3I4?start=31&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "기생충",
    quote: "너는 다 계획이 있구나",
    image: `${imageBase}/parasite-plan.png`,
    alt: "영화 기생충의 장면을 담은 퀴즈 이미지",
    videoEmbed: "https://www.youtube.com/embed/-Ysf0_EvgEc?start=13&autoplay=1&playsinline=1&rel=0",
  },
  {
    movie: "베테랑",
    quote: "지금 내 기분이 그래.. 어이가 없네?",
    image: `${imageBase}/veteran.jpg`,
    alt: "영화 베테랑에서 유아인이 의자에 기대어 어이없다는 표정을 짓는 장면",
    videoEmbed: "https://www.youtube.com/embed/zASuuYQFht4?start=92&autoplay=1&playsinline=1&rel=0",
  },
];

const totalCount = document.querySelector("#total-count");
const gameStatus = document.querySelector("#game-status");
const scoreCount = document.querySelector("#score-count");
const stageTitle = document.querySelector("#stage-title");
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

const channel = new BroadcastChannel("movie-quiz-ctrl");

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

function broadcastState() {
  channel.postMessage({
    type: "state",
    data: {
      round: state.round,
      score: state.score,
      totalCount: quizzes.length,
      gameStatus: gameStatus.textContent,
      startLabel: startButton.textContent.trim(),
      currentIndex: state.currentQuiz ? quizzes.indexOf(state.currentQuiz) : -1,
      quizList: quizzes.map((q, i) => ({ index: i, movie: q.movie, quote: q.quote })),
      buttons: {
        answer: !answerButton.disabled,
        correct: !correctButton.disabled,
        next: !nextButton.disabled,
        end: !endButton.disabled,
      },
    },
  });
}

function refillPool() {
  state.pool = quizzes.map((_, index) => index);
}

function updateStaticLabels() {
  gameStatus.textContent = state.currentQuiz ? `문제 ${state.round}` : "대기 중";
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
  answerQuote.removeAttribute("title");
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

  stageTitle.textContent = "이 장면의 명대사는 무엇일까요?";
  prompt.hidden = true;
  resetAnswerPanel();

  answerButton.disabled = false;
  correctButton.disabled = false;
  nextButton.disabled = false;
  endButton.disabled = false;
  startButton.textContent = "처음부터 다시 시작";

  updateScore();
  updateStaticLabels();
  broadcastState();
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
  updateScore({ reveal: true });
  broadcastState();
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
  answerQuote.textContent = `"${state.currentQuiz.quote}"`;
  answerQuote.title = state.currentQuiz.quote;
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

  broadcastState();
}

function scoreCorrectAnswer() {
  if (!state.currentQuiz || state.isCurrentScored) {
    return;
  }

  state.score += 1;
  state.isCurrentScored = true;
  correctButton.disabled = true;
  broadcastState();
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

channel.onmessage = ({ data: msg }) => {
  if (msg.type === "requestState") {
    broadcastState();
    return;
  }
  if (msg.type !== "cmd") return;
  switch (msg.action) {
    case "start": drawRandomQuiz({ reset: true }); break;
    case "revealAnswer": revealAnswer(); break;
    case "correct": scoreCorrectAnswer(); break;
    case "next": drawRandomQuiz(); break;
    case "end": showCompletionState(); break;
    case "selectQuiz": {
      const idx = msg.index;
      if (typeof idx !== "number" || idx < 0 || idx >= quizzes.length) break;
      if (state.round === 0) {
        refillPool();
        state.score = 0;
        updateScore();
      }
      const poolIdx = state.pool.indexOf(idx);
      if (poolIdx !== -1) state.pool.splice(poolIdx, 1);
      showQuiz(idx);
      break;
    }
  }
};

updateScore();
updateStaticLabels();
broadcastState();
