fetch('https://type.fit/api/quotes')
  .then((res) => res.json())
  .then((data) => {
    const quotes = data.slice(0, 3);
    let score = 0;
    let quotestartTime;
    let quoteEndTime;
    let startTime;
    let endTime;
    let currentQuoteIndex = 0;
    const display = document.getElementById('quote');
    const inputBox = document.getElementById('input');
    const quoteTime = document.getElementById('quote-time');
    const quoteTimeAvg = document.getElementById('quote-time-average');

    function showQuote(index) {
      display.innerText = quotes[index].text;
    }

    function recordTimeTaken(time) {
      quoteTime.innerText = time;
    }

    function avgTimeTaken(average) {
      quoteTimeAvg.innerHTML = average;
    }

    function handleEnterPress(event) {
      if (event.key === 'Enter') {
        const input = inputBox.value;
        if (input === quotes[currentQuoteIndex].text) {
          score++;
          quoteEndTime = new Date();
          const time = (quoteEndTime - quotestartTime) / 1000;
          recordTimeTaken(time);
          inputBox.value = '';
          currentQuoteIndex++;
          quotestartTime = new Date();
          if (currentQuoteIndex === quotes.length) {
            endTime = new Date();
            const totalTime = (endTime - startTime) / 1000;
            const average = (totalTime / quotes.length).toFixed(2);
            localStorage.setItem('score', totalTime + ':' + score);
            alert(`Congratulations! You completed the game in ${totalTime} seconds and scored ${score} points.`);
            avgTimeTaken(average);
          } else {
            showQuote(currentQuoteIndex);
          }
        } else {
          currentQuoteIndex++;
          alert('Wrong quote, try again.');
          if (currentQuoteIndex === quotes.length) {
            endTime = new Date();
            const totalTime = (endTime - startTime) / 1000;
            localStorage.setItem('score', totalTime + ':' + score);
            alert(`Congratulations! You completed the game in ${totalTime} seconds and scored ${score} points.`);
          } else {
            showQuote(currentQuoteIndex);
          }
        }
      }
    }

    showQuote(currentQuoteIndex);
    startTime = new Date();
    quotestartTime = new Date();
    document.addEventListener('keydown', handleEnterPress);
  });