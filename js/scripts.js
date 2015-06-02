"use strict";


//jQuery
$( document ).ready(function() {

  $('.clockpicker').clockpicker();

  var select = '';
  select += '<option>Select an Age</option>';
  for (var i = 1; i <= 100; i++) {
      select += '<option val=' + i + '>' + i + '</option>';
  }
  $('select#age').html(select);

  $('input').change(function() {
    updatePrice();
  });

  $('select').change(function() {
    updatePrice();
  });

  function updatePrice() {
    var title = $("input#title").val();
    var time = $("input#time").val().split(':');
    var age = $("select#age").val();
    if(title.trim() != "" && age != "Select an Age") {
      $("#ticket-price").slideDown("slow");
      $("#no-button").hide();
      $("#go-button").show();
      var ticket = new Ticket(title, new Date(2015, 1, 1, parseInt(time[0]), parseInt(time[1])), parseInt(age));
      $("#ticket-price").html("Cost: $" + ticket.price());
    } else {
      $("#ticket-price").slideUp("slow");
      $("#go-button").hide();
      $("#no-button").show();
    }
  }


  $("form#buy-ticket").submit(function(event) {
    event.preventDefault();

    var title = $("input#title").val();
    var time = $("input#time").val().split(':');
    var age = $("select#age").val();
    if(title.trim() != "" && age != "Select an Age") {
      var ticket = new Ticket(title, new Date(2015, 1, 1, parseInt(time[0]), parseInt(time[1])), parseInt(age));
      $("table#purchased-tickets").append('<tr>' + '<td>' + title + '</td>' + '<td>' + time.join(":") + '</td>' + '<td>$' + ticket.price() + '</td>' + '</tr>');
      clearForms();
      updatePrice();
      $("#purchased-tickets-panel").fadeIn("slow");
    } else {

    }
  });

  function clearForms() {
    $("input#title").val("");
    $("input#time").val("09:30");
    $("input#age").val("Select an Age");
  }

});

//raw js
function Ticket(title, time, age) {
  this.title = title;
  this.time = time;
  this.age = age;
}

Ticket.prototype.price = function() {
  var title = this.title;
  var hours = this.time.getHours();
  var age = this.age;
  var price = 15;

  if (age < 16) {
    price -= 5;
  } else if (age > 56) {
    price -= 7;
  }

  if (hours < 18) {
    price /= 2;
  }

  return price;
}
