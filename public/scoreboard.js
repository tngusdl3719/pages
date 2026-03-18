const storageKey = "workshop-scoreboard-v1";

function createDefaultParticipants() {
  return Array.from({ length: 9 }, (_, index) => ({
    id: index + 1,
    name: `참여자 ${index + 1}`,
    score: 0,
  }));
}

function loadParticipants() {
  try {
    const saved = JSON.parse(window.localStorage.getItem(storageKey) ?? "null");

    if (
      Array.isArray(saved) &&
      saved.length === 9 &&
      saved.every(
        (participant, index) =>
          participant &&
          participant.id === index + 1 &&
          typeof participant.name === "string" &&
          typeof participant.score === "number",
      )
    ) {
      return saved;
    }
  } catch (error) {
    console.error("scoreboard state load failed", error);
  }

  return createDefaultParticipants();
}

const participantGrid = document.querySelector("#participant-grid");
const participantCount = document.querySelector("#participant-count");
const totalScore = document.querySelector("#total-score");
const leaderBoard = document.querySelector("#leader-board");
const scoreboardStatus = document.querySelector("#scoreboard-status");
const resetButton = document.querySelector("#reset-button");

const state = {
  participants: loadParticipants(),
  lastChangedId: null,
  lastDelta: 0,
};

participantCount.textContent = `${state.participants.length}명`;

function saveParticipants() {
  try {
    window.localStorage.setItem(storageKey, JSON.stringify(state.participants));
  } catch (error) {
    console.error("scoreboard state save failed", error);
  }
}

function getLeaderText() {
  if (state.participants.every((participant) => participant.score === 0)) {
    return "아직 집계 전";
  }

  const highestScore = Math.max(...state.participants.map((participant) => participant.score));

  const leaders = state.participants.filter((participant) => participant.score === highestScore);

  if (leaders.length === 1) {
    return `${leaders[0].name} · ${highestScore}점`;
  }

  return `${leaders.map((participant) => participant.name).join(", ")} · ${highestScore}점`;
}

function renderSummary() {
  const total = state.participants.reduce((sum, participant) => sum + participant.score, 0);
  totalScore.textContent = `${total}점`;
  leaderBoard.textContent = getLeaderText();
}

function renderParticipants() {
  participantGrid.innerHTML = state.participants
    .map(
      (participant) => `
        <article
          class="participant-card"
          data-id="${participant.id}"
          data-flash="${state.lastChangedId === participant.id ? (state.lastDelta > 0 ? "up" : "down") : "idle"}"
        >
          <button
            class="participant-surface"
            type="button"
            data-id="${participant.id}"
            aria-describedby="participant-hint-${participant.id}"
          >
            <span class="participant-badge">Player ${String(participant.id).padStart(2, "0")}</span>
            <strong class="participant-name">${participant.name}</strong>
            <span class="participant-score">${participant.score}</span>
            <span class="participant-copy" id="participant-hint-${participant.id}">
              좌클릭 +1 / 우클릭 -1
            </span>
          </button>

          <div class="participant-controls">
            <button class="score-adjust decrement" type="button" data-id="${participant.id}" data-delta="-1">
              -1
            </button>
            <button class="score-adjust increment" type="button" data-id="${participant.id}" data-delta="1">
              +1
            </button>
          </div>
        </article>
      `,
    )
    .join("");
}

function render() {
  renderSummary();
  renderParticipants();
}

function updateStatus(participant, delta) {
  const direction = delta > 0 ? "올렸습니다" : "내렸습니다";
  const amount = delta > 0 ? "+1" : "-1";
  scoreboardStatus.textContent = `${participant.name} 점수를 ${amount} 해서 ${participant.score}점으로 ${direction}.`;
}

function changeScore(id, delta) {
  const participant = state.participants.find((item) => item.id === id);

  if (!participant) {
    return;
  }

  participant.score += delta;
  state.lastChangedId = id;
  state.lastDelta = delta;

  saveParticipants();
  render();
  updateStatus(participant, delta);
}

function resetScores() {
  state.participants = createDefaultParticipants();
  state.lastChangedId = null;
  state.lastDelta = 0;

  saveParticipants();
  render();
  scoreboardStatus.textContent = "모든 참가자의 점수를 0점으로 초기화했습니다.";
}

participantGrid.addEventListener("click", (event) => {
  const adjustButton = event.target.closest(".score-adjust");

  if (adjustButton) {
    changeScore(Number(adjustButton.dataset.id), Number(adjustButton.dataset.delta));
    return;
  }

  const surface = event.target.closest(".participant-surface");

  if (surface) {
    changeScore(Number(surface.dataset.id), 1);
  }
});

participantGrid.addEventListener("contextmenu", (event) => {
  const surface = event.target.closest(".participant-surface");

  if (!surface) {
    return;
  }

  event.preventDefault();
  changeScore(Number(surface.dataset.id), -1);
});

participantGrid.addEventListener("keydown", (event) => {
  const surface = event.target.closest(".participant-surface");

  if (!surface) {
    return;
  }

  if (event.key === "-" || event.key === "ArrowDown") {
    event.preventDefault();
    changeScore(Number(surface.dataset.id), -1);
  }

  if (event.key === "+" || event.key === "ArrowUp") {
    event.preventDefault();
    changeScore(Number(surface.dataset.id), 1);
  }
});

resetButton.addEventListener("click", resetScores);

render();
