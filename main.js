console.log("main.js loaded");

let selectedQuizzes = [];
let selectedDifficulty = "all";
let questionLimit = "all";

let quizDataList = [];
let quizData = [];
let currentQuestion = 0;
let correctAnswers = 0;
let userAnswers = [];

const quizFunctionMap = {
  LOL: "getLOLQuizData",
  APEX: "getAPEXQuizData",
  OW2: "getOW2QuizData",
  ST6: "getST6QuizData",
  VALO: "getVALOQuizData",
};



function submitSelection() {
  // index.html の selectGame() で選ばれたゲームを優先
  if (window.selectedGame) {
  selectedQuizzes = [window.selectedGame];
} else {
    const selectedButton = document.querySelector(".select-button.selected");

    if (!selectedButton) {
      alert("必ずゲーム種別を1つ選択してください。");
      return false;
    }

    selectedQuizzes = [selectedButton.dataset.value];
  }

  selectedDifficulty = document.querySelector('input[name="difficulty"]:checked')?.value || "all";
  console.log("選択されたカテゴリ:", selectedDifficulty);
  questionLimit = document.querySelector('input[name="amount"]:checked')?.value || "all";

  document.getElementById("selector").style.display = "none";
  document.getElementById("quiz-area").style.display = "block";

  quizDataList = [];
  loadSelectedQuizzes();

  return false;
}

function loadSelectedQuizzes() {
  let loaded = 0;

  selectedQuizzes.forEach(quizKey => {
    const script = document.createElement("script");
    script.src = `${quizKey}.js?v=${Date.now()}`;

    script.onload = () => {
      const funcName = quizFunctionMap[quizKey];

      if (typeof window[funcName] === "function") {
        const data = window[funcName]();
        console.log(`✅ ${funcName} 読み込み成功`, data);
        quizDataList.push(...data);
      } else {
        console.warn(`⚠️ 関数 ${funcName} が定義されていません`);
      }

      loaded++;

      if (loaded === selectedQuizzes.length) {
        initQuiz();
      }
    };

    script.onerror = () => {
      console.error(`ファイル読み込み失敗: ${script.src}`);

      loaded++;

      if (loaded === selectedQuizzes.length) {
        initQuiz();
      }
    };

    document.head.appendChild(script);
  });
}

function initQuiz() {
  console.log("📋 quizDataList", quizDataList);

  if (quizDataList.length === 0) {
    document.getElementById("question").textContent = "クイズデータが読み込めませんでした。";
    return;
  }

  window.originalQuizData = quizDataList;
  runQuiz();
}

function runQuiz() {
  let baseData = window.originalQuizData;

 if (selectedDifficulty !== "all") {
  baseData = baseData.filter(q => {
    return String(q.difficulty).trim() === String(selectedDifficulty).trim();
  });
}

  if (baseData.length === 0) {
    document.getElementById("question").textContent = "選択した条件の問題がありません。";
    document.getElementById("choices").innerHTML = "";
    return;
  }

  baseData = shuffleArray(baseData);

  if (questionLimit !== "all") {
    baseData = baseData.slice(0, parseInt(questionLimit, 10));
  }

  quizData = baseData.map(q => {
    const originalAnswerText = q.choices[q.answer];
    const shuffledChoices = shuffleArray(q.choices);
    const newAnswerIndex = shuffledChoices.indexOf(originalAnswerText);

    return {
  question: q.question,
  choices: shuffledChoices,
  answer: newAnswerIndex,
  difficulty: q.difficulty,
  image: q.image,
  images: q.images,
  correct: originalAnswerText,
};
  });

  currentQuestion = 0;
  correctAnswers = 0;
  userAnswers = [];

  updateScoreDisplay();
  showQuestion();
}

function shuffleArray(array) {
  return array
    .map(a => ({ val: a, rnd: Math.random() }))
    .sort((a, b) => a.rnd - b.rnd)
    .map(a => a.val);
}

function showQuestion() {
  const q = quizData[currentQuestion];

  const imageArea = document.getElementById("question-image-area");
  const questionElem = document.getElementById("question");
  const choicesElem = document.getElementById("choices");
  const feedbackElem = document.getElementById("feedback");

  imageArea.innerHTML = "";

// 複数画像対応
if (q.images && q.images.length > 0) {

  imageArea.innerHTML = q.images
    .map(img =>
      `<img src="${img}" alt="問題画像" class="question-image">`
    )
    .join("");

}
// 単一画像対応
else if (q.image) {

  imageArea.innerHTML =
    `<img src="${q.image}" alt="問題画像" class="question-image">`;

}

  questionElem.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  choicesElem.innerHTML = "";
  feedbackElem.textContent = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index);
    choicesElem.appendChild(btn);
  });
}

function checkAnswer(selectedIndex) {
  const q = quizData[currentQuestion];
  const isCorrect = selectedIndex === q.answer;

  userAnswers[currentQuestion] = selectedIndex;

  const feedback = document.getElementById("feedback");
  feedback.textContent = isCorrect ? "正解！" : "不正解...";
  feedback.style.color = isCorrect ? "red" : "blue";

  if (isCorrect) {
    correctAnswers++;
  }

  updateScoreDisplay();

  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(btn => {
    btn.disabled = true;
  });

  setTimeout(() => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      showQuestion();
    } else {
      showEnd();
    }
  }, 1000);
}

function updateScoreDisplay() {
  const scoreTop = document.getElementById("score-top");

  if (scoreTop) {
    scoreTop.textContent = `正解数：${correctAnswers} / ${quizData.length}`;
  }
}

function showEnd() {
  const questionElem = document.getElementById("question");
  const choicesElem = document.getElementById("choices");
  const feedbackElem = document.getElementById("feedback");
  const controlElem = document.getElementById("control");
  const endButton = document.getElementById("end-quiz-button");

  if (endButton) {
    endButton.style.display = "none";
  }

  questionElem.innerHTML = `<div style="font-size: 2.4rem; font-weight: bold;">クイズ終了！</div>`;
  choicesElem.innerHTML = "";
  feedbackElem.textContent = "";

  updateScoreDisplay();

  controlElem.innerHTML = `
    <button onclick="showDetails()">詳細を見る</button>
    <button onclick="location.reload()">スタートに戻る</button>
  `;
}

function showDetails() {
  const detailsElem = document.getElementById("details");

  detailsElem.style.display = "block";
  detailsElem.innerHTML = "<h3>回答詳細</h3>";

  quizData.forEach((q, idx) => {
    const isCorrect = userAnswers[idx] === q.answer;
    const userChoice = q.choices[userAnswers[idx]] || "未回答";

    const div = document.createElement("div");
    div.className = isCorrect ? "correct-box" : "incorrect-box";
    div.innerHTML = `
      <strong>Q${idx + 1}: ${q.question}</strong><br>
      あなたの答え: ${userChoice}<br>
      正解: ${q.correct}
    `;

    detailsElem.appendChild(div);
  });
}

function forceEndQuiz() {
  currentQuestion = quizData.length;
  showEnd();
}
