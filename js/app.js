// Main Application Controller & UI Renderer
window.CS_App = (function() {

  function init() {
    initTheme();
    renderHomeView();
    renderTopicsListView();
    CS_Navigation.init();
    CS_Search.init();
    CS_Flashcards.init();
    CS_Quiz.init();

    window.addEventListener('cs_progress_updated', handleProgressUpdate);
    setupThemeToggle();
  }

  // -------------------------------------------------------------------------
  // Theme Management (Light / Dark Theme)
  // -------------------------------------------------------------------------
  function initTheme() {
    const savedTheme = localStorage.getItem('cs_notes_theme') ||
      (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
  }

  function setupThemeToggle() {
    const toggleBtn = document.getElementById('themeToggleBtn');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function() {
      const current = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('cs_notes_theme', nextTheme);
      updateThemeIcon(nextTheme);
    });
  }

  function updateThemeIcon(theme) {
    const iconContainer = document.getElementById('themeIconContainer');
    if (!iconContainer) return;
    if (theme === 'dark') {
      // Sun icon
      iconContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      `;
    } else {
      // Moon icon
      iconContainer.innerHTML = `
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      `;
    }
  }

  // -------------------------------------------------------------------------
  // Render Home Screen
  // -------------------------------------------------------------------------
  function renderHomeView() {
    const grid = document.getElementById('homeTopicsGrid');
    if (!grid || !window.CS_TOPICS) return;

    let html = '';
    window.CS_TOPICS.forEach(function(t) {
      let completedLessons = 0;
      if (t.lessons) {
        t.lessons.forEach(l => {
          if (CS_Progress.isLessonCompleted(l.id)) completedLessons++;
        });
      }
      const totalLessons = t.lessons ? t.lessons.length : 0;
      const isComplete = totalLessons > 0 && completedLessons === totalLessons;

      html += `
        <div class="topic-card" onclick="CS_App.navigateTo('topic', { topicId: '${t.id}' })">
          <div class="topic-card-top">
            <div class="topic-icon-badge">${t.icon}</div>
            <span class="topic-pill">${escapeHtml(t.badge)}</span>
          </div>
          <h3 class="topic-title">${escapeHtml(t.title)}</h3>
          <p class="topic-desc">${escapeHtml(t.description)}</p>
          <div class="topic-meta-bar">
            <span class="topic-meta-item">⏱️ ${t.readingTime}</span>
            <span class="status-badge ${isComplete ? 'completed' : ''}">
              ${isComplete ? '✓ Completed' : `${completedLessons}/${totalLessons} lessons`}
            </span>
          </div>
        </div>
      `;
    });

    grid.innerHTML = html;
    updateProgressUI();
    updateContinueLearningBtn();
  }

  function updateProgressUI() {
    const stats = CS_Progress.getOverallProgress();
    const fillEl = document.getElementById('globalProgressFill');
    const textEl = document.getElementById('globalProgressVal');
    const lessonsEl = document.getElementById('globalProgressLessons');

    if (fillEl) fillEl.style.width = stats.percentage + '%';
    if (textEl) textEl.textContent = stats.percentage + '%';
    if (lessonsEl) lessonsEl.textContent = `${stats.completed} of ${stats.total} lessons finished`;
  }

  function updateContinueLearningBtn() {
    const btn = document.getElementById('continueLearningBtn');
    if (!btn) return;

    const last = CS_Progress.getLastStudied();
    const topic = window.CS_DATA ? window.CS_DATA.getTopicById(last.topicId) : null;
    const title = topic ? topic.shortTitle : 'OOP & Design';

    btn.onclick = function() {
      CS_App.navigateTo('topic', { topicId: last.topicId, lessonId: last.lessonId });
    };
    btn.innerHTML = `<span>Continue: <strong>${escapeHtml(title)}</strong></span> <span>──►</span>`;
  }

  // -------------------------------------------------------------------------
  // Render Topics Curriculum List View
  // -------------------------------------------------------------------------
  function renderTopicsListView() {
    const container = document.getElementById('topicsDirectoryContainer');
    if (!container || !window.CS_TOPICS) return;

    let html = '';
    window.CS_TOPICS.forEach(function(t, idx) {
      let lessonsListHtml = '';
      if (t.lessons) {
        t.lessons.forEach(function(l) {
          const isDone = CS_Progress.isLessonCompleted(l.id);
          lessonsListHtml += `
            <li style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px dashed var(--border-color);font-size:0.875rem;">
              <a href="javascript:void(0)" onclick="CS_App.navigateTo('topic', { topicId: '${t.id}', lessonId: '${l.id}' })" style="color:var(--text-primary);">
                ${escapeHtml(l.title)}
              </a>
              <span style="color:${isDone ? 'var(--success)' : 'var(--text-muted)'};font-size:0.8rem;font-weight:600;">
                ${isDone ? '✓ Finished' : 'Pending'}
              </span>
            </li>
          `;
        });
      }

      html += `
        <div class="topic-card" style="margin-bottom:1rem;cursor:default;">
          <div class="topic-card-top">
            <div style="display:flex;align-items:center;gap:0.75rem;">
              <div class="topic-icon-badge">${t.icon}</div>
              <div>
                <span class="topic-pill">${escapeHtml(t.badge)}</span>
                <h3 class="topic-title" style="margin-top:0.3rem;">${idx + 1}. ${escapeHtml(t.title)}</h3>
              </div>
            </div>
            <button class="continue-btn" style="width:auto;padding:0.4rem 0.8rem;font-size:0.8rem;min-height:36px;" onclick="CS_App.navigateTo('topic', { topicId: '${t.id}' })">
              Open Topic
            </button>
          </div>
          <p class="topic-desc" style="-webkit-line-clamp:none;">${escapeHtml(t.description)}</p>
          <ul style="list-style:none;margin-top:0.5rem;">${lessonsListHtml}</ul>
        </div>
      `;
    });

    container.innerHTML = html;
  }

  // -------------------------------------------------------------------------
  // Render Detailed Topic View with 7-Step Pedagogy
  // -------------------------------------------------------------------------
  function renderTopicDetail(topicId, targetLessonId) {
    const topic = window.CS_DATA ? window.CS_DATA.getTopicById(topicId) : null;
    const container = document.getElementById('topicDetailContent');
    if (!container || !topic) return;

    CS_Progress.saveLastStudied(topicId, targetLessonId);

    // Learning Objectives
    let objectivesHtml = '';
    if (topic.learningObjectives && Array.isArray(topic.learningObjectives)) {
      topic.learningObjectives.forEach(function(obj) {
        objectivesHtml += `<li>${escapeHtml(obj)}</li>`;
      });
    }

    // Table of Contents Links
    let tocHtml = '';
    if (topic.lessons) {
      topic.lessons.forEach(function(l) {
        const isDone = CS_Progress.isLessonCompleted(l.id);
        tocHtml += `
          <a href="#${l.id}" class="filter-chip" style="font-size:0.8rem;margin-right:0.4rem;margin-bottom:0.4rem;">
            ${isDone ? '✓ ' : ''}${escapeHtml(l.title)}
          </a>
        `;
      });
    }

    // Render Each Lesson
    let lessonsHtml = '';
    if (topic.lessons) {
      topic.lessons.forEach(function(l, lIdx) {
        const isDone = CS_Progress.isLessonCompleted(l.id);

        // How it works items
        let howItemsHtml = '';
        if (l.howItWorks && Array.isArray(l.howItWorks)) {
          l.howItWorks.forEach(function(step) {
            howItemsHtml += `<li>${step}</li>`;
          });
        }

        // Key points items
        let keyPointsHtml = '';
        if (l.keyPoints && Array.isArray(l.keyPoints)) {
          l.keyPoints.forEach(function(kp) {
            keyPointsHtml += `<li>${kp}</li>`;
          });
        }

        // Deep Dive Accordion
        let deepDiveHtml = '';
        if (l.deepDive) {
          deepDiveHtml = `
            <details class="deep-dive-details">
              <summary>
                <span>🔍 ${escapeHtml(l.deepDive.title)}</span>
                <span style="font-size:0.8rem;color:var(--text-muted);">Expand ▾</span>
              </summary>
              <div class="deep-dive-body">${l.deepDive.content}</div>
            </details>
          `;
        }

        // Inline Lesson Knowledge Check
        let inlineQuizHtml = '';
        if (l.quiz && Array.isArray(l.quiz) && l.quiz.length > 0) {
          let questionsMarkup = '';
          l.quiz.forEach(function(q, qIdx) {
            let opts = '';
            q.options.forEach(function(opt, oIdx) {
              opts += `
                <button class="option-btn" data-lesson="${l.id}" data-q="${qIdx}" data-opt="${oIdx}" onclick="CS_App.handleInlineQuiz('${l.id}', ${qIdx}, ${oIdx}, ${q.correct})">
                  <span style="font-weight:700;color:var(--text-muted);">${String.fromCharCode(65 + oIdx)}.</span>
                  <span>${escapeHtml(opt)}</span>
                </button>
              `;
            });

            questionsMarkup += `
              <div class="quiz-question-card" id="qcard-${l.id}-${qIdx}">
                <div class="question-text">${qIdx + 1}. ${escapeHtml(q.question)}</div>
                <div class="options-list">${opts}</div>
                <div id="feedback-${l.id}-${qIdx}" class="feedback-box"></div>
              </div>
            `;
          });

          inlineQuizHtml = `
            <div class="lesson-quiz-box">
              <div class="lesson-quiz-title">
                <span>📝 Quick Knowledge Check</span>
              </div>
              ${questionsMarkup}
            </div>
          `;
        }

        // Next Lesson Button
        const nextLesson = topic.lessons[lIdx + 1];
        let nextBtnHtml = '';
        if (nextLesson) {
          nextBtnHtml = `
            <button class="continue-btn" style="width:auto;font-size:0.85rem;" onclick="CS_App.scrollToLesson('${nextLesson.id}')">
              Next Lesson ──►
            </button>
          `;
        } else {
          nextBtnHtml = `
            <button class="continue-btn" style="width:auto;font-size:0.85rem;" onclick="CS_App.navigateTo('quiz', { topicId: '${topic.id}' })">
              Take Topic Quiz 🎯
            </button>
          `;
        }

        lessonsHtml += `
          <div class="lesson-card" id="${l.id}">
            <div class="lesson-header">
              <h2 class="lesson-title">${escapeHtml(l.title)}</h2>
              <div class="lesson-subtitle">${escapeHtml(l.subtitle)}</div>
            </div>

            <!-- Step 1: What is it? -->
            <div class="pedagogy-step">
              <div class="step-label">💡 1. What is it?</div>
              <div class="step-content">${l.whatIsIt}</div>
            </div>

            <!-- Step 2: Why do we need it? -->
            <div class="pedagogy-step">
              <div class="step-label">🎯 2. Why do we need it?</div>
              <div class="step-content">${l.whyNeedIt}</div>
            </div>

            <!-- Step 3: How does it work? -->
            <div class="pedagogy-step">
              <div class="step-label">⚙️ 3. How does it work?</div>
              <div class="step-content">
                <ol>${howItemsHtml}</ol>
              </div>
            </div>

            <!-- Step 4: Real-world example -->
            ${l.realWorldExample ? `
              <div class="real-world-box">
                <div class="real-world-title">🌍 4. Real-World Analogy</div>
                <div class="real-world-text">${l.realWorldExample}</div>
              </div>
            ` : ''}

            <!-- Step 5: Visual Explanation -->
            ${l.diagram ? `
              <div class="pedagogy-step">
                <div class="step-label">🖼️ 5. Visual Explanation</div>
                <div class="diagram-container">
                  ${l.diagram}
                  ${l.diagramCaption ? `<div class="diagram-caption">${escapeHtml(l.diagramCaption)}</div>` : ''}
                </div>
              </div>
            ` : ''}

            <!-- Step 6: Key Points -->
            ${l.keyPoints ? `
              <div class="key-points-box">
                <div class="key-points-title">📌 6. Key Points to Remember</div>
                <ul class="key-points-list">${keyPointsHtml}</ul>
              </div>
            ` : ''}

            <!-- Deep Dive Extra Details -->
            ${deepDiveHtml}

            <!-- Step 7: Quick Knowledge Check -->
            ${inlineQuizHtml}

            <!-- Lesson Navigation & Complete Toggle -->
            <div class="lesson-footer-nav">
              <button id="complete-btn-${l.id}" class="mark-complete-btn ${isDone ? 'completed' : ''}" onclick="CS_App.toggleLessonComplete('${l.id}')">
                <span>${isDone ? '✓ Completed' : '○ Mark as Completed'}</span>
              </button>
              ${nextBtnHtml}
            </div>
          </div>
        `;
      });
    }

    container.innerHTML = `
      <div class="topic-detail-header">
        <a href="javascript:void(0)" class="back-link" onclick="CS_App.navigateTo('home')">
          <span>◄ Back to All Topics</span>
        </a>
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:0.5rem;">
          <span style="font-size:2.2rem;">${topic.icon}</span>
          <div>
            <span class="topic-pill">${escapeHtml(topic.badge)}</span>
            <h1 class="topic-detail-title" style="margin-top:0.2rem;">${escapeHtml(topic.title)}</h1>
          </div>
        </div>
        <p style="font-size:0.95rem;color:var(--text-secondary);">${escapeHtml(topic.description)}</p>
      </div>

      <div class="topic-objectives-box">
        <div class="objectives-title">🎯 Learning Objectives</div>
        <ul class="objectives-list">${objectivesHtml}</ul>
      </div>

      <div style="margin-bottom:1.5rem;">
        <div style="font-size:0.85rem;font-weight:700;color:var(--text-muted);margin-bottom:0.5rem;text-transform:uppercase;">
          📑 Quick Jump Table of Contents
        </div>
        <div style="display:flex;flex-wrap:wrap;">${tocHtml}</div>
      </div>

      <div class="lessons-container">${lessonsHtml}</div>
    `;

    // Scroll to specific lesson if requested
    if (targetLessonId) {
      setTimeout(() => scrollToLesson(targetLessonId), 100);
    }
  }

  function scrollToLesson(lessonId) {
    const el = document.getElementById(lessonId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function toggleLessonComplete(lessonId) {
    const isNowDone = CS_Progress.toggleLessonCompleted(lessonId);
    const btn = document.getElementById('complete-btn-' + lessonId);
    if (btn) {
      if (isNowDone) {
        btn.classList.add('completed');
        btn.innerHTML = '<span>✓ Completed</span>';
      } else {
        btn.classList.remove('completed');
        btn.innerHTML = '<span>○ Mark as Completed</span>';
      }
    }
  }

  function handleInlineQuiz(lessonId, qIdx, selectedOption, correctOption) {
    const card = document.getElementById(`qcard-${lessonId}-${qIdx}`);
    const feedback = document.getElementById(`feedback-${lessonId}-${qIdx}`);
    if (!card || !feedback) return;

    const buttons = card.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === correctOption) {
        btn.classList.add('correct');
      } else if (idx === selectedOption) {
        btn.classList.add('wrong');
      }
    });

    const isCorrect = (selectedOption === correctOption);
    feedback.className = 'feedback-box active ' + (isCorrect ? 'correct' : 'wrong');

    // Fetch explanation from data
    let explanationText = '';
    const topic = window.CS_TOPICS ? window.CS_TOPICS.find(t => t.lessons && t.lessons.some(l => l.id === lessonId)) : null;
    if (topic) {
      const lesson = topic.lessons.find(l => l.id === lessonId);
      if (lesson && lesson.quiz && lesson.quiz[qIdx]) {
        explanationText = lesson.quiz[qIdx].explanation;
      }
    }

    feedback.innerHTML = `
      <strong>${isCorrect ? '🎉 Correct!' : '❌ Incorrect.'}</strong>
      <div>${escapeHtml(explanationText)}</div>
    `;
  }

  // -------------------------------------------------------------------------
  // Render Progress & Analytics View
  // -------------------------------------------------------------------------
  function renderProgressView() {
    const container = document.getElementById('progressAnalyticsContainer');
    if (!container) return;

    const stats = CS_Progress.getOverallProgress();
    const scores = CS_Progress.getQuizScores();
    const totalQuizzesTaken = Object.keys(scores).length;

    let quizListHtml = '';
    Object.keys(scores).forEach(topicId => {
      const item = scores[topicId];
      const topic = window.CS_DATA.getTopicById(topicId);
      const title = topic ? topic.shortTitle : topicId;
      const pct = Math.round((item.score / item.total) * 100);
      quizListHtml += `
        <div style="display:flex;justify-content:space-between;padding:0.4rem 0;border-bottom:1px solid var(--border-color);font-size:0.875rem;">
          <span>${escapeHtml(title)}</span>
          <span style="font-weight:700;color:${pct >= 80 ? 'var(--success)' : 'var(--warning)'};">${item.score}/${item.total} (${pct}%)</span>
        </div>
      `;
    });

    container.innerHTML = `
      <div class="analytics-card">
        <h3 style="font-size:1.15rem;margin-bottom:0.4rem;">Overall Learning Mastery</h3>
        <p style="font-size:0.875rem;color:var(--text-secondary);">Your journey across 9 computer science fundamentals modules.</p>
        <div class="progress-bar-bg" style="height:12px;margin:1rem 0 0.5rem 0;">
          <div class="progress-bar-fill" style="width:${stats.percentage}%;"></div>
        </div>
        <div style="text-align:right;font-size:1rem;font-weight:800;color:var(--primary);">${stats.percentage}% Completed</div>

        <div class="stats-grid">
          <div class="stat-item">
            <div class="stat-val">${stats.completed}</div>
            <div class="stat-label">Lessons Done</div>
          </div>
          <div class="stat-item">
            <div class="stat-val">${stats.total - stats.completed}</div>
            <div class="stat-label">Lessons Left</div>
          </div>
          <div class="stat-item">
            <div class="stat-val">${totalQuizzesTaken}</div>
            <div class="stat-label">Quizzes Taken</div>
          </div>
          <div class="stat-item">
            <div class="stat-val">${stats.total}</div>
            <div class="stat-label">Total Curriculum</div>
          </div>
        </div>
      </div>

      <div class="analytics-card">
        <h3 style="font-size:1.05rem;margin-bottom:0.75rem;">Quiz Scorecard Record</h3>
        ${totalQuizzesTaken > 0 ? quizListHtml : '<p style="font-size:0.85rem;color:var(--text-muted);">No quizzes taken yet. Visit the Quizzes tab to test your knowledge!</p>'}
      </div>

      <div style="text-align:center;margin-top:2rem;">
        <button class="reset-btn" onclick="if(confirm('Are you sure you want to reset all completed lessons and quiz scores?')) { CS_Progress.resetAllProgress(); }">
          ⚠️ Reset All Learning Progress
        </button>
      </div>
    `;
  }

  function handleProgressUpdate() {
    updateProgressUI();
    renderHomeView();
    renderTopicsListView();
    if (CS_Navigation.getCurrentView() === 'progress') {
      renderProgressView();
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return {
    init: init,
    navigateTo: CS_Navigation.navigateTo,
    renderTopicDetail: renderTopicDetail,
    renderProgressView: renderProgressView,
    scrollToLesson: scrollToLesson,
    toggleLessonComplete: toggleLessonComplete,
    handleInlineQuiz: handleInlineQuiz
  };
})();

// Bootstrap app on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  window.CS_App.init();
});
