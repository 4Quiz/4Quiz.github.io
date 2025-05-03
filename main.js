console.log("main.js loaded");  // ← これはmain.jsの一番上に入れてください

let selectedQuizzes = [];
let selectedDifficulty = 'normal';
let questionLimit = 'all';

let quizDataList = [];
let quizData = [];
let currentQuestion = 0;
let correctAnswers = 0;
let userAnswers = [];


const quizFunctionMap = {
  LOL: 'getLOLQuizData',
  APEX: 'getAPEXQuizData',
  OW2: 'getOW2QuizData',
  ST6: 'getST6QuizData',
  VALO: 'getVALOQuizData',

};

// ゲーム選択ボタン切り替え
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.select-button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('selected');
    });
  });
});

function submitSelection() {
  // 選択されたボタンを取得
  const selectedButtons = document.querySelectorAll('.select-button.selected');
  selectedQuizzes = Array.from(selectedButtons).map(btn => btn.dataset.value);

  // 難易度と問題数
  selectedDifficulty = document.querySelector('input[name="difficulty"]:checked')?.value || 'normal';
  questionLimit = document.querySelector('input[name="amount"]:checked')?.value || 'all';

  // ✅ ゲーム種別が選ばれていない場合のアラート
  if (selectedQuizzes.length === 0) {
    alert("必ずゲーム種別を1つ以上選択してください。");
    return false;
  }

  // スタート処理
  document.getElementById("selector").style.display = "none";
  document.getElementById("quiz-area").style.display = "block";

  quizDataList = [];
  loadSelectedQuizzes();

  return false;
}


function loadSelectedQuizzes() {
  let loaded = 0;

  selectedQuizzes.forEach(quizKey => {
    const script = document.createElement('script');
    script.src = `${quizKey}.js`;

    script.onload = () => {
      const funcName = quizFunctionMap[quizKey];
      if (typeof window[funcName] === 'function') {
        const data = window[funcName]();
        console.log(`✅ ${funcName} 読み込み成功`, data);
        quizDataList.push(...data);
      } else {
        console.warn(`⚠️ 関数 ${funcName} が定義されていません`);
      }

      loaded++;
      if (loaded === selectedQuizzes.length) {
        initQuiz();  // ← すべて読み込み終わったら実行
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
  console.log("📋 quizDataList", quizDataList); // ← ここ追加

  if (quizDataList.length === 0) {
    document.getElementById("question").textContent = "クイズデータが読み込めませんでした。";
    return;
  }

  window.originalQuizData = quizDataList;
  runQuiz();
}

function runQuiz() {
  let baseData = window.originalQuizData;

  if (selectedDifficulty !== 'all') {
    baseData = baseData.filter(q => q.difficulty === selectedDifficulty);
  }

  baseData = shuffleArray(baseData);

  if (questionLimit !== 'all') {
    baseData = baseData.slice(0, parseInt(questionLimit));
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
      correct: originalAnswerText
    };
  });

  currentQuestion = 0;
  correctAnswers = 0;
  userAnswers = [];
  showQuestion();
}

function shuffleArray(array) {
  return array.map(a => ({ val: a, rnd: Math.random() }))
              .sort((a, b) => a.rnd - b.rnd)
              .map(a => a.val);
}

function showQuestion() {
  const q = quizData[currentQuestion];
  const questionElem = document.getElementById("question");
  const choicesElem = document.getElementById("choices");

  questionElem.textContent = `Q${currentQuestion + 1}. ${q.question}`;
  choicesElem.innerHTML = "";

  q.choices.forEach((choice, index) => {
    const btn = document.createElement('button');
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(index);
    choicesElem.appendChild(btn);
  });

  document.getElementById("feedback").textContent = "";
}

function checkAnswer(selectedIndex) {
  const q = quizData[currentQuestion];
  const isCorrect = selectedIndex === q.answer;

  userAnswers[currentQuestion] = selectedIndex;

  const feedback = document.getElementById('feedback');
  feedback.textContent = isCorrect ? "正解！" : "不正解...";
  feedback.style.color = isCorrect ? "red" : "blue";

  if (isCorrect) correctAnswers++;

  updateScoreDisplay();

  const buttons = document.querySelectorAll("#choices button");
  buttons.forEach(btn => btn.disabled = true);

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
  document.getElementById("score-top").textContent = `正解数：${correctAnswers} / ${quizData.length}`;
}

function showEnd() {
  const questionElem = document.getElementById("question");
  const choicesElem = document.getElementById("choices");
  const feedbackElem = document.getElementById("feedback");
  const controlElem = document.getElementById("control");
  const endButton = document.getElementById("end-quiz-button");

  if (endButton) {
    endButton.style.display = 'none'; // 「終了する！」ボタン非表示
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

    const div = document.createElement('div');
    div.className = isCorrect ? 'correct-box' : 'incorrect-box';
    div.innerHTML = `
      <strong>Q${idx + 1}: ${q.question}</strong><br>
      あなたの答え: ${userChoice}<br>
      正解: ${q.choices[q.answer]}
    `;
    detailsElem.appendChild(div);
  });
}

function forceEndQuiz() {
  currentQuestion = quizData.length;
  showEnd();
}
