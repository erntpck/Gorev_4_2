function submitGuesses() {
    const guessInputs = document.querySelectorAll('.guess');
    const guesses = [];

    for (let input of guessInputs) {
        const value = parseInt(input.value);
        if (isNaN(value) || value < 1 || value > 49) {
            alert("1-49 sayıları arasında geçerli sayılar giriniz.");
            return;
        }
        guesses.push(value);
    }

    if (new Set(guesses).size !== guesses.length) {
        alert("Aynı tahmin bir kez girilebilir.");
        return;
    }

    guesses.sort((a, b) => a - b);
    for (let i = 0; i < guessInputs.length; i++) {
        guessInputs[i].value = guesses[i];
    }

    document.getElementById('guess-button').disabled = true;
    document.getElementById('draw-button').disabled = false;
    
    document.getElementById('guess-status').textContent = "Tahmin girildi"; 
}

function drawNumbers() {
    const lottoNumbers = [];
    while (lottoNumbers.length < 6) {
        const num = Math.floor(Math.random() * 49) + 1;
        if (!lottoNumbers.includes(num)) {
            lottoNumbers.push(num);
        }
    }

    lottoNumbers.sort((a, b) => a - b);
    const lottoInputs = document.querySelectorAll('.lotto');
    for (let i = 0; i < lottoInputs.length; i++) {
        lottoInputs[i].value = lottoNumbers[i];
    }

    const guessInputs = document.querySelectorAll('.guess');
    const guesses = Array.from(guessInputs).map(input => parseInt(input.value));
    const matchingNumbers = guesses.filter(num => lottoNumbers.includes(num));

    document.getElementById('result').innerHTML = `
        Bilinen sayılar: ${matchingNumbers.join(', ')}<br>
        ${matchingNumbers.length} adet sayı bildiniz.
    `;

    document.getElementById('guess-button').disabled = false;
    document.getElementById('draw-button').disabled = true;
}

document.querySelectorAll('.guess').forEach(input => {
    input.addEventListener('blur', function() {
        const guessInputs = document.querySelectorAll('.guess');
        const values = Array.from(guessInputs).map(input => input.value);
        const duplicates = values.filter((item, index) => values.indexOf(item) !== index && item !== "");

        if (duplicates.length > 0) {
            alert("Aynı tahmin bir kez girilebilir.");
            for (let i = values.length - 1; i >= 0; i--) {
                if (values.indexOf(values[i]) !== i && values[i] !== "") {
                    guessInputs[i].value = '';
                }
            }
        }
    });
});