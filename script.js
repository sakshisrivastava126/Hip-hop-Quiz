const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn') 

const questionContainerElement = document.getElementById('question-container') 
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-button')

let shuffledQuestions,currentQuestionIndex;
let quizScore =0;

startButton.addEventListener('click',startGame)

nextButton.addEventListener('click',()=>{
    currentQuestionIndex++
    setnextQuestion()
})

function startGame(){
    quizScore=0
    currentQuestionIndex = 0
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() -0.5)

    document.getElementById('right-answers').classList.add('hide');
    document.querySelector('.container').classList.remove('hide'); 

    const restartButton = document.querySelector('.restart');
    if (restartButton) restartButton.remove();

    questionContainerElement.classList.remove('hide')
    nextButton.classList.remove('hide')
    setnextQuestion()
    
}

function setnextQuestion(){
    resetState();
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question){
    questionElement.innerText = `Q${currentQuestionIndex + 1}: ${question.question}`;
    question.answers.forEach((answer) =>{
        const button = document.createElement('button')
        button.innerText = answer.text;
        button.classList.add('btn')
        if(answer.correct){
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState(){
    clearStatusClass(answerButtonsElement)
    nextButton.classList.add('hide')
    while(answerButtonsElement.firstChild){
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
    document.getElementById('right-answers').innerText = '';
}

function selectAnswer(e){
    const selectedButton =e.target
    const correct = selectedButton.dataset.correct

    Array.from(answerButtonsElement.children).forEach((button) =>{
        setStatusClass(button,button.dataset.correct);
        button.disabled = true;
    })

    if(correct) {
        quizScore++
    }

    if(shuffledQuestions.length > currentQuestionIndex +1){
        nextButton.classList.remove("hide")
    }
    else{
        showScore();
    }
    
}

function showScore(){
    document.querySelector('.container').classList.add('hide')

    const scoreElement = document.getElementById('right-answers');
    scoreElement.innerText = `Score: ${quizScore}/${questions.length}`;
    scoreElement.classList.remove('hide');

    const restartButton = document.createElement('button');
    restartButton.innerText = "Restart";
    restartButton.classList.add('restart');
    restartButton.addEventListener('click', startGame);

    scoreElement.appendChild(restartButton);
}

function setStatusClass(element,correct){
    clearStatusClass(element)
    if(correct === "true"){
        element.classList.add("correct");
    }
    else{
        element.classList.add("wrong");
    }
}

function clearStatusClass(element){
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions =[
    {
        question: 'Which city is often considered the birthplace of hip-hop?',
        answers : [
            { text: 'Los Angeles', correct: false},
            { text: 'Chicago', correct: false},
            { text: 'New York City', correct: true},
            { text: 'Atlanta', correct: false}
        ],
    },
    {
        question: 'Which rapper is known for their alter ego, "Slim Shady"?',
        answers : [
            { text: 'Kanye West', correct: false},
            { text: 'Eminem', correct: true},
            { text: 'Dr. Dre', correct: false},
            { text: 'Lil Wayne', correct: false}
        ],
    },
    {
        question: 'Which Kendrick Lamar album was heavily inspired by the political and social climate in America?',
        answers : [
            { text: 'DAMN.', correct: false},
            { text: 'To Pimp a Butterfly', correct: true},
            { text: 'Section.80', correct: false},
            { text: 'good kid, m.A.A.d city', correct: false}
        ],
    },
    {
        question: 'What is the main theme of Kendrick Lamar’s song "HUMBLE."?',
        answers : [
            { text: 'Self-reflection and humility', correct: true},
            { text: 'Wealth and fame', correct: false},
            { text: 'Street violence', correct: false},
            { text: 'Love and relationships', correct: false}
        ],
    },
    {
        question: 'Which rapper is credited with popularizing the Punjabi-English rap style and collaborated with artists like Dr. Dre and Snoop Dogg on global projects?',
        answers : [
            { text: 'Bohemia', correct: true},
            { text: 'Raftaar', correct: false},
            { text: 'Divine', correct: false},
            { text: 'Badshah', correct: false}
        ],
    },
    {
        question: 'Which famous producer from the Indian hip-hop scene worked on the track "Mere Gully Mein" alongside Divine and Naezy?',
        answers : [
            { text: 'Vedang', correct: false},
            { text: 'Sez On The Beat', correct: true},
            { text: 'Nucleya', correct: false},
            { text: 'DJ Shah', correct: false}
        ],
    },
    {
        question: "Which famous producer from the Indian hip-hopWhich hip-hop artist's 2016 album 'The Life of Pablo' became famous for its mix of gospel, hip-hop, and fashion culture?",
        answers : [
            { text: 'Jay-Z', correct: false},
            { text: 'Drake', correct: false},
            { text: 'Kanye West', correct: true},
            { text: 'Travis Scott', correct: false}
        ],
    },
    {
        question: "Which rapper, known for his 'melodic rap' style, released the album Eternal Atake in 2020, featuring the viral track 'Baby Pluto'?",
        answers : [
            { text: 'Lil Yachty', correct: false},
            { text: 'Lil Uzi Vert', correct: true},
            { text: 'Playboi Carti', correct: false},
            { text: 'Travis Scott', correct: false}
        ],
    },
    {
        question: "Which Atlanta-based rapper, known for his 'mumble rap' style, released the album Whole Lotta Red in 2020, marking a major shift in his musical direction?",
        answers : [
            { text: 'Future', correct: false},
            { text: 'Lil Uzi Vert', correct: false},
            { text: 'Lil Yachty', correct: false},
            { text: 'Playboi Carti', correct: true}
        ],
    },
    {
        question: "Lil Wayne is known for founding which record label that helped launch the careers of artists like Drake and Nicki Minaj?",
        answers : [
            { text: 'OVO Sound', correct: false},
            { text: 'YMCMB (Young Money Cash Money Billionaires)', correct: true},
            { text: 'Roc Nation', correct: false},
            { text: 'Maybach Music Group', correct: false}
        ],
    },
]
