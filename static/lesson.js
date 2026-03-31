// ─── Quiz State ──────────────────────────────────────
let currentQ = 0;
let score = 0;
let answered = false;

// ─── Render question ─────────────────────────────────
function renderQuestion() {
  if (currentQ >= QUESTIONS.length) {
    showComplete();
    return;
  }

  answered = false;
  const q = QUESTIONS[currentQ];
  const total = QUESTIONS.length;

  document.getElementById("q-num").textContent = currentQ + 1;
  document.getElementById("quiz-progress-label").textContent =
    "Question " + (currentQ + 1) + " of " + total;
  document.getElementById("quiz-question").textContent = q.q;

  const container = document.getElementById("quiz-options");
  container.innerHTML = "";

  q.opts.forEach(function (opt, idx) {
    const btn = document.createElement("button");
    btn.className = "quiz-option";
    btn.innerHTML =
      '<span class="text-sm font-medium text-gray-700">' + opt + "</span>" +
      '<div class="option-radio"></div>';
    btn.onclick = function () { selectOption(btn, idx); };
    container.appendChild(btn);
  });

  const checkBtn = document.getElementById("check-btn");
  checkBtn.style.display = "flex";
  checkBtn.disabled = false;
  checkBtn.innerHTML =
    currentQ < QUESTIONS.length - 1
      ? '<span>Check Answer</span><span class="material-symbols-outlined text-lg">arrow_forward</span>'
      : '<span>Finish Quiz</span><span class="material-symbols-outlined text-lg">check_circle</span>';
}

// ─── Option select ───────────────────────────────────
let selectedIdx = -1;

function selectOption(btn, idx) {
  if (answered) return;
  selectedIdx = idx;
  document.querySelectorAll(".quiz-option").forEach(function (o) {
    o.classList.remove("selected");
  });
  btn.classList.add("selected");
}

// ─── Check answer ────────────────────────────────────
function checkAnswer() {
  if (answered) return;
  if (selectedIdx === -1) {
    alert("Please select an answer first.");
    return;
  }

  answered = true;
  const q = QUESTIONS[currentQ];
  const options = document.querySelectorAll(".quiz-option");
  const isCorrect = selectedIdx === q.ans;

  if (isCorrect) score++;

  options.forEach(function (opt, idx) {
    if (idx === q.ans) {
      opt.classList.add("result-answer");
    } else if (idx === selectedIdx && !isCorrect) {
      opt.classList.add("result-wrong");
    }
    opt.disabled = true;
  });

  const checkBtn = document.getElementById("check-btn");
  checkBtn.innerHTML = isCorrect
    ? '<span>Correct!</span><span class="material-symbols-outlined text-lg">check_circle</span>'
    : '<span>Next</span><span class="material-symbols-outlined text-lg">arrow_forward</span>';
  checkBtn.style.background = isCorrect ? "#18cb96" : SUBJECT_COLOR;

  setTimeout(function () {
    currentQ++;
    selectedIdx = -1;
    renderQuestion();
  }, 1100);
}

// ─── Completion panel ────────────────────────────────
function showComplete() {
  const quizSection = document.getElementById("quiz-section");
  const completePanel = document.getElementById("complete-panel");
  const checkBtn = document.getElementById("check-btn");

  document.getElementById("quiz-options").style.display = "none";
  document.getElementById("quiz-question").style.display = "none";
  document.querySelector(".quiz-badge") && (document.querySelector(".quiz-badge").style.display = "none");
  document.getElementById("quiz-progress-label").textContent = "Complete!";
  checkBtn.style.display = "none";

  completePanel.style.display = "flex";

  const total = QUESTIONS.length;
  document.getElementById("score-label").textContent =
    "You scored " + score + " out of " + total + " — " +
    (score === total ? "Perfect!" : score >= total / 2 ? "Great job!" : "Keep practising!");
}

// ─── Init ────────────────────────────────────────────
renderQuestion();
