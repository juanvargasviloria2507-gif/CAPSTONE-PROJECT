/* views/quiz.js
   "Find My Fit" questionnaire: a short multi-step quiz that scores
   every product in PRODUCTS against the user's answers and shows the
   best matches. No backend involved — everything happens in memory,
   the same way the rest of this demo app works.
*/

var QUIZ_QUESTIONS = [
  {
    key: 'fit',
    question: 'What fit are you looking for?',
    options: [
      { label: 'Skinny', value: 'skinny' },
      { label: 'Mom Fit', value: 'mom-fit' },
      { label: 'Straight', value: 'straight' },
      { label: 'Wide Leg', value: 'wide-leg' },
      { label: 'Bootcut', value: 'bootcut' },
      { label: "I'm open to anything", value: '' }
    ]
  },
  {
    key: 'style',
    question: "What's your style vibe?",
    options: [
      { label: 'Trendy & bold', value: 'trendy' },
      { label: 'Comfort first', value: 'comfort' },
      { label: 'Everyday casual', value: 'everyday' },
      { label: 'Premium & polished', value: 'premium' },
      { label: 'No preference', value: '' }
    ]
  },
  {
    key: 'color',
    question: 'Which wash speaks to you?',
    options: [
      { label: 'Black', value: 'black' },
      { label: 'Dark wash', value: 'dark' },
      { label: 'Light wash', value: 'light' },
      { label: 'No preference', value: '' }
    ]
  },
  {
    key: 'budget',
    question: "What's your budget?",
    options: [
      { label: 'Under $75', value: 'low' },
      { label: '$75 – $85', value: 'mid' },
      { label: 'Over $85', value: 'high' },
      { label: 'No preference', value: '' }
    ]
  }
];

/* Higher score = better match. Each answered question adds weight in
   proportion to how much it should matter (fit > style > color/budget).
   A tiny slice of the product rating is added at the end just to break
   ties in favor of the better-reviewed item. */
function scoreProductAgainstQuiz(p, answers) {
  var score = 0;

  if (answers.fit && p.tag === answers.fit) score += 4;
  if (answers.style && p.style === answers.style) score += 3;
  if (answers.color && p.color === answers.color) score += 2;

  if (answers.budget) {
    var inBudget =
      (answers.budget === 'low' && p.price < 75) ||
      (answers.budget === 'mid' && p.price >= 75 && p.price <= 85) ||
      (answers.budget === 'high' && p.price > 85);
    if (inBudget) score += 2;
  }

  score += p.rating * 0.1;
  return score;
}

function getQuizRecommendations(answers, limit) {
  var scored = PRODUCTS.map(function (p) {
    return { product: p, score: scoreProductAgainstQuiz(p, answers) };
  });
  scored.sort(function (a, b) { return b.score - a.score; });
  return scored.slice(0, limit || 3).map(function (s) { return s.product; });
}

function renderQuiz(container) {
  var currentStep = 0;
  var answers = {};

  function renderQuestion() {
    var q = QUIZ_QUESTIONS[currentStep];
    var progress = Math.round((currentStep / QUIZ_QUESTIONS.length) * 100);

    container.innerHTML =
      '<div class="quiz-view">' +
        '<div class="quiz-card">' +
          '<div class="quiz-progress"><div class="quiz-progress-bar" style="width:' + progress + '%"></div></div>' +
          '<span class="quiz-step-label">Question ' + (currentStep + 1) + ' of ' + QUIZ_QUESTIONS.length + '</span>' +
          '<h1>' + q.question + '</h1>' +
          '<div class="quiz-options">' +
            q.options.map(function (opt) {
              return '<button type="button" class="quiz-option" data-value="' + escapeHtml(opt.value) + '">' + opt.label + '</button>';
            }).join('') +
          '</div>' +
          (currentStep > 0 ? '<button type="button" class="quiz-back" id="quiz-back-btn">' + ICONS.back + ' Back</button>' : '') +
        '</div>' +
      '</div>';

    container.querySelectorAll('.quiz-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        answers[q.key] = btn.getAttribute('data-value');
        currentStep++;
        if (currentStep >= QUIZ_QUESTIONS.length) {
          renderResults();
        } else {
          renderQuestion();
        }
      });
    });

    if (currentStep > 0) {
      container.querySelector('#quiz-back-btn').addEventListener('click', function () {
        currentStep--;
        renderQuestion();
      });
    }
  }

  function renderResults() {
    var picks = getQuizRecommendations(answers, 3);

    container.innerHTML =
      '<div class="quiz-view quiz-results">' +
        '<div class="quiz-results-header">' +
          '<span class="hero-kicker">Your matches</span>' +
          '<h1>Here\'s what we\'d pick for you</h1>' +
          '<p>Based on your answers, these are the jeans that fit you best.</p>' +
          '<button type="button" class="btn btn-secondary" id="quiz-retake-btn">Retake quiz</button>' +
        '</div>' +
        '<div class="product-grid" id="quiz-product-grid"></div>' +
      '</div>';

    var grid = container.querySelector('#quiz-product-grid');
    if (picks.length === 0) {
      grid.innerHTML = '<div class="empty-state">No matches yet — try the quiz again with different answers.</div>';
    } else {
      grid.innerHTML = picks.map(renderProductCard).join('');
      wireProductGrid(grid);
    }

    container.querySelector('#quiz-retake-btn').addEventListener('click', function () {
      currentStep = 0;
      answers = {};
      renderQuestion();
    });
  }

  renderQuestion();
}
