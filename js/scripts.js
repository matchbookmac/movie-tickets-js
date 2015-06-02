"use strict";


//jQuery
$( document ).ready(function() {


  var bgArray = ["https://thelosthighwayhotel.files.wordpress.com/2014/12/blade-runner1.jpg",
                "https://cdn3.vox-cdn.com/thumbor/H-AnYgEABhVEWsyskHV5YnvOS-c=/59x0:1317x708/1600x900/cdn0.vox-cdn.com/uploads/chorus_image/image/46016124/madmax.0.0.png",
                "http://images.mentalfloss.com/sites/default/files/pulpfiction.jpeg",
                "http://i.ytimg.com/vi/nAfKFy9ZgHQ/maxresdefault.jpg",
                "http://ecx.images-amazon.com/images/I/91-lvufbTjL._SL1500_.jpg",
                "https://chrisandelizabethwatchmovies.files.wordpress.com/2013/07/mdy45zlygl.jpg",
                "http://www.wearethemighty.com/wp-content/uploads/2015/03/Need_for_speed1.jpg",
                "http://wallpoper.com/images/00/26/83/41/paprika_00268341.jpg"];
  var bg = bgArray[Math.floor(Math.random() * bgArray.length)];
  $('body').css({'background-image': 'url(' + bg + ')'});

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
      $("#purchased-tickets-table").slideDown("slow");
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
