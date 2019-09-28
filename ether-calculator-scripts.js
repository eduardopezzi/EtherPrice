
var amountYouHave = document.getElementById("amount");
var priceDisplay = document.getElementById("eth-quote");
var btnRefresh = document.getElementById("refresh")
var exchange = document.getElementById("quote-calc")
var amount=0

var etherscanKey = "CK4PVXCF7G4E165XBE576895JUTAHJXK5V"
var getEtherLastPrice = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscanKey}`;

//  Refresh button listener
btnRefresh.addEventListener("click", refreshQuote)

// load page with ETH price
window.onload = refreshQuote

// function to format number at Amount element to dollar style
amountYouHave.addEventListener("blur", function () {
    window.amount = amountYouHave.value
    amount=Number(amount)
    amountYouHave.value = amount.toLocaleString(
  undefined, // leave undefined to use the browser's locale,
             // or use a string like 'en-US' to override it.
  { minimumFractionDigits: 2 }
  );
  ExchangeCalc()
})

// function fetch eth price and update refresh date
// https://api.etherscan.io/api?module=stats&action=ethprice&apikey=CK4PVXCF7G4E165XBE576895JUTAHJXK5V
function refreshQuote(e) {
  e.preventDefault();
  axios({
    url: getEtherLastPrice,
    method: 'get'
  })
   .then(function(response) {
     window.lastPrice = response.data.result.ethusd;
     priceDisplay.innerHTML = lastPrice
     ExchangeCalc()
  })
  .then(function updateTime(){
    var currentTime = new Date()
    var hours = currentTime.getHours()
    var minutes = currentTime.getMinutes()
    if (minutes < 10){
        minutes = "0" + minutes
    }
    var t_str = hours + ":" + minutes + " ";
    if(hours > 11){
        t_str += "PM";
    } else {
        t_str += "AM";
    }
    document.getElementById('lastUpdate').innerHTML = t_str;
  })
};

function ExchangeCalc () {
  myMoney = window.amount
  lastQuote = window.lastPrice
  calc = myMoney/lastQuote
  calc = calc.toFixed(2)
  exchange.innerHTML = calc
  console.log(calc)
}
