/* views/quiz.js
   "Find My Fit" questionnaire, connected to the real backend
   recommendation engine (POST /recommendations). Fit/color/style
   option values must match the fit_tag/color_tag/style_tag values
   stored in your "products" table — check with:
     SELECT DISTINCT fit_tag, color_tag, style_tag FROM products;
*/

var API_URL_QUIZ = 'http://localhost:3000';

var QUIZ_QUESTIONS = [
  {
    key: 'fit',
    question: 'What fit are you looking for?',
    options: [
      { label: 'Skinny', value: 'skinny' },
      { label: 'Wide Leg', value: 'wide' },
      { label: 'Flare', value: 'flare' },
      { label: 'Shorts', value: 'shorts' }
    ]
  },
  {
    key: 'style',
    question: "What's your style vibe?",
    options: [
      { label: 'Trendy & bold', value: 'trendy' },
      { label: 'Comfort first', value: 'comfort' },
      { label: 'Everyday casual', value: 'everyday' },
      { label: 'Premium & polished', value: 'premium' }
    ]
  },
  {
    key: 'color',
    question: 'Which wash speaks to you?',
    options: [
      { label: 'Dark wash', value: 'dark' },
      { label: 'Light wash', value: 'light' },
      { label: 'No preference', value: 'any' }
    ]
  }
];

function mapRecommendation(p) {
  return {
    id: p.id,
    name: p.name,
    desc: p.description,
    price: parseFloat(p.price),
    image: p.image,
    tag: p.fit_tag,
    photo: true
  };
}

async function fetchQuizRecommendations(answers) {
  var headers = { 'Content-Type': 'application/json' };
  if (AuthStore.isLoggedIn()) {
    headers['Authorization'] = 'Bearer ' + AuthStore.getToken();
  }

  try {
    var response = await fetch(API_URL_QUIZ + '/recommendations', {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(answers)
    });
    var data = await response.json();

    if (!response.ok) {
      return { ok: false, error: data.error || 'Could not get recommendations.' };
    }
    return { ok: true, products: data.recommendations.map(mapRecommendation) };
  } catch (e) {
    return { ok: false, error: 'Could not connect to the server.' };
  }
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

  async function renderResults() {
    container.innerHTML =
      '<div class="quiz-view quiz-results">' +
        '<div class="quiz-results-header">' +
          '<span class="hero-kicker">Your matches</span>' +
          '<h1>Finding your best fits...</h1>' +
        '</div>' +
      '</div>';

    var result = await fetchQuizRecommendations(answers);

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
    if (!result.ok) {
      grid.innerHTML = '<div class="empty-state">' + escapeHtml(result.error) + '</div>';
    } else if (result.products.length === 0) {
      grid.innerHTML = '<div class="empty-state">No matches yet — try the quiz again with different answers.</div>';
    } else {
      grid.innerHTML = result.products.map(renderProductCard).join('');
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