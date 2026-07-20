/* ======================================================
   QUESTIONNAIRE API
   Mock Recommendation Engine
====================================================== */

function getRecommendation(answers){

    return new Promise(function(resolve){

        setTimeout(function(){

            var results = PRODUCTS.filter(function(product){

                var score = 0;

                /* ---------- FIT ---------- */

                if(
                    answers.fit === "skinny" &&
                    product.tag === "skinny"
                ){
                    score += 5;
                }

                if(
                    answers.fit === "wide" &&
                    product.tag === "wide-leg"
                ){
                    score += 5;
                }

                if(
                    answers.fit === "flare" &&
                    product.tag === "bootcut"
                ){
                    score += 5;
                }

                if(
                    answers.fit === "shorts"
                ){
                    score += 1;
                }

                /* ---------- COLOR ---------- */

                if(
                    answers.color === "any"
                ){
                    score += 1;
                }
                else if(
                    product.denim &&
                    product.denim === answers.color
                ){
                    score += 3;
                }

                /* ---------- STYLE ---------- */

                if(
                    product.style &&
                    product.style === answers.style
                ){
                    score += 3;
                }

                product.matchScore = score;

                return score > 0;

            });

            results.sort(function(a,b){

                return b.matchScore - a.matchScore;

            });

            resolve(results.slice(0,3));

        },700);

    });

}