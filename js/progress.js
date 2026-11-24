// Progress & State Tracking Service with LocalStorage persistence
var CS_Progress = window.CS_Progress = (function() {
  const STORAGE_KEY_LESSONS = 'cs_notes_completed_lessons';
  const STORAGE_KEY_LAST_TOPIC = 'cs_notes_last_topic';
  const STORAGE_KEY_LAST_LESSON = 'cs_notes_last_lesson';
  const STORAGE_KEY_QUIZ_SCORES = 'cs_notes_quiz_scores';
  const STORAGE_KEY_MASTERED_CARDS = 'cs_notes_mastered_cards';

  function getCompletedLessons() {
    try {
      const data = localStorage.getItem(STORAGE_KEY_LESSONS);
      return data ? JSON.parse(data) : {};
    } catch (e) {
      console.warn('LocalStorage error:', e);
      return {};
    }
  }

  function setCompletedLessons(map) {
    try {
      localStorage.setItem(STORAGE_KEY_LESSONS, JSON.stringify(map));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function isLessonCompleted(lessonId) {
    const map = getCompletedLessons();
    return !!map[lessonId];
  }

  function toggleLessonCompleted(lessonId) {
    const map = getCompletedLessons();
    map[lessonId] = !map[lessonId];
    if (!map[lessonId]) {
      delete map[lessonId];
    }
    setCompletedLessons(map);
    triggerProgressChange();
    return !!map[lessonId];
  }

  function getOverallProgress() {
    const completedMap = getCompletedLessons();
    const completedCount = Object.keys(completedMap).length;
    const totalCount = window.CS_DATA ? window.CS_DATA.getTotalLessonsCount() : 1;
    const percentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

    return {
      completed: completedCount,
      total: totalCount,
      percentage: Math.min(percentage, 100)
    };
  }

  function saveLastStudied(topicId, lessonId) {
    try {
      if (topicId) localStorage.setItem(STORAGE_KEY_LAST_TOPIC, topicId);
      if (lessonId) localStorage.setItem(STORAGE_KEY_LAST_LESSON, lessonId);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function getLastStudied() {
    try {
      const topicId = localStorage.getItem(STORAGE_KEY_LAST_TOPIC) || 'oop';
      const lessonId = localStorage.getItem(STORAGE_KEY_LAST_LESSON) || '';
      return { topicId: topicId, lessonId: lessonId };
    } catch (e) {
      return { topicId: 'oop', lessonId: '' };
    }
  }

  function recordQuizScore(topicId, score, total) {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUIZ_SCORES);
      const scores = raw ? JSON.parse(raw) : {};
      scores[topicId] = {
        score: score,
        total: total,
        timestamp: Date.now()
      };
      localStorage.setItem(STORAGE_KEY_QUIZ_SCORES, JSON.stringify(scores));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function getQuizScores() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_QUIZ_SCORES);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function resetAllProgress() {
    try {
      localStorage.removeItem(STORAGE_KEY_LESSONS);
      localStorage.removeItem(STORAGE_KEY_LAST_TOPIC);
      localStorage.removeItem(STORAGE_KEY_LAST_LESSON);
      localStorage.removeItem(STORAGE_KEY_QUIZ_SCORES);
      localStorage.removeItem(STORAGE_KEY_MASTERED_CARDS);
      triggerProgressChange();
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }

  function triggerProgressChange() {
    const event = new CustomEvent('cs_progress_updated', {
      detail: getOverallProgress()
    });
    window.dispatchEvent(event);
  }

  return {
    isLessonCompleted: isLessonCompleted,
    toggleLessonCompleted: toggleLessonCompleted,
    getOverallProgress: getOverallProgress,
    saveLastStudied: saveLastStudied,
    getLastStudied: getLastStudied,
    recordQuizScore: recordQuizScore,
    getQuizScores: getQuizScores,
    resetAllProgress: resetAllProgress
  };
})();
