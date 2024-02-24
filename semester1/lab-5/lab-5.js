document.addEventListener('DOMContentLoaded', function () {
  const textSource = document.getElementById('source-text');
  const convertButton = document.getElementById('go');
  const resultText = document.getElementById('result-text');

  convertButton.addEventListener('click', function () {
    const inputText = textSource.value.trim();
    const elements = createElements(inputText);
    resultText.innerHTML = '';
    resultText.append(...elements);
  });

  function createElements(text) {
    return Array.from(text).map(char => {
      if (isLetter(char)) {
        const image = document.createElement('img');
        image.src = getImageUrl(char);
        return image;
      } 
      else {
        const span = document.createElement('span');
        span.textContent = char;
        return span;
      }
    });
  }

  function isLetter(char) {
    return /^[a-zA-Z]+$/.test(char);
  }

  function getImageUrl(letter) {
    const isLowerCase = letter.toLowerCase() === letter;
    const prefix = isLowerCase ? 'small_' : '';
    return `/lab-5/images/${prefix}${letter}.png`;
  }
});
