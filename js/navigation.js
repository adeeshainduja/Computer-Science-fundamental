// View Navigation & Router Controller
var CS_Navigation = window.CS_Navigation = (function() {
  let currentView = 'home';
  let currentParams = {};

  function init() {
    setupNavListeners();
    handleInitialRoute();
    window.addEventListener('popstate', handlePopState);
  }

  function setupNavListeners() {
    // Mobile Bottom Nav
    document.querySelectorAll('.bottom-nav .nav-item').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetView = item.getAttribute('data-view');
        navigateTo(targetView);
      });
    });

    // Desktop Nav Links
    document.querySelectorAll('.desktop-nav-link').forEach(function(item) {
      item.addEventListener('click', function(e) {
        e.preventDefault();
        const targetView = item.getAttribute('data-view');
        navigateTo(targetView);
      });
    });
  }

  function navigateTo(viewName, params, pushState = true) {
    currentView = viewName || 'home';
    currentParams = params || {};

    // Update bottom nav active classes
    document.querySelectorAll('.bottom-nav .nav-item').forEach(function(item) {
      if (item.getAttribute('data-view') === currentView) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Update desktop nav active classes
    document.querySelectorAll('.desktop-nav-link').forEach(function(item) {
      if (item.getAttribute('data-view') === currentView) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Toggle view sections
    document.querySelectorAll('.view-section').forEach(function(sec) {
      sec.classList.remove('active');
    });

    const activeSec = document.getElementById(currentView + 'View');
    if (activeSec) {
      activeSec.classList.add('active');
    }

    // Scroll window back to top on page transition
    window.scrollTo({ top: 0, behavior: 'instant' });

    // Handle View-Specific Logic
    if (currentView === 'topic') {
      window.CS_App.renderTopicDetail(currentParams.topicId, currentParams.lessonId);
    } else if (currentView === 'flashcards') {
      if (currentParams.topicId) {
        CS_Flashcards.filterByTopic(currentParams.topicId);
      }
    } else if (currentView === 'quiz') {
      if (currentParams.topicId) {
        CS_Quiz.startQuiz(currentParams.topicId);
      } else {
        CS_Quiz.exitQuiz();
      }
    } else if (currentView === 'progress') {
      window.CS_App.renderProgressView();
    }

    // Update browser URL hash
    if (pushState) {
      let hash = '#' + currentView;
      if (currentParams.topicId) hash += '/' + currentParams.topicId;
      if (currentParams.lessonId) hash += '/' + currentParams.lessonId;
      window.history.pushState({ view: currentView, params: currentParams }, '', hash);
    }
  }

  function handlePopState(e) {
    if (e.state && e.state.view) {
      navigateTo(e.state.view, e.state.params, false);
    } else {
      handleInitialRoute();
    }
  }

  function handleInitialRoute() {
    const hash = window.location.hash.replace(/^#/, '');
    if (!hash) {
      navigateTo('home', {}, false);
      return;
    }

    const parts = hash.split('/');
    const view = parts[0];
    const topicId = parts[1] || null;
    const lessonId = parts[2] || null;

    if (['home', 'topics', 'topic', 'flashcards', 'quiz', 'progress'].includes(view)) {
      navigateTo(view, { topicId: topicId, lessonId: lessonId }, false);
    } else {
      navigateTo('home', {}, false);
    }
  }

  return {
    init: init,
    navigateTo: navigateTo,
    getCurrentView: () => currentView
  };
})();
