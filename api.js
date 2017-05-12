$(document).ready(function() {
  console.log("ready to go!");
  $.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy').then(function(data) {
    var questions = [];
    for (var i = 0, len = data.results.length; i < len; i++) {
      var question = data.results[i].question;
      var answer =  data.results[i].correct_answer;
      questions.push({answer: answer, question: question});
    }
    $.get('http://api.giphy.com/v1/gifs/search?q='+ questions[0].answer + '&api_key=dc6zaTOxFJmzC').then(function(gifs) {
       generateCard(gifs.data[0].images.original.url, questions[0].question, questions[0].answer); 
    });
  });
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

