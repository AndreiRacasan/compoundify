document.getElementById('data-form').addEventListener('submit', function(e){
  document.getElementById('results').style.display = 'none';
  document.getElementById('spinner').style.display = 'block';

  setTimeout(calcRes, 1500)

  e.preventDefault();
});


function calcRes() {
  const lumpSum = document.getElementById('lump-sum');
  const interestRate = document.getElementById('interest-rate');
  const yearsInvested = document.getElementById('years-invested');
  const result = document.getElementById('result');

  const calcSum = parseFloat(lumpSum.value);
  const calcInt = parseFloat(interestRate.value / 100);
  const calcYears = parseFloat(yearsInvested.value);
  const calcRes = parseFloat(calcSum * (Math.pow((1 + calcInt), calcYears)));

  let formatter = new Intl.NumberFormat('en-UK', {
    style: 'currency',
    currency: 'GBP',
  });

  
  if(isFinite(calcRes)) {
    result.innerHTML = "If you invest " + formatter.format(calcSum) + " at an interest rate of " + (calcInt * 100).toFixed() + "% for " + calcYears + " years, " + "you could earn " + formatter.format(calcRes.toFixed()) + " by the end of " + (new Date().getFullYear() + calcYears) + ".";
    lumpSum.value = '';
    interestRate.value = '';
    yearsInvested.value = '';
    document.getElementById('results').style.display = 'block';
    document.getElementById('spinner').style.display = 'none';
  } else {
    displayErr('Please check the inputted numbers and try again...')
  }
}

function displayErr(err){
  document.getElementById('results').style.display = 'none';
  document.getElementById('spinner').style.display = 'none';

  const errDiv = document.createElement('div');
  const cardDiv = document.querySelector('.card');
  const heading = document.querySelector('.heading');

  errDiv.className = 'alert alert-danger';
  errDiv.appendChild(document.createTextNode(err));

  cardDiv.insertBefore(errDiv, heading)

  setTimeout(clearErr, 2000);
}

function clearErr() {
  document.querySelector('.alert').remove();
}