

const coinFlip = async () => {
    try {
        const flip = Math.random() > 0.5;
        if (flip) {
            return "You win!";
            throw new Error("You lose!");
        }
    } catch (error) {
        throw error;
    };


    const fetchAdvice = async () => {
        try {
            const response = await fetch('https://api.adviceslip.com/advice');
            if (!response.ok) {
                throw new Error('Failed to fetch advice');
            }
            const data = await response.json();
            return data.slip.advice;
        } catch (error) {
            throw error;
        }
    };


    const fetchAdviceById = async (id) => {
        try {
            const response = await fetch(`https://api.adviceslip.com/advice/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch advice');
            }
            const data = await response.json();
            console.log(`Advice with id ${id}: ${data.slip.advice}`);
        } catch (error) {
            console.log(error);
        }
    };


    const coinFlipAndFetchAdvice = async () => {
        try {
            const result = await coinFlip();
            document.getElementById('flip-result').textContent = result;

            if (result === "You win!") {
                const advice = await fetchAdvice();
                document.getElementById('advice-result').textContent = advice;
            }
        } catch (error) {
            document.getElementById('flip-result').textContent = error.message; // display error message
        }
    };


    document.getElementById('flip-btn').addEventListener('click', coinFlipAndFetchAdvice);

    document.getElementById('fetch-advice-btn').addEventListener('click', () => {
        const adviceId = document.getElementById('advice-id').value;
        fetchAdviceById(adviceId);
    });
}
