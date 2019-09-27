
var amounYouHave = document.getElementById("amount");
var priceDisplay = document.getElementById("eth-quote");
var btnRefresh = document.getElementById("refresh")
var exchange = document.getElementById("quote-calc")

var etherscanKey = "CK4PVXCF7G4E165XBE576895JUTAHJXK5V"
var getEtherLastPrice = `https://api.etherscan.io/api?module=stats&action=ethprice&apikey=${etherscanKey}`;

//  Refresh button listener
btnRefresh.addEventListener("click", refreshQuote)

// function to format number at Amount element to dollar style
document.getElementById("amount").addEventListener("blur", function () {
  var amount = document.getElementById("amount").value
  amount=Number(amount)
  console.log(amount)

  document.getElementById("amount").value = amount.toLocaleString(
  undefined, // leave undefined to use the browser's locale,
             // or use a string like 'en-US' to override it.
  { minimumFractionDigits: 2 }
);
})

// function fetch eth price
// https://api.etherscan.io/api?module=stats&action=ethprice&apikey=CK4PVXCF7G4E165XBE576895JUTAHJXK5V
function refreshQuote(e) {
  e.preventDefault();
  axios({
    url: getEtherLastPrice,
    method: 'get'
  })
  .then(function(response) {
    let lastPrice = response.data.result.ethusd;
    // var ethPrice = document.createElement("div");
    document.getElementById("eth-quote").innerHTML = lastPrice
    console.log(lastPrice)
  });
}
