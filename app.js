window.addEventListener('load', function() {
let countUser = document.querySelector('.count-user'),
    countComp = document.querySelector('.count-comp'),
    userField = document.querySelector('.user-field'),
    compField = document.querySelector('.comp-field'),
    result = document.querySelector('.result'),
    sound = document.querySelector('.sound'),
    play = document.querySelector('.play'),
    fields = document.querySelectorAll('.field'),
    userStep, compStep, countU = 0, countC = 0, blocked = false;

function choiceUser(e) {
    if (blocked) return; 
    let target = e.target;
    if (target.classList.contains('field')) {
        userStep = target.dataset.field // that meens data-field='r'
        fields.forEach(item => item.classList.remove('active', 'error'));
        target.classList.add('active'); // make choosen btn green - active)
        choiceComp();
    }
}

function choiceComp() {
    blocked = true;
    let randomIndex = Math.floor(Math.random() * 3);
    compField.classList.add('blink');
    let compFields = compField.querySelectorAll('.field');
    compStep = Array.from(compFields)[randomIndex].dataset.field;
    setTimeout(() => {
        compField.classList.remove('blink');
        Array.from(compFields)[randomIndex].classList.add('active');
        winner();
    }, 1000);            
}

function winner() {
    blocked = false;
    let combo = userStep + compStep;
    // tie game
    if (combo == 'pp' || combo == 'ss' || combo == 'rr') {
        result.innerText = "Tie game";
        console.log('Tie game:', combo);
        sound.setAttribute('src', 'audio/draw.mp3');
        sound.play();
    }
    // you won
    else if (combo == 'pr' || combo == 'sp' || combo == 'rs') {
        result.innerText = "You won!";
        console.log('you won:', combo);
        countU++;
        countUser.innerText = countU;
        sound.setAttribute('src', 'audio/win.mp3');
        sound.play();
    }
    // you loose
    else if (combo == 'rp' || combo == 'ps' || combo == 'sr') {
        console.log('you loose:', combo);
        result.innerText = "You loose!";
        countC++;
        countComp.innerText = countC;
        sound.setAttribute('src', 'audio/loss.mp3');
        sound.play();
    }

}

function playGame() {
    countU = countC = 0;
    result.innerText = "Make your new choice";
    countComp.innerText = '0';
    countUser.innerText = '0';
    fields.forEach(item => item.classList.remove('active', 'error'));
}

play.addEventListener('click', playGame);
userField.addEventListener('click', choiceUser);

});