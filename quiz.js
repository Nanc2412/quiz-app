const questions = [
    {
        question: "1 + 1 ?",
        answers: [
            { text: "1", correct: false},
            { text: "2", correct: true},
            { text: "8", correct: false},
            { text: "10", correct: false}
        ]
    },
    {
        question: "1 + 1 + 2 ?",
        answers: [
            { text: "2", correct: false},
            { text: "3", correct: false},
            { text: "0", correct: false},
            { text: "4", correct: true}
        ]
    },
    {
        question: "3 + 6 ?",
        answers: [
            { text: "9", correct: true},
            { text: "4", correct: false},
            { text: "3", correct: false},
            { text: "7", correct: false}
        ]
    },
    {
        question: "20 - 9 ?",
        answers: [
            { text: "20", correct: false},
            { text: "9", correct: false},
            { text: "11", correct: true},
            { text: "1", correct: false}
        ]
    }
];
const questionElement = document.getElementById("question");
const answerBtns = document.getElementById("answerBtns");
const nextBtn = document.getElementById("nextBtn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". "+ currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");//creates an element node.
        button.innerHTML = answer.text;
        button.classList.add("btn");//classList property returns CSS classnames of an element.
        //add()	- Adds one or more tokens to the list
        answerBtns.appendChild(button);
        button.addEventListener("click", selectAnswer);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
    });
}
function resetState(){
    nextBtn.style.display = "none";
    while(answerBtns.firstChild){
        answerBtns.removeChild(answerBtns.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerBtns.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextBtn.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextBtn.innerHTML = "Play Again!";
    nextBtn.style.display = "block";
}
function handleNextBtn(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextBtn.addEventListener("click", ()=> {
    if(currentQuestionIndex < questions.length){
        handleNextBtn();
    }
    else{
        startQuiz();
    }
});
startQuiz();