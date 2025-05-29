const form = document.querySelector('.converter-form');
const amount = document.getElementById('amount');
const fromCurrency = document.getElementById('fromCurrency');
const convertedAmount = document.getElementById('convertedAmount');
const toCurrency = document.getElementById('toCurrency');
const loading = document.querySelector('.loading');
const result = document.querySelector('.result');
const error = document.querySelector('.error');
const converterBtn = document.querySelector('.converter-btn');
const API_URL = "https://api.exchangerate-api.com/v4/latest/";

async function converterMoney() {
    loading.style.display = 'block';
    converterBtn.style.display = 'none';

    try {
        
        const response = await fetch(API_URL + fromCurrency.value);
        const data = await response.json();

        const rate = data.rates[toCurrency.value];
        const convertedValue = (amount.value * rate).toFixed(2);

        convertedAmount.value = convertedValue;

        loading.style.display = 'none';

        result.style.display = 'block';
        result.innerHTML = `
            <div>
                ${amount.value} ${fromCurrency.value} = ${convertedAmount.value} ${toCurrency.value}
            </div>

            <div>
                Taxa 1 ${fromCurrency.value} = ${rate} ${toCurrency.value}
            </div>
        `;

        converterBtn.style.display = 'block';

    } catch (error) {
        alert("Falha ao acessar o servidor")
    }

}

form.addEventListener('submit', function(event) {
    event.preventDefault();
    converterMoney();
})