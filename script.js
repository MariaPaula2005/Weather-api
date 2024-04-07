document.addEventListener('DOMContentLoaded', function () {
    var input = document.querySelector('.search-bar');
    var main = document.querySelector('.name');
    var temp = document.querySelector('.temperature');
    var desc = document.querySelector('.description');
    var icon = document.querySelector('.img');
    var button = document.querySelector('.submit');

    button.addEventListener('click', function () {
        fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=50a7aa80fa492fa92e874d23ad061374')
            .then(response => response.json())
            .then(data => {
                var tempValueKelvin = data['main']['temp'];
                var nameValue = data['name'];
                var descValue = data['weather'][0]['description'];
                var iconCode = data['weather'][0]['icon'];

                var tempValueCelsius = tempValueKelvin - 273.15; 
                var tempValueFahrenheit = (tempValueKelvin - 273.15) * 9/5 + 32; 

                main.textContent = nameValue;
                desc.textContent = descValue;
                temp.textContent = tempValueCelsius.toFixed(2) + "°C / " + tempValueFahrenheit.toFixed(2) + "°F";
                icon.setAttribute('src', 'http://openweathermap.org/img/wn/' + iconCode + '.png');
                input.value = "";
            })
            .catch(err => {
                console.log(err);
                alert("Wrong city name!");
            });
    });
});
