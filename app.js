const $circle = document.querySelector('#circle');
const $score = document.querySelector('#score');
const $currentAddOne = document.querySelector('#current-add-one');
const $boostButton = document.querySelector('#boost-button');
const $dropdown = document.getElementById("myDropdown");

let addOneValue = 1; // Default value for addOne
let boostPrice = 100; // Initial price for the boost

function Start() {
    setScore(getScore());
    updateAddOneDisplay();
    updateBoostButton(); // Initialize boost button display
}

function setScore(score) {
    localStorage.setItem('score', score);
    $score.textContent = score;
}

function getScore() {
    return Number(localStorage.getItem('score')) || 0;
}

function addOne() {
    setScore(getScore() + addOneValue);
}

function toggleDropdown() {
    $dropdown.classList.toggle("show");
}

$boostButton.addEventListener('click', () => {
    const currentScore = getScore();
    if (currentScore >= boostPrice) {
        setScore(currentScore - boostPrice); // Deduct the current boost price
        addOneValue += 1; // Increase addOne value by 1
        boostPrice *= 2; // Double the boost price
        updateAddOneDisplay(); // Update the display for addOne
        updateBoostButton(); // Update the boost button text
        toggleDropdown(); // Close dropdown after action
    } else {
        alert("Not enough coins!");
    }
});

function updateAddOneDisplay() {
    $currentAddOne.textContent = `+${addOneValue}`;
}

function updateBoostButton() {
    $boostButton.innerHTML = `Multitap<br><img src="./assets/image/coin2.png" alt=""> ${boostPrice}`; // Update button text
}

$circle.addEventListener('click', (event) => {
    const plusOne = document.createElement('div');
    plusOne.classList.add('plus-one');
    plusOne.textContent = `+${addOneValue}`;
    $circle.parentElement.appendChild(plusOne);
    addOne();
    setTimeout(() => {
        plusOne.remove();
    }, 2000);
});

// Prevent closing the dropdown when clicking on the background
window.onclick = function(event) {
    if (event.target.matches('.close-button')) {
        toggleDropdown();
    }
}

if (window.innerWidth > 768) {
    document.body.innerHTML = '<h1>Только для мобильных устройств</h1><p>Пожалуйста, используйте мобильное устройство для доступа к этой странице.</p>';
}

Start();
