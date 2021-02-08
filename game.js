const question = document.querySelector('#question');
const choices = Array.from (document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText= document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []


let questions  = [
    {
        question: 'what is the symbol for ID',
        choice1: '@',
        choice2: '$',
        choice3: '#',
        choice4: '*',
        answer: 3,
    },
    {
        question: 'Commonly used data types DO NOT include',
        choice1: 'Strings',
        choice2: 'Boolean',
        choice3: 'Numbers',
        choice4: 'Alerts',
        answer: 2,
    },
    {
        question: 'Arrays in javascript can be ued to store?',
        choice1: 'Other arrays',
        choice2: 'Numbers and strings',
        choice3: 'Booleans',
        choice4: 'All of the above',
        answer: 4,
    },
    {
        question: 'The condition in an if/else statement is enclosed with?',
        choice1: 'Quotes',
        choice2: 'Curly brackets',
        choice3: 'Square brackets',
        choice4: 'Parenthesis',
        answer: 2,
    }
]


const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestions()
}

getNewQuestions = () => {
    if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem(' mostRecentScore', score)

        return window.location.assign('end.html')
    }

    questionCounter++
    progressText.innerText = 'Question ${questionCounter} of ${MAX_QUESTIONS}'
    progressBarFull.style.width = '${(questionCounter/Max_QUESTIONS) * 100}%'

   const questionIndex = Math.floor(Math.random() * availableQuestions.length)
   currentQuestion = availableQuestions[questionIndex]
   question.innerText = currentQuestion.question

   choices.forEach(choice => {
       const number = choice.dataset['number']
       choice.innerText = currentQuestion['choice' + number]
   })

   availableQuestions.splice(questionIndex, 1)

   acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false 
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if (classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }
        selectedChoice.parentElement.classList.add(classToApply)
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestions()

        }, 1000)
    })
})


incrementScore = num => {
    score +=num
    scoreText.innerText = score
}


var count = 120;
var timer = setInterval(function() {
  console.log(count);
  count--;
  if(count === 0) {
    stopInterval()
  }
}, 1000);

var stopInterval = function() {
  console.log('time is up!');
  clearInterval(timer);
}

startGame()

function newFunction() {
    return 'end.html';
}

