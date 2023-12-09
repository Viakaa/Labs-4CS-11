
  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }
  
function calculateTriangleArea(calculatorId) {
    const side1 = parseFloat(document.getElementById(`side1_${calculatorId}`).value);
    const side2 = parseFloat(document.getElementById(`side2_${calculatorId}`).value);
    const side3 = parseFloat(document.getElementById(`side3_${calculatorId}`).value);
  
    if (side1 + side2 > side3 && side1 + side3 > side2 && side2 + side3 > side1) {
      const s = (side1 + side2 + side3) / 2;
      const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3));
      document.getElementById(`result_${calculatorId}`).textContent = `Area: ${area.toFixed(2)}`;
    } else {
      document.getElementById(`result_${calculatorId}`).textContent = 'Invalid Triangle';
    }
  }
  
  function calculateTriangleAreaBySidesAndAngle(calculatorId) {
    const side1 = parseFloat(document.getElementById(`side1_${calculatorId}`).value);
    const side2 = parseFloat(document.getElementById(`side2_${calculatorId}`).value);
    const angle = parseFloat(document.getElementById(`angle_${calculatorId}`).value);
  
    const angleInRadians = degreesToRadians(angle);
    const area = (side1 * side2 * Math.sin(angleInRadians)) / 2;
  
    document.getElementById(`result_${calculatorId}`).textContent = `Area: ${area.toFixed(2)}`;
  }
  
  function calculateTriangleAreaBySideAndHeight(calculatorId) {
    const side = parseFloat(document.getElementById(`side_${calculatorId}`).value);
    const height = parseFloat(document.getElementById(`height_${calculatorId}`).value);
  
    const area = (side * height) / 2;
  
    document.getElementById(`result_${calculatorId}`).textContent = `Area: ${area.toFixed(2)}`;
  }
  
  function checkPalindrome() {
    const number = document.getElementById('number_palindrome').value.toString();
    const reversedNumber = number.split('').reverse().join('');
  
    const result = number === reversedNumber ? 'Palindrome' : 'Not Palindrome';
  
    document.getElementById('result_palindrome').textContent = result;
  }
  
  function checkAnagram() {
    const word1 = document.getElementById('word1_anagram').value.toLowerCase();
    const word2 = document.getElementById('word2_anagram').value.toLowerCase();
  
    const sortedWord1 = word1.split('').sort().join('');
    const sortedWord2 = word2.split('').sort().join('');
  
    const result = sortedWord1 === sortedWord2 ? 'Anagram' : 'Not Anagram';
  
    document.getElementById('result_anagram').textContent = result;
  }
  
  function checkFibonacciNumber() {
    const index = parseInt(document.getElementById('number_fibonacci-order').value);
    let a = 1,
      b = 1;
  
    for (let i = 3; i <= index; i++) {
      const c = a + b;
      a = b;
      b = c;
    }
  
    document.getElementById('result_fibonacci-order').textContent = `Fibonacci Number: ${b}`;
  }
  
  function checkFibonacci() {
    const number = parseInt(document.getElementById('number_fibonacci-belong').value);
    let a = 1,
      b = 1;
  
    while (b < number) {
      const c = a + b;
      a = b;
      b = c;
    }
  
    const result = b === number ? 'Belongs to Fibonacci' : 'Does not belong to Fibonacci';
  
    document.getElementById('result_fibonacci-belong').textContent = result;
  }
  
  function showCalculator(calculatorId) {
    const resultDiv = document.getElementById('result');
    const calculatorDivs = document.querySelectorAll('.calculator');
  
    calculatorDivs.forEach(div => {
      div.style.display = 'none';
    });
  

    if (calculatorId === 'result-button') {
      resultDiv.style.display = 'block';
    } else {
      const selectedCalculator = document.getElementById(calculatorId);
      if (selectedCalculator) {
        selectedCalculator.style.display = 'block';
      }
    }
  }