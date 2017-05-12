$(document).ready(function() {
  console.log("ready to go!");
  // What is a promise √ - pending value that you access with .then(function(){})
  // How to chain promises √ .then(fn).then(fn).catch(fn(err));
  // Promise.all √ a function that takes an array and whne they are all done, you have all the values
  var request = $.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy');
  var questions = []
  request.then(function (data) {
    for (var i = 0; i < data.results.length; i++) {
      questions.push({
        question: data.results[i].question,
        answer: data.results[i].correct_answer
      });
    }
    console.log(questions);
    var requests = []
    // console.log(question, answer);
    // Promise.all() - a function takes an array and returns a list of results
    for (var i = 0; i < questions.length; i++) {
      requests.push($.get('http://api.giphy.com/v1/gifs/search?q=' + questions[i].answer + '&api_key=dc6zaTOxFJmzC'))
    }
    console.log(requests);
    return Promise.all(requests);
    // return $.get('http://api.giphy.com/v1/gifs/search?q=' + answer + '&api_key=dc6zaTOxFJmzC')
  }).then(function (gifs) {
    console.log(gifs);
    for (var i = 0; i < gifs.length; i++) {
      var image = gifs[i].data[0].images.original.url;
      generateCard(image, questions[i].question, questions[i].answer)
    }
  })
  // CALLBACK Example
  // $.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy', function (data) {
  //   console.log(data);
  // })
  // NOT: going to create a promise
});

function generateCard(imageUrl, question, answer) {
  let cardTemplate = `
    <div class="card">
      <div class="card-image waves-effect waves-block waves-light">
        <img class="activator" src="${imageUrl}">
      </div>
      <div class="card-content">
        <span class="card-title activator grey-text text-darken-4">${question}<i class="material-icons right">more_vert</i></span>
      </div>
      <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${question}<i class="material-icons right">close</i></span>
        <p>${answer}</p>
      </div>
    </div>
   `
  $('main').append(cardTemplate);
}
