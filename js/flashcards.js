// Interactive 3D Flashcards Deck Controller
var CS_Flashcards = window.CS_Flashcards = (function() {
  let allCards = [];
  let currentDeck = [];
  let currentIndex = 0;
  let activeFilter = 'all';

  function init() {
    allCards = window.CS_DATA ? window.CS_DATA.getAllFlashcards() : [];
    currentDeck = [...allCards];
    currentIndex = 0;

    renderFilterChips();
    setupEventListeners();
    updateCardUI();
  }

  function renderFilterChips() {
    const container = document.getElementById('flashcardFilterContainer');
    if (!container || !window.CS_TOPICS) return;

    let html = `<button class="filter-chip active" data-filter="all">All Topics (${allCards.length})</button>`;
    window.CS_TOPICS.forEach(function(t) {
      const count = t.flashcards ? t.flashcards.length : 0;
      if (count > 0) {
        html += `<button class="filter-chip" data-filter="${t.id}">${t.icon} ${t.shortTitle} (${count})</button>`;
      }
    });

    container.innerHTML = html;

    container.querySelectorAll('.filter-chip').forEach(function(btn) {
      btn.addEventListener('click', function() {
        container.querySelectorAll('.filter-chip').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterByTopic(btn.getAttribute('data-filter'));
      });
    });
  }

  function filterByTopic(topicId) {
    activeFilter = topicId;
    if (topicId === 'all') {
      currentDeck = [...allCards];
    } else {
      currentDeck = allCards.filter(c => c.topicId === topicId);
    }
    currentIndex = 0;
    unflipCard();
    updateCardUI();
  }

  function updateCardUI() {
    const cardInner = document.getElementById('flashcardInner');
    const termEl = document.getElementById('fcTerm');
    const questionEl = document.getElementById('fcQuestion');
    const categoryEl = document.getElementById('fcCategory');
    const answerEl = document.getElementById('fcAnswer');
    const tipEl = document.getElementById('fcTip');
    const countEl = document.getElementById('fcCounter');
    const prevBtn = document.getElementById('fcPrevBtn');
    const nextBtn = document.getElementById('fcNextBtn');

    if (!cardInner || currentDeck.length === 0) {
      if (questionEl) questionEl.textContent = 'No flashcards found.';
      if (countEl) countEl.textContent = '0 / 0';
      return;
    }

    const card = currentDeck[currentIndex];
    if (termEl) termEl.textContent = card.term;
    if (questionEl) questionEl.textContent = card.question;
    if (categoryEl) categoryEl.textContent = card.category;
    if (answerEl) answerEl.textContent = card.answer;
    if (tipEl) {
      if (card.tip) {
        tipEl.textContent = '💡 Memory Tip: ' + card.tip;
        tipEl.style.display = 'block';
      } else {
        tipEl.style.display = 'none';
      }
    }

    if (countEl) {
      countEl.textContent = `${currentIndex + 1} / ${currentDeck.length}`;
    }

    if (prevBtn) prevBtn.disabled = currentIndex === 0;
    if (nextBtn) nextBtn.disabled = currentIndex === currentDeck.length - 1;
  }

  function flipCard() {
    const cardInner = document.getElementById('flashcardInner');
    if (cardInner) {
      cardInner.classList.toggle('is-flipped');
    }
  }

  function unflipCard() {
    const cardInner = document.getElementById('flashcardInner');
    if (cardInner) {
      cardInner.classList.remove('is-flipped');
    }
  }

  function nextCard() {
    if (currentIndex < currentDeck.length - 1) {
      unflipCard();
      setTimeout(() => {
        currentIndex++;
        updateCardUI();
      }, 150);
    }
  }

  function prevCard() {
    if (currentIndex > 0) {
      unflipCard();
      setTimeout(() => {
        currentIndex--;
        updateCardUI();
      }, 150);
    }
  }

  function shuffleDeck() {
    unflipCard();
    setTimeout(() => {
      for (let i = currentDeck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
      }
      currentIndex = 0;
      updateCardUI();
    }, 150);
  }

  function setupEventListeners() {
    const cardScene = document.getElementById('flashcardScene');
    const prevBtn = document.getElementById('fcPrevBtn');
    const nextBtn = document.getElementById('fcNextBtn');
    const shuffleBtn = document.getElementById('fcShuffleBtn');

    if (cardScene) {
      cardScene.addEventListener('click', flipCard);
    }

    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevCard(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextCard(); });
    if (shuffleBtn) shuffleBtn.addEventListener('click', (e) => { e.stopPropagation(); shuffleDeck(); });

    // Keyboard support when flashcards view is active
    document.addEventListener('keydown', function(e) {
      const view = document.getElementById('flashcardsView');
      if (view && view.classList.contains('active')) {
        if (e.key === 'ArrowRight') nextCard();
        if (e.key === 'ArrowLeft') prevCard();
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          flipCard();
        }
      }
    });
  }

  return {
    init: init,
    filterByTopic: filterByTopic
  };
})();
