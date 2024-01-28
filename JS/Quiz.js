// selecting elements
const start = document.getElementById("start");
const quiz = document.getElementById("quiz");
const question = document.getElementById("question");
const qImg = document.getElementById("qImg");
const choiceA = document.getElementById("A");
const choiceB = document.getElementById("B");
const choiceC = document.getElementById("C");
const counter = document.getElementById("counter");
const timeGauge = document.getElementById("timeGauge");
const progress = document.getElementById("progress");
const scoreDiv = document.getElementById("scoreContainer");

// creating questions
let questions = [
    {
        question : "What was the music style that defined 70's?",
        imgSrc : "img/a.jpg",
        choiceA : "Disco",
        choiceB : "Jazz",
        choiceC : "Soul",
        correct : "A"
    },{
        question : "Name the first person to appear on the cover of the Rolling stones magazine?",
        imgSrc : "img/b.jpg",
        choiceA : "Richard Gere",
        choiceB : "John Lennon",
        choiceC : "Tom Petty",
        correct : "B"
    },{
        question : "Complete lyrics, 'I have died everyday waiting for you, Darling.........'",
        imgSrc : "img/c.jpg",
        choiceA : "..... don't be afraid, I have loved you for a thousand years",
        choiceB : "..... I believed I would find you, time has brought heart to me",
        choiceC : "..... I love you for a thousand years, I'll love you for a thousand more",
        correct : "A"
    },{
        question : "Name the orchestral instrument that can play high note?",
        imgSrc : "img/d.jpg",
        choiceA : "Piccolo",
        choiceB : "Viola",
        choiceC : "Violin",
        correct : "C" 
    },{
        question : "Name the all-time bestselling movie soundtrack?",
        imgSrc : "img/e.png",
        choiceA : "“Son of a Preacher Man,” by Dusty Springfield",
        choiceB : "“Girl, You’ll Be a Woman Soon,” by Urge Overkill",
        choiceC : "The Bodyguard: The Original Soundtrack Album",
        correct : "C" 
    },{
        question : "What does a spectrum mean?",
        imgSrc : "img/f.jpg",
        choiceA : "Guitar pick",
        choiceB : "howel",
        choiceC : "Matchstick",
        correct : "A" 
    },{
        question : "The first pop music video released is _?",
        imgSrc : "img/g.jpg",
        choiceA : "In my feelings",
        choiceB : "Bohemian Rhapsody",
        choiceC : "Plutomania",
        correct : "B" 
    },{
        question : "Who had the first country music album to top the U.S. Pop Album charts?",
        imgSrc : "img/h.jpg",
        choiceA : "Waylon Jennings",
        choiceB : "Jerry Lee",
        choiceC : "Johnny Cash",
        correct : "C" 
    },{
        question : "Complete lyrics, 'So, I say a little prayer and hope my dreams will take me there.....'",
        imgSrc : "img/i.jpg",
        choiceA : ".... where the skies are blue, to see you once again",
        choiceB : ".... reaching for the love that seems so far",
        choiceC : ".... the days we had, the songs we sang together",
        correct : "A" 
    },{
        question : "In an Orchestra, which is the largest brass section instrument?",
        imgSrc : "img/j.jpg",
        choiceA : "Tenor",
        choiceB : "French horns",
        choiceC : "Tuba",
        correct : "C" 
    }
];


const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
// (6s)
const questionTime = 6; 
// (150px)
const gaugeWidth = 150; 
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// render_question
function renderQuestion(){
    let q = questions[runningQuestion];
    
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
}

start.addEventListener("click",startQuiz);

// start quiz
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    // (1000ms = 1s)
    TIMER = setInterval(renderCounter,1000); 
}

// render_progress
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}


// counter_render
function renderCounter(){
    if(count <= questionTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // changing color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // finalized score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}


// check_Answer
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // correct answer
        score++;
        // changing color to green
        answerIsCorrect();
    }else{
        // wrong answer
        // changing color to red
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // finalized score
        clearInterval(TIMER);
        scoreRender();
    }
}

// for correct answer
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "rgb(69, 210, 184)";
}

// For wrong answer 
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "rgb(208, 29, 104)";
}

// score_render
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculating question marks as a percentage 
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // face selection(img) based on the score percentage
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
}
