let url = 'https://openexchangerates.org/api/',
    apiKey = '7fa3556ea5804da58697a66074759fac',
    currency = 'currencies.json',
    latest = 'latest.json';

window.onload = function() {
    let fromName = document.getElementById('cur-from-name');
    let fromValue = document.getElementById('cur-from-value');
    let toName = document.getElementById('cur-to-name');
    let toValue = document.getElementById('cur-to-value');
    
    let convertButton = document.getElementById('cur-convert');

    fetch(url + currency + '?app_id=' + apiKey)
        .then(data => data.json())
        .then(obj => {
            let arr = [];
            for (let key in obj) {
                arr.push(`<option value=${key} ${(key === 'INR') ? 'selected' : ''}>[${key}] ${obj[key]}</option>`);
            }
            let html = arr.join('');
            fromName.innerHTML = html;
            toName.innerHTML = html;
        })
        .catch(err => console.log(err));

    convertButton.addEventListener('click', () => {
       

        fetch(url + latest + '?app_id=' + apiKey)
            .then(data => data.json())
            .then(obj => {
                let x = obj.rates[fromName.value],
                    y = obj.rates[toName.value];
                toValue.value = (fromValue.value * y) / x;

            })
            .catch(err => {
                alert('Api Call Was Faliure.');
                console.log('error: ' + err);
            });
    });

    
}
