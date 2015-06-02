"use strict";


//jQuery
$( document ).ready(function() {
    console.log( "jQuery Ready" );

    $("#jqtest").text('jQuery Ready')
});

//raw js
function Ticket(name, time, age) {
  this.name = name;
  this.time = time;
  this.age = age;
}

Ticket.prototype.price = function() {
  var name = this.name;
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
