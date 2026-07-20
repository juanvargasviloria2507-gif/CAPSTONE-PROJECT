/*
   recommendation-api.js
   Mock API for the Jeans Style Quiz
   Receives the user's answers and returns the 3 best matches.
*/

function getRecommendations(answers) {

    return new Promise(function (resolve) {

        setTimeout(function () {

            var recommendations = [];

            // ---------- FIT ----------

            if (answers.fit === "wide") {

                recommendations = [
                    findProductById("wide-leg-edit"),
                    findProductById("distressed-wide-leg"),
                    findProductById("classic-denim")
                ];

            }

            else if (answers.fit === "flare") {

                recommendations = [
                    findProductById("flare-jean"),
                    findProductById("classic-denim"),
                    findProductById("wide-leg-edit")
                ];

            }

            else if (answers.fit === "shorts") {

                recommendations = [
                    findProductById("distressed-shorts"),
                    findProductById("denim-midi-skirt"),
                    findProductById("classic-denim")
                ];

            }

            else {

                recommendations = [
                    findProductById("classic-denim"),
                    findProductById("wide-leg-edit"),
                    findProductById("flare-jean")
                ];

            }


            // ---------- COLOR ----------

            if (answers.color === "light") {

                recommendations.sort(function (a, b) {

                    if (a.color === "Light Blue") return -1;
                    if (b.color === "Light Blue") return 1;

                    return 0;

                });

            }

            if (answers.color === "dark") {

                recommendations.sort(function (a, b) {

                    if (a.color === "Dark Blue") return -1;
                    if (b.color === "Dark Blue") return 1;

                    return 0;

                });

            }


            // ---------- STYLE ----------

            if (answers.style === "premium") {

                recommendations.sort(function (a, b) {

                    return b.price - a.price;

                });

            }

            if (answers.style === "comfort") {

                recommendations.sort(function (a, b) {

                    return a.price - b.price;

                });

            }


            recommendations = recommendations.filter(Boolean);

            resolve(recommendations);

        }, 900);

    });

}