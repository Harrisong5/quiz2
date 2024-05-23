const startbtn = document.getElementById("startbtn")
const qcontainer = document.getElementById("qcontainer")
const nextbtn = document.getElementById("nextbtn")
const qelement = document.getElementById("question")
const answers = document.getElementById("answers")
const tally = document.getElementById("tally")
const image = document.getElementById("image")

let shuffq, currqindex

let points = 0

startbtn.addEventListener('click', gamestart)
nextbtn.addEventListener('click', nextq)

function gamestart() {
    console.log("Started!")
    startbtn.classList.add('hide')
    shuffq = questions.sort(() => Math.random() - .5)
    currqindex = 0
    qcontainer.classList.remove('hide')
   nextbtn.classList.remove('hide')
   showq()
   tally.innerText = `Correct answers: ${points}`;
   tally.classList.remove('hide')
}

function nextq() {
    showq(shuffq[currqindex])
    currqindex++; // Increment the current question index
    if (currqindex < shuffq.length) {
        showq(); // Show the next question
    } else {
        // Handle end of quiz (if desired)
        console.log("End of quiz reached!");
    }
}
const questions = [
    {
        question: "/assets/images/english elm.jpg",
        answers: [
            {text: 'Hazel', correct: false},
            {text: 'English Elm', correct: true},
            {text: 'Commom Sallow', correct: false},
            {text: 'Blackthorn', correct: false}
        ],
    },
    {
        question: "/assets/images/alder.jpg",
        answers: [
            {text: 'Ash', correct: false},
            {text: 'Sycamore', correct: false},
            {text: 'Hazel', correct: false},
            {text: 'Alder', correct: true}
        ]
    },
    {
        question: "/assets/images/hawthorn.jpg",
        answers: [
            {text: 'Hawthorn', correct: true},
            {text: 'Holly', correct: false},
            {text: 'Sumac', correct: false},
            {text: 'Elder', correct: false}
        ]
    }
]
function showq(question) {
     nextbtn.classList.add('hide');
    const currentQuestion = shuffq[currqindex];
    image.src = currentQuestion.question;
    answers.innerHTML = ''; // Clear previous answers

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn','col-sm-5', 'offset-sm-1');
        button.addEventListener('click', () => answerQuestion(answer.correct));
        answers.appendChild(button); // Append button to answers container
    });
}

function answerQuestion(isCorrect) {
    const selectedButton = event.target;
    const allButtons = document.querySelectorAll('#answers button');
    
    if (isCorrect) {
        // Handle correct answer
        console.log('Correct!');
        const selectedButton = event.target;
        selectedButton.classList.add('correct');
        addpoint()
    } else {
        // Handle incorrect answer
        console.log('Incorrect!');
        const selectedButton = event.target;
        selectedButton.classList.add('wrong');
        
    }
        
    allButtons.forEach(button => {
        if (!button.classList.contains('correct')) {
            button.disabled = true;
        }
    });
    nextbtn.classList.remove('hide'); // Show the Next button
}

function addpoint() {
    points++;
    tally.innerText = `Correct answers: ${points}`;
}