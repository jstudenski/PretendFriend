function randomName() {
  var currentURL = window.location.origin;

  return $.ajax({
    url: currentURL + "/api/random",
    method: "GET"
  }).then(function(names) {

    var male = names.firstNames.male;
    var female = names.firstNames.female;

    var character = {};

    if ((Math.floor(Math.random() * 2) === 1)) {
      character.firstname = male[Math.floor(Math.random() * male.length)];
      character.gender = "male";
    } else {
      character.firstname = female[Math.floor(Math.random() * female.length)];
      character.gender = "female";
    }
    character.lastname = names.lastNames[Math.floor(Math.random() * names.lastNames.length)];

    return character

  });
}

// generate questions html
var questions = ['Question 1', 'Question 2', 'Question 3'];
for (var i = 0; i < questions.length; i++) {
  $('.radio-questions').append(questions[i] + '<br>');
  var name = 'question' + i;
  for (var r = 1; r < 6; r++) {
    // generate radio buttons
    var label = $('<label>')
      .addClass('radio')
      .html(r);
    var input = $('<input type="radio">')
      .attr('name', name)
      .attr('value', r)
      .appendTo(label);
    if (r === 3) {
      input.prop('checked', true)
    }
    label.appendTo($('.radio-questions'));
  }
  $('.radio-questions').append('<br>');
}

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

$(".randomize").on("click", function() {
  var rand;
  for (var i = 0; i < questions.length; i++) {
    rand = Math.floor(Math.random() * Math.floor(5));
    $('input:radio[name=question' + i + ']')[rand].checked = true;
  }

  randomName()
    .then(function(character) {

      var randomImgNum = (character.gender === "male" ? randomNum(1, 15) : randomNum(16, 30));

      $('#inputName').val(character.firstname + " " + character.lastname);
      $('#inputImage').val('images/people_' + randomImgNum + '.png');

      var img = $('<img>');
      img.attr('src', 'images/people_' + randomImgNum + '.png');
      img.css('width', '100px');
      $('#image').html(img);

    })

});



// submit button
$(".submit").on("click", function(event) {
  event.preventDefault();

  var responses = [];

  for (var i = 0; i < questions.length; i++) {
    responses.push(parseInt($('input[name=' + 'question' + i + ']:checked').val()));
  }

  var newFriend = {
    name: $("#inputName").val().trim(),
    photo: $("#inputImage").val().trim(),
    scores: responses // responses
  };

  console.log(newFriend);

  $.post("/api/friends", newFriend,
  function(data) {

    if (data) {
     // alert("Yay! You have added a friend!");
    }

    var currentURL = window.location.origin;
    $.ajax({
      url: currentURL + "/api/friends",
      method: "GET"
    }).then(function(friends) {

      $('#myModal').show();
      $('.modal-body').html('');

      console.log(friends)

      for (var i = 0; i < friends.length; i++) {
         $('.modal-body').append(friends[i].name);
         $('.modal-body').append(friends[i].scores);
      

        var img = $('<img>');
        img.attr('src', friends[i].photo);
        img.css('width', '100px');
        $('.modal-body').append('<br>');         
        $('.modal-body').append(img);
        $('.modal-body').append('<br>');
        
      }

    });

  });

});


myArray = [3, 2, 1, 5, 1];
computerArray = [4, 2, 1, 2, 3];

function diffCheck(arr1, arr2) {
  // make sure arrays are the same length
  if (arr1.length != arr2.length) {
    throw "Arrays not the same length!";
  }

  var totalDiff = 0;

  for (var i = 0; i < arr1.length; i++) {
    totalDiff += Math.abs(arr1[i] - arr2[i]);
  }

  //console.log(totalDiff);
}

diffCheck(myArray, computerArray);



$('#myBtn').click(function() {
  $('#myModal').show();
  $('.modal-body').html("hello!");
});

$('.close').click(function() {
  $('#myModal').hide();
});

var modal = document.getElementById('myModal');

window.onclick = function(event) {
  if (event.target == modal) {
    $('#myModal').hide();
  }
}

