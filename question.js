(function() {
  const myQuestions = [
    {
      question: "1)Which number should come next in the series?<br>1 - 1 - 2 - 3 - 5 - 8 - 13-?",
      answers: {
        a: "8",
        b: "13",
        c: "21",
        d: "26"
      },
      correctAnswer: "c"
    },
     {
      question: "2) If you rearrange the letters 'LNGEDNA' you have the name of a:",
      answers: {
        a: "Animal",
        b: "State",
        c: "Country",
        d: "City"
      },
      correctAnswer: "b"
    },
    {
      question: "3)Which one of the five choices makes the best comparison?<br>PEACH is to HCAEP as 46251 is to:",
      answers: {
        a: "25641",
        b: "12654 ",
        c: " 15264 ",
        d: "51462"
      },
      correctAnswer: "c"
    },
    {
      question: "4)If you rearrange the letters 'CIFAIPC' you would have the name of a:",
      answers: {
        a: "City",
        b: "Animal",
        c: "Ocean",
        d: "River"
      },
      correctAnswer: "c"
    },
    {
      question: "5)Ralph likes 25 but not 24; he likes 400 but not 300; he likes 144 but not 145.<br>Which does he like:",
      answers: {
        a: "1600",
        b: "50",
        c: "124",
        d: "200"
      },
      correctAnswer: "a"
    },
    {
      question: "6)What is the missing number in the sequence shown below?<br>1 - 8 - 27 - ? - 125 - 216",
      answers: {
        a: "36",
        b: "45",
        c: "56",
        d: "64"
      },
      correctAnswer: "d"
    }
];

  function buildQuiz() {
    // we'll need a place to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // we'll want to store the list of answer choices
      const answers = [];

      // and for each available answer...
      for (letter in currentQuestion.answers) {
        // ...add an HTML radio button
        answers.push(
          `<label>
             <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
           </label>`
        );
      }

      // add this question and its answers to the output

      output.push(
        `<div class="slide">
           <div class="question"> ${currentQuestion.question} </div>
           <div class="answers"> ${answers.join("")} </div>
         </div>`
      );
    });

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join("");
  }

  function showResults() {
    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll(".answers");

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach((currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if (userAnswer === currentQuestion.correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = "green";
      } else {
        // if answer is wrong or blank
        // color the answers red
        answerContainers[questionNumber].style.color = "red";
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  function showSlide(n) {
    slides[currentSlide].classList.remove("active-slide");
    slides[n].classList.add("active-slide");
    currentSlide = n;
    
    if (currentSlide === 0) {
      previousButton.style.display = "none";
    } else {
      previousButton.style.display = "inline-block";
    }
    
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = "none";
      submitButton.style.display = "inline-block";
    } else {
      nextButton.style.display = "inline-block";
      submitButton.style.display = "none";
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById("quiz");
  const resultsContainer = document.getElementById("results");
  const submitButton = document.getElementById("submit");

  // display quiz right away
  buildQuiz();

  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  showSlide(0);

  // on submit, show results
  submitButton.addEventListener("click", showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();
