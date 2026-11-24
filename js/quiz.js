// Interactive Quiz Hub & Examination Engine
var CS_Quiz = window.CS_Quiz = (function() {
  let activeQuiz = null;
  let currentQIndex = 0;
  let currentScore = 0;
  let hasAnswered = false;

  function renderQuizHub() {
    const hubContainer = document.getElementById('quizHubContainer');
    if (!hubContainer || !window.CS_DATA) return;

    const allQuizzes = window.CS_DATA.getAllQuizzes();
    const recordedScores = CS_Progress.getQuizScores();

    let html = '';
    allQuizzes.forEach(function(quiz) {
      const pastResult = recordedScores[quiz.topicId];
      let scoreBadge = '<span style="color:var(--text-muted);font-size:0.8rem;">Not attempted yet</span>';
      if (pastResult) {
        const pct = Math.round((pastResult.score / pastResult.total) * 100);
        const color = pct >= 80 ? 'var(--success)' : (pct >= 50 ? 'var(--warning)' : 'var(--danger)');
        scoreBadge = `<span style="color:${color};font-weight:700;font-size:0.85rem;">Last Score: ${pastResult.score}/${pastResult.total} (${pct}%)</span>`;
      }

      html += `
        <div class="quiz-card">
          <div>
            <div class="quiz-card-header">
              <span class="quiz-icon">${quiz.topicIcon}</span>
              <div>
                <h3 class="quiz-card-title">${escapeHtml(quiz.topicTitle)}</h3>
                <span class="topic-pill">${escapeHtml(quiz.badge)}</span>
              </div>
            </div>
            <p style="font-size:0.875rem;margin-bottom:0.5rem;">${quiz.questions.length} practice questions with instant explanations.</p>
            <div>${scoreBadge}</div>
          </div>
          <button class="quiz-btn" onclick="CS_Quiz.startQuiz('${quiz.topicId}')">
            <span>Take Quiz</span>
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </button>
        </div>
      `;
    });

    hubContainer.innerHTML = html;
  }

  function startQuiz(topicId) {
    const allQuizzes = window.CS_DATA.getAllQuizzes();
    activeQuiz = allQuizzes.find(q => q.topicId === topicId);
    if (!activeQuiz || !activeQuiz.questions.length) return;

    currentQIndex = 0;
    currentScore = 0;
    hasAnswered = false;

    document.getElementById('quizHubSection').style.display = 'none';
    const activeSection = document.getElementById('activeQuizSection');
    activeSection.style.display = 'block';

    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const container = document.getElementById('activeQuizCard');
    if (!container || !activeQuiz) return;

    hasAnswered = false;
    const q = activeQuiz.questions[currentQIndex];
    const total = activeQuiz.questions.length;
    const progressPct = Math.round(((currentQIndex) / total) * 100);

    let optionsHtml = '';
    q.options.forEach(function(opt, idx) {
      optionsHtml += `
        <button class="option-btn" data-index="${idx}" onclick="CS_Quiz.selectAnswer(${idx})">
          <span style="font-weight:700;color:var(--text-muted);">${String.fromCharCode(65 + idx)}.</span>
          <span>${escapeHtml(opt)}</span>
        </button>
      `;
    });

    container.innerHTML = `
      <div class="quiz-progress-indicator">
        <span>${escapeHtml(activeQuiz.topicTitle)}</span>
        <span>Question ${currentQIndex + 1} of ${total}</span>
      </div>
      <div class="progress-bar-bg" style="margin-bottom:1.2rem;">
        <div class="progress-bar-fill" style="width:${progressPct}%;"></div>
      </div>

      <div class="question-text" style="font-size:1.1rem;margin-bottom:1rem;">${escapeHtml(q.question)}</div>
      <div class="options-list" id="quizOptionsList">${optionsHtml}</div>

      <div id="quizFeedbackBox" class="feedback-box"></div>

      <div id="quizActionFooter" style="margin-top:1.2rem;display:flex;justify-content:space-between;align-items:center;">
        <button class="icon-btn" onclick="CS_Quiz.exitQuiz()" title="Exit Quiz">
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <button id="quizNextBtn" class="continue-btn" style="display:none;width:auto;" onclick="CS_Quiz.nextQuestion()">
          ${currentQIndex === total - 1 ? 'Finish & See Score' : 'Next Question ──►'}
        </button>
      </div>
    `;
  }

  function selectAnswer(selectedIndex) {
    if (hasAnswered || !activeQuiz) return;
    hasAnswered = true;

    const q = activeQuiz.questions[currentQIndex];
    const optionsContainer = document.getElementById('quizOptionsList');
    const feedbackBox = document.getElementById('quizFeedbackBox');
    const nextBtn = document.getElementById('quizNextBtn');

    const buttons = optionsContainer.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.add('correct');
      } else if (idx === selectedIndex) {
        btn.classList.add('wrong');
      }
    });

    const isCorrect = (selectedIndex === q.correct);
    if (isCorrect) currentScore++;

    feedbackBox.className = 'feedback-box active ' + (isCorrect ? 'correct' : 'wrong');
    feedbackBox.innerHTML = `
      <strong>${isCorrect ? '🎉 Correct!' : '❌ Not quite!'}</strong>
      <div style="margin-top:0.25rem;">${escapeHtml(q.explanation)}</div>
    `;

    if (nextBtn) nextBtn.style.display = 'inline-flex';
  }

  function nextQuestion() {
    if (!activeQuiz) return;
    if (currentQIndex < activeQuiz.questions.length - 1) {
      currentQIndex++;
      renderCurrentQuestion();
    } else {
      showQuizResults();
    }
  }

  function showQuizResults() {
    const container = document.getElementById('activeQuizCard');
    if (!container || !activeQuiz) return;

    const total = activeQuiz.questions.length;
    const pct = Math.round((currentScore / total) * 100);

    // Save score
    CS_Progress.recordQuizScore(activeQuiz.topicId, currentScore, total);

    let verdict = 'Great effort! Keep practicing.';
    let verdictIcon = '🌱';
    if (pct === 100) {
      verdict = 'Outstanding Masterclass! 100% Perfect Score!';
      verdictIcon = '🏆';
    } else if (pct >= 80) {
      verdict = 'Excellent work! You have strong mastery of this topic.';
      verdictIcon = '🌟';
    } else if (pct >= 60) {
      verdict = 'Good job! A quick review will make you unbeatable.';
      verdictIcon = '👍';
    }

    container.innerHTML = `
      <div class="quiz-score-banner">
        <div style="font-size:3rem;margin-bottom:0.5rem;">${verdictIcon}</div>
        <div class="score-number">${currentScore} / ${total}</div>
        <h3 style="font-size:1.2rem;margin-bottom:0.5rem;">${verdict}</h3>
        <p style="font-size:0.9rem;color:var(--text-secondary);max-width:380px;margin:0 auto 1.5rem auto;">
          You answered ${currentScore} out of ${total} questions correctly (${pct}%).
        </p>

        <div style="display:flex;gap:0.75rem;justify-content:center;flex-wrap:wrap;">
          <button class="continue-btn" style="width:auto;" onclick="CS_Quiz.startQuiz('${activeQuiz.topicId}')">
            🔄 Retry Quiz
          </button>
          <button class="mark-complete-btn" onclick="CS_Quiz.exitQuiz()">
            Back to Quiz Center
          </button>
        </div>
      </div>
    `;
  }

  function exitQuiz() {
    activeQuiz = null;
    document.getElementById('activeQuizSection').style.display = 'none';
    document.getElementById('quizHubSection').style.display = 'block';
    renderQuizHub();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return {
    init: renderQuizHub,
    startQuiz: startQuiz,
    selectAnswer: selectAnswer,
    nextQuestion: nextQuestion,
    exitQuiz: exitQuiz
  };
})();
