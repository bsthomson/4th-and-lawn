var nodemailer = require('nodemailer');
var sendEmail = function() {
   var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'welch.charlie16@gmail.com',
      pass: 'lakerat45'
    }
  });
  var name = "Charlie";
  var address = "45 Beach Dr. Lake Tapawingo, MO 64015";
  var date = "October 3rd, 2018";
  var time = "6:30am";
  var directions = "White house with gravel driveway on the lake side of the street";
  var ownerNumber = "(816)462-3289"

  var subject = "4th and Lawn Reservation Confirmation";
  var congrats ="<h1>Congrats " + name + "! Your Reservation Was Successful</h1><br>" + 
  "<h3>You reserved a spot at " + address + " on " + date + " at " + time + "</h3><br>" + 
  "<h3>" + directions + "</h3><br>" + 
  "<h3>Owners Phone Number: " + ownerNumber + "</h3>";

function sendEmail(to, subject, congrats) {
  const mailOptions = {
    from: 'welch.charlie16@gmail.com',
    to: 'cmw24400@ucmo.edu',
    subject: subject,
    html: congrats
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
}
 
  
// }

