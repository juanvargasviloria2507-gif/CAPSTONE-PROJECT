/* ======================================================
   QUESTIONNAIRE VIEW
   The Ideal Option
====================================================== */

function renderQuestionnaire(container) {

    var answers = {};
  
    var currentQuestion = 0;
  
    var questions = [
  
      {
        id: "fit",
        title: "What fit do you prefer?",
        options: [
          { value: "skinny", label: "Skinny Fit" },
          { value: "wide", label: "Wide Leg" },
          { value: "flare", label: "Flare" },
          { value: "shorts", label: "Shorts / Skirt" }
        ]
      },
  
      {
        id: "color",
        title: "Which denim color do you wear the most?",
        options: [
          { value: "light", label: "Light Blue" },
          { value: "dark", label: "Dark Blue" },
          { value: "black", label: "Black" },
          { value: "any", label: "Any Color" }
        ]
      },
  
      {
        id: "style",
        title: "What's most important when buying jeans?",
        options: [
          { value: "comfort", label: "Comfort" },
          { value: "trendy", label: "Trendy Style" },
          { value: "everyday", label: "Everyday Wear" },
          { value: "premium", label: "Premium Quality" }
        ]
      }
  
    ];
  
    renderStep();
  
    function renderStep() {
  
      var question = questions[currentQuestion];
  
      container.innerHTML =
  
        '<section class="quiz-page">' +
  
          '<div class="quiz-card">' +
  
            '<div class="quiz-progress">' +
  
              '<span>Question ' + (currentQuestion + 1) + ' of ' + questions.length + '</span>' +
  
              '<div class="progress-bar">' +
  
                '<div class="progress-fill" style="width:' +
                (((currentQuestion + 1) / questions.length) * 100) +
                '%"></div>' +
  
              '</div>' +
  
            '</div>' +
  
            '<h1>Find Your Perfect Jeans</h1>' +
  
            '<p class="quiz-subtitle">' +
              question.title +
            '</p>' +
  
            '<div class="quiz-options">' +
  
              question.options.map(function(option){
  
                return (
  
                  '<button class="quiz-option" data-value="' +
                  option.value +
                  '">' +
  
                  option.label +
  
                  '</button>'
  
                );
  
              }).join("") +
  
            '</div>' +
  
            '<div class="quiz-actions">' +
  
              (
                currentQuestion > 0
                ? '<button class="btn btn-secondary" id="quiz-back">Back</button>'
                : ''
              ) +
  
              '<button class="btn btn-primary" id="quiz-next" disabled>' +
  
              (
                currentQuestion === questions.length - 1
                ? 'See My Recommendations'
                : 'Next'
              ) +
  
              '</button>' +
  
            '</div>' +
  
          '</div>' +
  
        '</section>';
  
      var selectedValue = null;
  
      container.querySelectorAll(".quiz-option").forEach(function(button){
  
        button.addEventListener("click", function(){
  
          container.querySelectorAll(".quiz-option").forEach(function(btn){
  
            btn.classList.remove("selected");
  
          });
  
          button.classList.add("selected");
  
          selectedValue = button.dataset.value;
  
          document.getElementById("quiz-next").disabled = false;
  
        });
  
      });
  
      var backBtn = document.getElementById("quiz-back");
  
      if(backBtn){
  
        backBtn.addEventListener("click", function(){
  
          currentQuestion--;
  
          renderStep();
  
        });
  
      }
  
      document.getElementById("quiz-next").addEventListener("click", function(){
  
        answers[question.id] = selectedValue;
  
        if(currentQuestion < questions.length - 1){
  
          currentQuestion++;
  
          renderStep();
  
        }else{
  
          renderRecommendation(container, answers);
  
        }
  
      });
  
    }
  
  }
  
  /* ======================================================
     RECOMMENDATION PAGE
  ====================================================== */
  
  function renderRecommendation(container, answers){
  
    getRecommendation(answers).then(function(products){
  
      container.innerHTML =
  
        '<section class="recommendation-page">' +
  
          '<div class="recommendation-header">' +
  
            '<h1>Your Perfect Jeans Match</h1>' +
  
            '<p>Based on your answers, these jeans fit your style the best.</p>' +
  
          '</div>' +
  
          '<div class="recommendation-grid">' +
  
            products.map(function(product){
  
              return (
  
                '<div class="product-card">' +
  
                  '<div class="product-thumb photo">' +
  
                    '<img src="' + product.image + '" alt="' + product.name + '">' +
  
                  '</div>' +
  
                  '<div class="product-name">' +
  
                    product.name +
  
                  '</div>' +
  
                  '<div class="product-desc">' +
  
                    product.desc +
  
                  '</div>' +
  
                  '<div class="product-rating">' +
  
                    '<span class="stars">' +
  
                      renderStars(product.rating) +
  
                    '</span>' +
  
                    '<span>(' +
  
                      product.rating +
  
                    ')</span>' +
  
                  '</div>' +
  
                  '<div class="product-meta">' +
  
                    '<span class="product-price">$' +
  
                      product.price.toFixed(2) +
  
                    '</span>' +
  
                  '</div>' +
  
                  '<button class="btn btn-primary recommendation-btn" data-product="' +
  
                    product.id +
  
                  '">' +
  
                    'View Details' +
  
                  '</button>' +
  
                '</div>'
  
              );
  
            }).join("") +
  
          '</div>' +
  
          '<div class="recommendation-actions">' +
  
            '<button class="btn btn-secondary" id="restart-questionnaire">' +
  
              'Take Quiz Again' +
  
            '</button>' +
  
          '</div>' +
  
        '</section>';
  
      container.querySelectorAll(".recommendation-btn").forEach(function(button){
  
        button.addEventListener("click", function(){
  
          Router.navigate("/product/" + button.dataset.product);
  
        });
  
      });
  
      document.getElementById("restart-questionnaire").addEventListener("click", function(){
  
        Router.navigate("/questionnaire");
  
      });
  
    });
  
  }