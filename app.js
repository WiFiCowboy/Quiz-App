console.log('Script online!');
// Question and answers
const STORE = [//1
      {
        question: "Whom does Thomas Anderson help to take out the garbage?",
        answers: [
          "Land Lady", 
          "Black Widow", 
          "Trinity", 
          "Acid Burn"
        ],
        correctAnswer: "Land Lady"
      },
      //2
      {
        question: "What are Agents?",
        answers: [
          "Controlling software",
          "Interactive Sentinels", 
          "Federal programs",
          "Sentient programs"
        ],
        correctAnswer: "Sentient programs"
      },
      //3
      {
        question: "Who is this quote from 'The answer is out there, Neo. It's looking for you. And, it will find you, if you want it to.'",
        answers: [
          "Morpheus", 
          "Mouse", 
          "Trinity", 
          "Tank"
        ],
        correctAnswer: "Trinity"
      },
      //4
      {
        question: "After Morpheus makes the big jump in the jump program, what does Neo exclaim?",
        answers: [
          "Excellent!", 
          "Whoa!", 
          "I am an FBI agent!", 
          "Bogus!"
        ],
        correctAnswer: "Whoa!"
      },
      //5
      {
        question: "Agent Smith claims that this, above all else, is what he hates the most about having to be among humans in The Matrix.",
        answers: [
          "The ugliness of people", 
          "The stupidity", 
          "Boredom", 
          "The smell"
        ],
        correctAnswer: "The smell"
      }
    ];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

// render state
function displayStart(){
    $('.quizStart').show();
    $('.js-score-box').hide();
    $('.quizQA').hide();
    $('.quizAnswerMsg').hide();
    $('.endQuizMsg').hide();
};
// render state
function displayQA(){
    $('.quizStart').hide();
    $('.js-score-box').show();
    $('.quizQA').show();
    $('.quizAnswerMsg').hide();
    $('.endQuizMsg').hide();
};
// render state
function displayQAMsg(){
    $('.quizStart').hide();
    $('.js-score-box').show();
    $('.quizQA').hide();
    $('.quizAnswerMsg').show();
    $('.endQuizMsg').hide();
};
// render state
function displayEndMsg(){
    $('.quizStart').hide();
    $('.js-score-box').hide();
    $('.quizQA').hide();
    $('.quizAnswerMsg').hide();
    $('.endQuizMsg').show();
};

// start quiz
function startQuiz(){
    $('#js-start-quiz').on('click', function(){
        // call render question and answer something()
        createQuestions();
    }       
)};

// display QA or end message
function createQuestions(){
    if(questionNumber < STORE.length){
        displayQA();
        getQuestion();
        getAnswers();
        // incrementQuestionNumber(); Need to call after handle answer submit 
        updateQuestionNumber();
    }else{
        displayEndMsg();
    }
    $('.js-score-count').text(score);
};


// loop through question 
function getQuestion(){
    // gets question 
        $('.quizQA').html(`<form id="formQA">
        <fieldset>
        <legend class="questionText">${STORE[questionNumber].question}</legend>
        </fieldset>
        </form>`)    
};

// loop through answers 
function getAnswers(){
    // get answers
    STORE[questionNumber].answers.forEach(function(answerValue, answerIndex){
        $(`<label class="something" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo($('.quizQA').find('fieldset'));
    });
    $(`<button type="submit" class="submitButton button"> Submit</button>`).appendTo($('.quizQA').find('fieldset'));
    handleAnswerSubmit();
};

// handle answer submit for question
function handleAnswerSubmit(){
    $('#formQA').on('submit', function(event){
        event.preventDefault();
        let radioSelected;
        radioSelected = $('input:checked');
        let radioAnswer;
        radioAnswer = radioSelected.val();
        let correct = STORE[questionNumber].correctAnswer;
        if(correct !== radioAnswer){
            displayQAMsg();
            $('.js-answer-message').text('Wrong!');
            $('.js-display-question').text(radioAnswer);
            $('#imageAnswer').attr('src', 'https://media3.giphy.com/media/ydBzMGqNz2ehG/giphy.webp?cid=790b76113d7d4b3742b186851d407adc8bed6c566a448eca&rid=giphy.webp');
            nextQuestion();
            incrementQuestionNumber();
        }else{
            displayQAMsg();
            incrementScore();
            $('.js-answer-message').text('Correct!');
            $('.js-display-question').text(correct);
            $('#imageAnswer').attr('src', 'https://media1.giphy.com/media/V2ojLo7PvhVug/giphy.webp?cid=790b7611b28633076b17932b0fa31587061986ad544ffc6d&rid=giphy.webp');
            nextQuestion();
            incrementQuestionNumber();
        }
    });
};

// cycle through next question
function nextQuestion(){
    $('.js-next-question').on('click', function(){
        createQuestions();
    });
};

// Validate answer is selected before submit
function validateAnswerSelected(){
    $('.quizQA').validate({
        rules: {
            input: 'required'
        }
    });
};

// update question number 
function updateQuestionNumber(){
    $('.js-question-number').text(questionNumber + 1);
};

// Increase score counter
function incrementScore(){
    score++;
    // $('.js-score-count').text(score); 
    scoreKeeper();
};

// Increase question counter
function incrementQuestionNumber(){
    questionNumber ++;
};

// restore quiz to zero state
function resetQuiz(){
    $('.js-reset-quiz').on('click',function(){
        questionNumber = 0;
        score = 0;
        displayStart();
    });
}

function scoreKeeper(){
    if(score === 5) {
        $('.styleImg').attr('src','https://media.giphy.com/media/6xE1FNcorRInS/giphy.gif')
    } else if (score === 4 ) {
        $('.styleImg').attr('src','https://media3.giphy.com/media/rvsIuQkF1iL3G/giphy.webp?cid=790b761179a08c58cfff45cb39a5eb51f24b63dbdaca5116&rid=giphy.webp');
    } else if (score === 3 ) {
        $('.styleImg').attr('src','https://media.giphy.com/media/MC6eSuC3yypCU/giphy.gif'); 
    } else {
        $('.styleImg').attr('src','https://media.giphy.com/media/8LbYKVeqQkKRi/giphy.gif');
    }
};

// Control for running app
function controller(){
    displayStart();
    startQuiz();
    resetQuiz();
};

$(controller);