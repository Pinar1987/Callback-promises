
function coinFlip() {
    return new Promise((resolve, reject) => {
        const flip = Math.random() > 0.5;
        if (flip) {
            resolve("You win!");
        } else {
            reject("You lose!");
        }
    });
}


function fetchAdvice() {
    return new Promise((resolve, reject) => {
        fetch('https://api.adviceslip.com/advice')
            .then(response => {
                if (!response.ok) {
                    reject('Failed to fetch advice');
                }
                return response.json();
            })
            .then(data => {
                resolve(data.slip.advice);
            })
            .catch(error => {
                reject(error);
            });
    });
}


function fetchAdviceById(id) {
    const url = id ? `https://api.adviceslip.com/advice/${id}` : 'https://api.adviceslip.com/advice';

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('advice-result').textContent = data.slip.advice;
        })
        .catch(error => {
            document.getElementById('advice-result').textContent = 'Error fetching advice: ' + error;
        });
}


function coinFlipAndFetchAdvice() {
    coinFlip()
        .then(result => {
            document.getElementById('flip-result').textContent = result;
            return fetchAdvice();
        })
        .then(advice => {
            document.getElementById('advice-result').textContent = advice;
        })
        .catch(error => {
            document.getElementById('flip-result').textContent = error;
        });
}


document.getElementById('flip-btn').addEventListener('click', coinFlipAndFetchAdvice);

document.getElementById('fetch-advice-btn').addEventListener('click', () => {
    const adviceId = document.getElementById('advice-id').value;
    fetchAdviceById(adviceId);
});
