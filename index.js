const bodyParser = require('body-parser');
const request = require('request');
const express = require('express');

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));


app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000");
});



app.get('/api/rates', function(req, res){
  var base = req.query.base.toUpperCase();
  var currency = req.query.currency.toUpperCase();

  var baseURL = 'https://api.exchangeratesapi.io/latest';
  var finalURL = baseURL+`?base=${base}&symbols=${currency}`;

  request(finalURL, function(error, response, body){
    // if(error){
    //   return console.error('Error Occured', error);
    // } else {
      var data = JSON.parse(body);
      var results = {
        base: data.base,
        date: data.date,
        rates: data.rates
      }
      var exchangeRates = {results: results}
      res.send(exchangeRates);
    // }
  })
});
