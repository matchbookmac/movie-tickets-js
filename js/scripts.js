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
      $("#ticket-price").show();
      var ticket = new Ticket(title, new Date(2015, 1, 1, parseInt(time[0]), parseInt(time[1])), parseInt(age));
      $("#ticket-price").html("Cost: $" + ticket.price());
    } else {
      $("#ticket-price").hide();
    }
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
