$(document).ready(function() {
  let currentQuestion = 0;
  let score = 0;
  let quizOver = false;

  //the original array that contains all the collection of word

  let primarySpellingCollection = [
    {
      question: "Many restaurants serve __________ as a side",
      options: ["broccolli", "broccoli", "brocolli"],
      answer: "broccoli"
    },
    {
      question:
        "the truck was unable to __________ comfortably in the narrow street",
      options: ["maneuver", "manuever", "maneuvre"],
      answer: "maneuver"
    },
    {
      question:
        "A range of symptoms of the desease include ___________ and vomiting",
      options: ["diahrrea", "diarrhea", "diarhea"],
      answer: "diarrhea"
    },
    {
      question: "any language must ____________ new concepts",
      options: ["accomodate", "acommodate", "accommodate"],
      answer: "accommodate"
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

  //when user clicks reset button, the game starts from the beginning

  //$(".reset").click(resetGame);

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
          <h2>Which is the correct spelling? </h2>
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
        <p class="correctAnswer">Right Answer: ${spellingCollection[currentQuestion].answer}</p>
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

  $("body").on("click", ".next", function() {
    console.log("next question");
    $(".resultContainer").html("");
    displayQuestions();
  });

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
