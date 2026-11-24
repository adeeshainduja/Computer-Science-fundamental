// Instant Search Engine with Full-Text Indexing
var CS_Search = window.CS_Search = (function() {
  let searchIndex = [];

  function buildIndex() {
    searchIndex = [];
    if (!window.CS_TOPICS) return;

    window.CS_TOPICS.forEach(function(topic) {
      // Index topic itself
      searchIndex.push({
        type: 'topic',
        topicId: topic.id,
        lessonId: null,
        title: topic.title,
        subtitle: topic.badge,
        category: topic.shortTitle,
        snippet: topic.description,
        text: (topic.title + ' ' + topic.description + ' ' + topic.badge).toLowerCase()
      });

      // Index lessons
      if (topic.lessons && Array.isArray(topic.lessons)) {
        topic.lessons.forEach(function(lesson) {
          const combined = (
            lesson.title + ' ' +
            lesson.subtitle + ' ' +
            lesson.whatIsIt + ' ' +
            (lesson.realWorldExample || '') + ' ' +
            (lesson.keyPoints ? lesson.keyPoints.join(' ') : '')
          ).toLowerCase();

          searchIndex.push({
            type: 'lesson',
            topicId: topic.id,
            lessonId: lesson.id,
            title: lesson.title,
            subtitle: lesson.subtitle,
            category: topic.shortTitle,
            snippet: lesson.whatIsIt.substring(0, 140) + '...',
            text: combined
          });
        });
      }

      // Index flashcards
      if (topic.flashcards && Array.isArray(topic.flashcards)) {
        topic.flashcards.forEach(function(card) {
          searchIndex.push({
            type: 'flashcard',
            topicId: topic.id,
            lessonId: null,
            title: card.term,
            subtitle: 'Flashcard Term',
            category: card.category || topic.shortTitle,
            snippet: card.answer,
            text: (card.term + ' ' + card.question + ' ' + card.answer + ' ' + (card.tip || '')).toLowerCase()
          });
        });
      }
    });
  }

  function query(searchStr) {
    if (!searchIndex.length) buildIndex();
    if (!searchStr || !searchStr.trim()) return [];

    const cleaned = searchStr.trim().toLowerCase();
    const words = cleaned.split(/\s+/);

    return searchIndex.filter(function(item) {
      return words.every(function(w) {
        return item.text.indexOf(w) !== -1;
      });
    }).slice(0, 20); // Top 20 results
  }

  function highlightMatches(text, searchStr) {
    if (!searchStr) return text;
    const escaped = searchStr.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('(' + escaped + ')', 'gi');
    return text.replace(regex, '<mark style="background:var(--warning-light);color:var(--text-primary);border-radius:2px;padding:0 2px;">$1</mark>');
  }

  function initUI() {
    const modal = document.getElementById('searchModal');
    const input = document.getElementById('searchInput');
    const closeBtn = document.getElementById('closeSearchBtn');
    const triggerBoxes = document.querySelectorAll('.search-trigger-btn');
    const resultsContainer = document.getElementById('searchResultsList');

    if (!modal || !input) return;

    function openModal() {
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
      input.value = '';
      resultsContainer.innerHTML = '<div class="empty-results">Type any term (e.g. "polymorphism", "kafka", "jwt", "acid", "stack")</div>';
      setTimeout(() => input.focus(), 50);
    }

    function closeModal() {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
    }

    triggerBoxes.forEach(function(btn) {
      btn.addEventListener('click', openModal);
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);

    modal.addEventListener('click', function(e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function(e) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        openModal();
      }
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
      }
    });

    input.addEventListener('input', function() {
      const q = input.value;
      if (!q.trim()) {
        resultsContainer.innerHTML = '<div class="empty-results">Type any term to search...</div>';
        return;
      }

      const results = query(q);
      if (results.length === 0) {
        resultsContainer.innerHTML = '<div class="empty-results">No matches found for "<strong>' + escapeHtml(q) + '</strong>". Try searching for "API", "Tree", "Docker", etc.</div>';
        return;
      }

      let html = '';
      results.forEach(function(r) {
        html += `
          <div class="search-result-item" data-topic="${r.topicId}" data-lesson="${r.lessonId || ''}" data-type="${r.type}">
            <div class="result-topic">${escapeHtml(r.category)} • ${r.type.toUpperCase()}</div>
            <div class="result-title">${highlightMatches(escapeHtml(r.title), q)}</div>
            <div class="result-snippet">${highlightMatches(escapeHtml(r.snippet), q)}</div>
          </div>
        `;
      });
      resultsContainer.innerHTML = html;

      // Attach click listeners to jump to matching content
      resultsContainer.querySelectorAll('.search-result-item').forEach(function(el) {
        el.addEventListener('click', function() {
          const topicId = el.getAttribute('data-topic');
          const lessonId = el.getAttribute('data-lesson');
          const itemType = el.getAttribute('data-type');

          closeModal();

          if (itemType === 'flashcard') {
            window.CS_App.navigateTo('flashcards', { topicId: topicId });
          } else {
            window.CS_App.navigateTo('topic', { topicId: topicId, lessonId: lessonId });
          }
        });
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  return {
    init: function() {
      buildIndex();
      initUI();
    },
    query: query
  };
})();
