document.getElementById('dietForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const answers = {};
    const formElements = this.elements;

    for (let i = 0; i < formElements.length; i++) {
        const element = formElements[i];

        if (element.name && element.value) {
            answers[element.name] = element.value;
        }
    }

    const result = calculateDietScore(answers);

    displayResults(result);
});


function displayResults(result) {
    const resultsSection = document.getElementById('results');
    const scoreDisplay = document.getElementById('scoreDisplay');
    const breakdown = document.getElementById('breakdown');

    resultsSection.style.display = 'block';

    scoreDisplay.innerHTML = `
        <h3>Yhteensä: ${result.total}/100 pistettä</h3>

        <div class="score-bar">
            <div class="score-fill" style="width: ${result.total}%"></div>
        </div>

        <p>${getScoreDescription(result.total)}</p>
    `;

    breakdown.innerHTML = `
        <h4>Osapisteet:</h4>
        <ul>
            <li>Ateriarytmi: ${result.breakdown.ateriarytmi}/10</li>
            <li>Kasvis-, kala- ja liharuoka: ${result.breakdown.kasvisKalaLiha}/10</li>
            <li>Viljavalmisteet ja peruna: ${result.breakdown.viljavalmisteetPeruna}/20</li>
            <li>Rasvan laatu: ${result.breakdown.rasvanLaatu}/15</li>
            <li>Kasvikset, marjat ja hedelmät: ${result.breakdown.kasviksetMarjatHedelmit}/20</li>
            <li>Naposteltavat ja juomat: ${result.breakdown.naposteltavatJuomat}/15</li>
            <li>Maitovalmisteet ja kasvipohjaiset vaihtoehdot: ${result.breakdown.maitovalmisteet}/10</li>
        </ul>
    `;

    resultsSection.scrollIntoView({
        behavior: 'smooth'
    });
}


function getScoreDescription(score) {
    if (score >= 90) return "Erinomainen ruokavalio!";
    if (score >= 75) return "Hyvä ruokavalio.";
    if (score >= 60) return "Tyydyttävä ruokavalio.";
    if (score >= 45) return "Keskitaso.";

    return "Parannettavaa.";
}


document.getElementById('resetBtn').addEventListener('click', function() {
    document.getElementById('dietForm').reset();
    document.getElementById('results').style.display = 'none';
});