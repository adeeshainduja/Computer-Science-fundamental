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

  // Simulation state
  let simState = {
    bankBalance: 1000,
    subscribers: ['Alice', 'Bob']
  };

  function copyCode(btn) {
    const wrapper = btn.closest('.code-block-wrapper');
    if (!wrapper) return;
    const pre = wrapper.querySelector('.code-pre');
    if (!pre) return;
    navigator.clipboard.writeText(pre.innerText).then(function() {
      const orig = btn.innerHTML;
      btn.innerHTML = '<span>✓ Copied!</span>';
      btn.classList.add('copied');
      setTimeout(function() {
        btn.innerHTML = orig;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(function() {
      // Fallback
      btn.innerHTML = '<span>✓ Copied!</span>';
      setTimeout(function() { btn.innerHTML = '<span>Copy</span>'; }, 2000);
    });
  }

  function runSim(simId, action) {
    if (simId === 'bank') {
      const out = document.getElementById('sim-output-bank');
      if (!out) return;
      if (action === 'deposit') {
        simState.bankBalance += 500;
        out.textContent = `[SUCCESS] Deposited $500. Validated: amount > 0. Current Balance: $${simState.bankBalance}`;
      } else if (action === 'withdraw-valid') {
        if (simState.bankBalance >= 300) {
          simState.bankBalance -= 300;
          out.textContent = `[SUCCESS] Withdrew $300. Validated: amount <= balance. Current Balance: $${simState.bankBalance}`;
        } else {
          out.textContent = `[REJECTED] Invariant Protected! Insufficient funds ($${simState.bankBalance}). Cannot withdraw $300.`;
        }
      } else if (action === 'withdraw-invalid') {
        out.textContent = `[REJECTED] Invariant Protected! IllegalArgumentException: Withdrawal amount (-$100) must be positive!`;
      } else if (action === 'hack') {
        out.textContent = `[COMPILER ERROR] 'balance' has private access in BankAccount. Direct field mutation is physically prohibited by Encapsulation!`;
      }
    } else if (simId === 'fragile') {
      const out = document.getElementById('sim-output-fragile');
      if (!out) return;
      if (action === 'inheritance') {
        out.textContent = `[INHERITANCE EXECUTION TRACE]:\n1. addAll([1, 2, 3]) called on CountingList.\n2. CountingList increments count by 3 (count = 3).\n3. CountingList invokes super.addAll([1, 2, 3]).\n4. SimpleList.addAll loops over each item and calls this.add(item)!\n5. Dynamic Dispatch routes back to CountingList.add(item) for all 3 items!\n6. CountingList.add increments count 3 more times!\n\nRESULT:\nExpected Count: 3\nActual Count: 6 (BUG: Double-counting due to base class self-use!)`;
      } else if (action === 'composition') {
        out.textContent = `[COMPOSITION EXECUTION TRACE]:\n1. addAll([1, 2, 3]) called on CountingList.\n2. CountingList increments count by 3 (count = 3).\n3. CountingList forwards directly: internalList.addAll([1, 2, 3]).\n4. SimpleList adds items to internal array without calling CountingList methods.\n\nRESULT:\nExpected Count: 3\nActual Count: 3 (SUCCESS: Invariant protected by Composition!)`;
      }
    } else if (simId === 'dispatch') {
      const out = document.getElementById('sim-output-dispatch');
      if (!out) return;
      if (action === 'overriding') {
        out.textContent = `Reference Type: Animal a = new Dog();\nCall: a.makeSound();\nMethod Table: vtable inspection of runtime heap object (Dog).\nOUTPUT: 'Woof! Bark!' -> Dynamic Method Dispatch resolved at RUNTIME!`;
      } else if (action === 'hiding') {
        out.textContent = `Reference Type: Parent p = new Child();\nCall: p.staticMethod();\nResolution: Resolved at COMPILE-TIME using reference type 'Parent'.\nOUTPUT: 'Parent static method' -> Static Method Hiding, NOT overriding!`;
      }
    } else if (simId === 'observer') {
      const out = document.getElementById('sim-output-observer');
      if (!out) return;
      if (action === 'add') {
        const name = 'User_' + Math.floor(Math.random() * 900 + 100);
        simState.subscribers.push(name);
        out.textContent = `[SUBSCRIBE] ${name} subscribed to YouTubeChannel.\nActive Subscribers (${simState.subscribers.length}): ${simState.subscribers.join(', ')}`;
      } else if (action === 'remove') {
        if (simState.subscribers.length > 0) {
          const removed = simState.subscribers.pop();
          out.textContent = `[UNSUBSCRIBE] ${removed} unsubscribed.\nActive Subscribers (${simState.subscribers.length}): ${simState.subscribers.join(', ')}`;
        }
      } else if (action === 'notify') {
        out.textContent = `[BROADCAST NOTIFICATION]\nVideo Uploaded: 'Mastering OOP & SOLID'\nNotified ${simState.subscribers.length} subscribers:\n` + simState.subscribers.map(s => `  -> Pushed notification to ${s}`).join('\n');
      }
    } else {
      const out = document.getElementById('sim-output-' + simId);
      if (out) {
        out.textContent = `[SIMULATION EVENT]: Action '${action}' executed successfully on ${simId}. State transition complete.`;
      }
    }
  }

  function formatMarkdown(text) {
    if (!text) return '';
    if (text.includes('<p>') || text.includes('<div>') || text.includes('<ul>')) return text;
    
    let html = text
      .replace(/^### (.*$)/gim, '<h4 style="color:var(--primary);margin:1.1rem 0 0.4rem 0;font-size:1.05rem;font-weight:700;">$1</h4>')
      .replace(/^## (.*$)/gim, '<h3 style="color:var(--text-primary);margin:1.3rem 0 0.5rem 0;font-size:1.15rem;font-weight:700;">$1</h3>')
      .replace(/^# (.*$)/gim, '<h2 style="color:var(--text-primary);margin:1.5rem 0 0.75rem 0;">$1</h2>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
      .replace(/^\s*-\s+(.*$)/gim, '<li>$1</li>')
      .replace(/\n\n+/g, '<br><br>');
    return html;
  }

  function renderCodeBlock(codeObj) {
    const title = codeObj.title || 'Code Snippet';
    const lang = codeObj.lang || codeObj.language || 'java';
    const code = escapeHtml(codeObj.code || '');
    return `
      <div class="code-block-wrapper">
        <div class="code-header">
          <span class="code-title">📄 ${escapeHtml(title)}</span>
          <div style="display:flex;align-items:center;gap:0.5rem;">
            <span class="code-lang-pill">${escapeHtml(lang)}</span>
            <button class="copy-code-btn" onclick="CS_App.copyCode(this)" title="Copy Code">
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
              <span>Copy</span>
            </button>
          </div>
        </div>
        <pre class="code-pre"><code>${code}</code></pre>
        ${codeObj.explanation ? `<div style="padding:0.75rem 1rem;background:#1e293b;border-top:1px solid #334155;color:#94a3b8;font-size:0.83rem;line-height:1.5;">${codeObj.explanation}</div>` : ''}
      </div>
    `;
  }

  function renderBadVsGood(bgObj) {
    return `
      <div class="bad-vs-good-grid">
        <div class="bad-code-card">
          <div class="bad-code-title">❌ Problematic Implementation (${escapeHtml(bgObj.badTitle || 'Violation')})</div>
          <pre class="code-pre" style="background:#18181b;padding:0.75rem;border-radius:4px;"><code>${escapeHtml(bgObj.badCode)}</code></pre>
          <p style="margin-top:0.5rem;font-size:0.82rem;color:#fca5a5;line-height:1.4;">${bgObj.badWhy || ''}</p>
        </div>
        <div class="good-code-card">
          <div class="good-code-title">✓ Refactored Clean Solution (${escapeHtml(bgObj.goodTitle || 'Clean Architecture')})</div>
          <pre class="code-pre" style="background:#18181b;padding:0.75rem;border-radius:4px;"><code>${escapeHtml(bgObj.goodCode)}</code></pre>
          <p style="margin-top:0.5rem;font-size:0.82rem;color:#6ee7b7;line-height:1.4;">${bgObj.goodWhy || ''}</p>
        </div>
      </div>
    `;
  }

  function renderComparisonTable(tableObj) {
    let ths = tableObj.headers.map(h => `<th>${escapeHtml(h)}</th>`).join('');
    let trs = tableObj.rows.map(r => `<tr>${r.map(c => `<td>${formatMarkdown(c)}</td>`).join('')}</tr>`).join('');
    return `
      <div class="table-wrapper">
        <table class="comparison-table">
          <thead><tr>${ths}</tr></thead>
          <tbody>${trs}</tbody>
        </table>
      </div>
    `;
  }

  function renderInterviewQA(qaList) {
    let items = '';
    qaList.forEach(function(qa, idx) {
      const qText = qa.question || qa.q || '';
      const shortAns = qa.shortAnswer || qa.shortA || '';
      const deepAns = qa.detailedAnswer || qa.deepA || '';
      const followUps = qa.followUps || (qa.followUp ? [qa.followUp] : []);

      items += `
        <div class="interview-qa-card">
          <div class="qa-question-bar">
            <span style="color:var(--primary);font-weight:800;">Q${idx + 1}:</span>
            <span>${escapeHtml(qText)}</span>
          </div>
          <div class="qa-body">
            <div class="qa-short-answer-box">
              <div class="qa-short-answer-label">🎯 30-Second Interview Answer</div>
              <div style="font-size:0.88rem;color:var(--text-primary);line-height:1.5;">${escapeHtml(shortAns)}</div>
            </div>
            <div class="qa-deep-dive-text">
              <strong>Deep Technical Explanation:</strong><br>
              ${formatMarkdown(deepAns)}
            </div>
            ${qa.code ? renderCodeBlock({ title: qa.codeTitle || 'Code Example', lang: qa.codeLang || qa.language || 'java', code: qa.code }) : ''}
            ${followUps && followUps.length > 0 ? `
              <div class="qa-followup-box">
                <div class="qa-followup-title">⚡ Likely Interviewer Follow-Up Questions:</div>
                <ul style="margin:0;padding-left:1.2rem;">
                  ${followUps.map(f => `<li>${escapeHtml(f)}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    });
    return `<div class="interview-qa-list">${items}</div>`;
  }

  function renderCheatSheet(sheetObj) {
    let items = '';
    if (sheetObj && sheetObj.items && Array.isArray(sheetObj.items)) {
      sheetObj.items.forEach(function(item) {
        items += `
          <div class="cheat-item">
            <div class="cheat-term">💡 ${escapeHtml(item.term)}</div>
            <div class="cheat-desc">${formatMarkdown(item.desc)}</div>
          </div>
        `;
      });
    }
    return `
      <div class="cheat-sheet-card">
        <div class="cheat-sheet-title">
          <span>⚡ 2-Minute Pre-Interview Revision Cheat Sheet</span>
        </div>
        <div class="cheat-sheet-grid">${items}</div>
      </div>
    `;
  }

  // -------------------------------------------------------------------------
  // Render Detailed Topic View with 3-Level Pedagogy & Full Technical Depth
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

    // Render Each Lesson with 3 Levels of Learning (Normalized for both flat & nested schemas)
    let lessonsHtml = '';
    if (topic.lessons) {
      topic.lessons.forEach(function(l, lIdx) {
        const isDone = CS_Progress.isLessonCompleted(l.id);

        const lvl1 = l.level1 || {};
        const lvl2 = l.level2 || {};
        const lvl3 = l.level3 || {};

        const whatIsIt = l.whatIsIt || lvl1.intro || lvl1.whatIsIt || '';
        const whyNeedIt = l.whyNeedIt || lvl1.whyNeedIt || lvl1.whyDoWeNeedIt || '';
        const howItWorks = (l.howItWorks && l.howItWorks.length > 0) ? l.howItWorks : (lvl1.howItWorks || []);
        const realWorldExample = l.realWorldExample || lvl1.analogy || lvl1.realWorldExample || '';
        const diagram = l.diagram || lvl1.svgDiagram || lvl1.diagram || '';
        const diagramCaption = l.diagramCaption || lvl1.diagramCaption || '';

        const technicalExplanation = l.technicalExplanation || lvl2.technicalExplanation || '';
        const internalMechanisms = l.internalMechanisms || lvl2.internalMechanisms || '';
        const codeBlocksList = (l.codeBlocks && l.codeBlocks.length > 0) ? l.codeBlocks : (lvl2.codeExamples || lvl2.codeBlocks || []);
        const badGoodData = l.badVsGood || lvl2.badVsGood || null;
        const tableData = l.comparisonTable || lvl2.comparisonTable || null;
        const simData = l.simulation || lvl2.simulation || null;
        const deepDiveData = l.deepDive || lvl2.deepDive || null;

        const keyPointsList = (l.keyPoints && l.keyPoints.length > 0) ? l.keyPoints : (lvl3.keyPoints || []);
        const interviewQAList = (l.interviewQA && l.interviewQA.length > 0) ? l.interviewQA : (lvl3.interviewQA || []);
        const cheatSheetData = l.cheatSheet || lvl3.cheatSheet || null;
        const quizList = (l.quiz && l.quiz.length > 0) ? l.quiz : (lvl3.quiz || []);

        // How it works items
        let howItemsHtml = '';
        if (Array.isArray(howItWorks) && howItWorks.length > 0) {
          howItWorks.forEach(function(step) {
            howItemsHtml += `<li>${formatMarkdown(step)}</li>`;
          });
        }

        // Key points items
        let keyPointsHtml = '';
        if (Array.isArray(keyPointsList) && keyPointsList.length > 0) {
          keyPointsList.forEach(function(kp) {
            keyPointsHtml += `<li>${formatMarkdown(kp)}</li>`;
          });
        }

        // Code Blocks in Level 2
        let codeBlocksHtml = '';
        if (Array.isArray(codeBlocksList) && codeBlocksList.length > 0) {
          codeBlocksList.forEach(function(cb) {
            codeBlocksHtml += renderCodeBlock(cb);
          });
        }

        // Bad vs Good Code
        let badGoodHtml = '';
        if (badGoodData) {
          badGoodHtml = renderBadVsGood(badGoodData);
        }

        // Comparison Table
        let tableHtml = '';
        if (tableData) {
          tableHtml = renderComparisonTable(tableData);
        }

        // Interactive Simulation
        let simHtml = '';
        if (simData) {
          simHtml = `
            <div class="interactive-sim-box">
              <div class="sim-header">
                <span class="sim-title">🎮 Interactive Simulator: ${escapeHtml(simData.title)}</span>
                <span class="topic-pill" style="font-size:0.7rem;">Live Demo</span>
              </div>
              <p style="font-size:0.85rem;color:var(--text-secondary);margin-bottom:0.75rem;">${escapeHtml(simData.description)}</p>
              <div class="sim-controls">
                ${(simData.buttons || []).map(b => `<button class="sim-btn ${b.isDanger ? 'sim-btn-danger' : ''}" onclick="CS_App.runSim('${simData.id}', '${b.action}')">${escapeHtml(b.label)}</button>`).join('')}
              </div>
              <div id="sim-output-${simData.id}" class="sim-output">${escapeHtml(simData.initialOutput)}</div>
            </div>
          `;
        }

        // Deep Dive Accordion
        let deepDiveHtml = '';
        if (deepDiveData) {
          deepDiveHtml = `
            <details class="deep-dive-details">
              <summary>
                <span>🔍 ${escapeHtml(deepDiveData.title)}</span>
                <span style="font-size:0.8rem;color:var(--text-muted);">Expand ▾</span>
              </summary>
              <div class="deep-dive-body">${formatMarkdown(deepDiveData.content)}</div>
            </details>
          `;
        }

        // Level 3: Interview Q&A
        let interviewHtml = '';
        if (Array.isArray(interviewQAList) && interviewQAList.length > 0) {
          interviewHtml = renderInterviewQA(interviewQAList);
        }

        // Level 3: Cheat Sheet
        let cheatHtml = '';
        if (cheatSheetData) {
          cheatHtml = renderCheatSheet(cheatSheetData);
        }

        // Inline Lesson Knowledge Check
        let inlineQuizHtml = '';
        if (Array.isArray(quizList) && quizList.length > 0) {
          let questionsMarkup = '';
          quizList.forEach(function(q, qIdx) {
            let opts = '';
            (q.options || []).forEach(function(opt, oIdx) {
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

            <!-- LEVEL 1: CORE INTUITION (UNDERSTAND) -->
            <div class="level-section level-1">
              <div class="level-header">
                <span class="level-badge badge-level-1">🌱 Level 1: Core Intuition</span>
                <span style="font-size:0.75rem;color:var(--text-muted);">High-Level Overview</span>
              </div>

              <!-- What is it? -->
              <div class="pedagogy-step">
                <div class="step-label">💡 1. Core Intuition & Concept</div>
                <div class="step-content">${formatMarkdown(whatIsIt)}</div>
              </div>

              <!-- Why do we need it? -->
              ${whyNeedIt ? `
                <div class="pedagogy-step">
                  <div class="step-label">🎯 2. What Problem Does It Solve?</div>
                  <div class="step-content">${formatMarkdown(whyNeedIt)}</div>
                </div>
              ` : ''}

              <!-- How does it work? -->
              ${howItemsHtml ? `
                <div class="pedagogy-step">
                  <div class="step-label">⚙️ 3. How Does It Work?</div>
                  <div class="step-content">
                    <ol>${howItemsHtml}</ol>
                  </div>
                </div>
              ` : ''}

              <!-- Real-world example -->
              ${realWorldExample ? `
                <div class="real-world-box">
                  <div class="real-world-title">🌍 Real-World Analogy</div>
                  <div class="real-world-text">${formatMarkdown(realWorldExample)}</div>
                </div>
              ` : ''}

              <!-- Visual Explanation -->
              ${diagram ? `
                <div class="pedagogy-step">
                  <div class="step-label">🖼️ Visual Architectural Diagram</div>
                  <div class="diagram-container">
                    ${diagram}
                    ${diagramCaption ? `<div class="diagram-caption">${escapeHtml(diagramCaption)}</div>` : ''}
                  </div>
                </div>
              ` : ''}
            </div>

            <!-- LEVEL 2: DEEP TECHNICAL DIVE (UNDER THE HOOD) -->
            ${(technicalExplanation || codeBlocksHtml || badGoodHtml || tableHtml || simHtml || internalMechanisms) ? `
              <div class="level-section level-2">
                <div class="level-header">
                  <span class="level-badge badge-level-2">🔬 Level 2: Deep Technical Dive</span>
                  <span style="font-size:0.75rem;color:var(--text-muted);">Production Architecture & Code</span>
                </div>

                ${technicalExplanation ? `
                  <div class="pedagogy-step">
                    <div class="step-label">🏗️ Architectural & Technical Mechanics</div>
                    <div class="step-content" style="line-height:1.65;">${formatMarkdown(technicalExplanation)}</div>
                  </div>
                ` : ''}

                ${internalMechanisms ? `
                  <div class="pedagogy-step">
                    <div class="step-label">⚙️ Internal Working Mechanisms (JVM / Memory / Kernel)</div>
                    <div class="step-content" style="line-height:1.65;">${formatMarkdown(internalMechanisms)}</div>
                  </div>
                ` : ''}

                <!-- Code Blocks -->
                ${codeBlocksHtml}

                <!-- Bad vs Good Code -->
                ${badGoodHtml}

                <!-- Comparison Table -->
                ${tableHtml}

                <!-- Interactive Simulation -->
                ${simHtml}

                <!-- Deep Dive Extra Details -->
                ${deepDiveHtml}
              </div>
            ` : ''}

            <!-- LEVEL 3: TECHNICAL INTERVIEW MASTERY -->
            ${(interviewHtml || cheatHtml || (keyPointsList && keyPointsList.length > 0)) ? `
              <div class="level-section level-3">
                <div class="level-header">
                  <span class="level-badge badge-level-3">💼 Level 3: Interview Mastery</span>
                  <span style="font-size:0.75rem;color:var(--text-muted);">Q&A, Pitfalls & Cheat Sheet</span>
                </div>

                <!-- Key Points -->
                ${keyPointsHtml ? `
                  <div class="key-points-box" style="margin-top:0;">
                    <div class="key-points-title">📌 Key Takeaways for Interviews</div>
                    <ul class="key-points-list">${keyPointsHtml}</ul>
                  </div>
                ` : ''}

                <!-- Technical Interview Questions & Answers -->
                ${interviewHtml ? `
                  <div style="margin-top:1rem;">
                    <h3 style="font-size:1rem;color:var(--text-primary);margin-bottom:0.5rem;">🎯 Deep-Dive Interview Questions & Answers</h3>
                    ${interviewHtml}
                  </div>
                ` : ''}

                <!-- 2-Minute Revision Cheat Sheet -->
                ${cheatHtml}
              </div>
            ` : ''}

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
    handleInlineQuiz: handleInlineQuiz,
    copyCode: copyCode,
    runSim: runSim
  };
})();

// Bootstrap app on DOM ready
document.addEventListener('DOMContentLoaded', function() {
  window.CS_App.init();
});
