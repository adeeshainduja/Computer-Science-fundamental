// Master Curriculum Registry
// Assembles all 9 core Computer Science modules into a single global data store.

window.CS_TOPICS = [
  window.topicOOP,
  window.topicDSA,
  window.topicDBMS,
  window.topicOS,
  window.topicNetworks,
  window.topicBackend,
  window.topicFrontend,
  window.topicSecurity,
  window.topicDevOps
];

// Helper utilities for the learning portal
window.CS_DATA = {
  getAllTopics: function() {
    return window.CS_TOPICS;
  },

  getTopicById: function(id) {
    return window.CS_TOPICS.find(function(t) { return t.id === id; }) || null;
  },

  getAllFlashcards: function() {
    var allCards = [];
    window.CS_TOPICS.forEach(function(topic) {
      if (topic.flashcards && Array.isArray(topic.flashcards)) {
        topic.flashcards.forEach(function(card, idx) {
          allCards.push({
            id: topic.id + '-fc-' + idx,
            topicId: topic.id,
            topicTitle: topic.title,
            term: card.term,
            category: card.category || topic.shortTitle,
            question: card.question,
            answer: card.answer,
            tip: card.tip || ''
          });
        });
      }
    });
    return allCards;
  },

  getAllQuizzes: function() {
    var allQuizzes = [];
    window.CS_TOPICS.forEach(function(topic) {
      var questions = [];
      if (topic.lessons && Array.isArray(topic.lessons)) {
        topic.lessons.forEach(function(lesson) {
          if (lesson.quiz && Array.isArray(lesson.quiz)) {
            lesson.quiz.forEach(function(q, qIdx) {
              questions.push({
                id: lesson.id + '-q-' + qIdx,
                lessonId: lesson.id,
                lessonTitle: lesson.title,
                question: q.question,
                options: q.options,
                correct: q.correct,
                explanation: q.explanation
              });
            });
          }
        });
      }
      if (questions.length > 0) {
        allQuizzes.push({
          topicId: topic.id,
          topicTitle: topic.title,
          topicIcon: topic.icon,
          badge: topic.badge,
          questions: questions
        });
      }
    });
    return allQuizzes;
  },

  getTotalLessonsCount: function() {
    var count = 0;
    window.CS_TOPICS.forEach(function(t) {
      if (t.lessons) count += t.lessons.length;
    });
    return count;
  }
};
