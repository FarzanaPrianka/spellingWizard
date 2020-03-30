$(document).ready(function() {
  let currentQuestion = 0;
  let score = 0;
  let quizOver = false;

  //the original array that contains all the collection of word

  let primarySpellingCollection = [
    {
      question: "Many restaurants serve ________ as a side.",
      options: ["broccolli", "broccoli", "brocolli"],
      answer: "broccoli"
    },
    {
      question:
        "The truck was unable to ________ comfortably in the narrow street.",
      options: ["maneuver", "manuever", "maneuvre"],
      answer: "maneuver"
    },
    {
      question:
        "A range of symptoms of the desease include ________ and vomiting",
      options: ["diahrrea", "diarrhea", "diarhea"],
      answer: "diarrhea"
    },
    {
      question: "Any language must ________ new concepts",
      options: ["accomodate", "acommodate", "accommodate"],
      answer: "accommodate"
    },
    {
      question: "The area has experienced the worst drought in half a ________",
      options: ["millenium", "milennium", "millennium"],
      answer: "millennium"
    },
    {
      question: "The ________ form was distributed properly.",
      options: ["questionnaire", "questionaire", "questionnair"],
      answer: "questionnaire"
    },
    {
      question: "The students had little ________ with the language",
      options: ["aquaintance", "acquaintance", "acquaintence"],
      answer: "acquaintance"
    },
    {
      question: "________ is my birthday.",
      options: ["Tommorow", "Tomorrow", "Tommorrow"],
      answer: "Tomorrow"
    },
    {
      question: "The website was down for ________",
      options: ["maintenance", "maintainance", "maintnance"],
      answer: "maintenance"
    },
    {
      question: "________ I climbed and shook the trees",
      options: ["Occasionaly", "Occassionally", "Occasionally"],
      answer: "Occasionally"
    }
  ];

  //function that takes an argument and return shuffled array
  //iterate through the array backwards and as its encounters each element we will exchange its position with another element in the array.

  let arrayShuffle = function(arr) {
    let newPosition;
    let temporary;

    for (let i = arr.length - 1; i > 0; i--) {
      //generate a random number from i to 0
      newPosition = Math.floor(Math.random() * (i + 1));
      temporary = arr[i];
      arr[i] = arr[newPosition];
      arr[newPosition] = temporary;
    }

    return arr;
  };

  let spellingCollection = arrayShuffle(primarySpellingCollection);
  console.log(spellingCollection);

  //when user clicks lets play, it calls displayQuestions function

  $(".letsPlay").click(displayQuestions);

  function displayQuestions() {
    //hide the introduction
    $(".introduction").addClass("hide");

    //store the options from options array (which is a property in the object stored in spellingCollection array)

    let option1 = spellingCollection[currentQuestion].options[0];
    let option2 = spellingCollection[currentQuestion].options[1];
    let option3 = spellingCollection[currentQuestion].options[2];

    // display the question number

    $(".questionContainer").html(`

      <form class="quizForm">
          <p class="questionNumber">
            Question ${currentQuestion + 1} out of ${spellingCollection.length}
          </p>
          <p class="question">
            ${spellingCollection[currentQuestion].question}
          </p>
          <ul class="optionContainer">
            <li class="option">
              <input type="radio" id=${option1} name="quiz" value=${option1}>
              <label for=${option1}>${option1} </label>
            </li> 
            <li class="option">
              <input type="radio" id=${option2} name="quiz" value=${option2}>
              <label for="${option2}">${option2}</label> 
            </li> 
            <li class="option"> 
              <input type="radio" id=${option3} name="quiz" value=${option3}>
              <label for=${option3}>${option3}</label> 
            </li>
          </ul>
          <button type="submit" class="answer">
            Submit
          </button>
      </form> 
    `);
  }

  //when user submit the answer

  $("body").on("submit", "form", function(event) {
    event.preventDefault();
    let response = $("form input[type='radio']:checked").val();

    if (currentQuestion == spellingCollection.length - 1) {
      quizOver = true;
    }

    if (response == undefined) {
      alert("please select a answer");
    } else if (response == spellingCollection[currentQuestion].answer) {
      $(".resultContainer").html(`
        <p class="result">Correct Answer</p>
        <button class="next">Next</button>`);
      //increase the score
      score++;
      //empty the question container
      $(".questionContainer").html("");
    } else {
      $(".resultContainer").html(`
        <p class="result">Wrong Answer</p>
        <p class="correctAnswer">Right Answer is: ${spellingCollection[currentQuestion].answer}</p>
        <button class="next">Next</button>`);
      //empty the question container
      $(".questionContainer").html("");
    }

    if (quizOver == true) {
      $(".next").remove();
      $(".gameOver").html(`
        <p class="totalScore"> Your Total Score is: ${score}/${spellingCollection.length}</p>
        <button class="playAgain">Play Again</button>
      `);
    }
    currentQuestion++;
  });

  //when user click next question
  $("body").on("click", ".next", function() {
    console.log("next question");
    $(".resultContainer").html("");
    displayQuestions();
  });

  //when user click play again button
  $("body").on("click", ".playAgain", function() {
    currentQuestion = 0;
    score = 0;
    quizOver = false;
    spellingCollection = arrayShuffle(primarySpellingCollection);

    displayQuestions();

    $(".gameOver").html("");
    $(".resultContainer").html("");
  });
});
