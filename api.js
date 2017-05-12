$(document).ready(function() {
  console.log("ready to go!");
  var question, answer;
  var questions = [];
  $.get('https://opentdb.com/api.php?amount=10&category=15&difficulty=easy').then(function(data) {
    question = data.results[0].question;
    answer =  data.results[0].correct_answer;
    for (var i = 0, len = data.results.length; i < len; i++) {
      var question = data.results[i].question;
      var answer =  data.results[i].correct_answer;
      questions.push({answer: answer, question: question});
    }
    var promises = []
    for (var i = 0; i < questions.length ; i++) {
      promises.push($.get('http://api.giphy.com/v1/gifs/search?q='+ questions[i].answer + '&api_key=dc6zaTOxFJmzC'))
    }
    return Promise.all(promises);
  }).then(function(gifs) {
     for (var i = 0; i < gifs.length; i++) {
       generateCard(gifs[i].data[0].images.original.url, questions[i].question, questions[i].answer); 
     }
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

