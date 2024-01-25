const error = document.querySelector(".error");
const temperature = document.querySelector(".temp");
const EstadoEpais = document.querySelector(".country");
const desc = document.querySelector(".desc");
const feelsLike = document.querySelector(".feels-like");
const local = document.getElementById("humidity");
const vento = document.getElementById("speed");
const search = document.getElementById("search");
const btn = document.getElementById("btn");
const main = document.querySelector(".main");
const weatherIcon = document.getElementById("weather-icon");
const middle = document.querySelector(".middle");
const bottom = document.querySelector(".bottom");
const col = document.querySelectorAll(".col");
const weatherDetails = document.querySelectorAll(".weather-details span");
const celsius = document.querySelector(".celsius .temp")

// const OnError = (element, text) =>{
//     element.textContent = text;
//     element.classList.add("active");
// }

    // function OnError(text) {
    //   error.textContent = text;
    //   error.classList.add("active");  
    // }

        const OnError = (text) =>{
            error.textContent = text;
            error.classList.add("active");
        }
        const onSucces = (text) =>{
            error.textContent = text;
            error.classList.remove("active");
            
        }

const apikey = "52bfbf5b22136143d34e66b859db733b";
 
// calling weather api

const apiRequest = async (city)=>{
    try {

        const API = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&lang=pt&appid=${apikey}`;
        const response = await fetch(API);
        if (response.status === 404) {
    
            // error.textContent = "Digite um local válido"
            // error.style.display = "block";

            // OnError(error, "Digite um local válido");
            OnError("Digite um local válido");
         return
        } else{
            const data = await response.json();
            getWeatherDetails(data);
            onSucces();

            console.log(data);
            console.log(response);
        }
    

    } catch (error) {
        OnError("Algo deu errado, tente mais tarde");
        console.log(error);
    }
}


const getWeatherDetails = (data) =>{
    const {name} = data;
    const {country} = (data.sys);
    const {temp, feels_like, humidity} = data.main;
    const {description,id} = data.weather[0];
    const {speed} = data.wind;


    temperature.textContent = `${Math.floor(temp)}°C`;
    EstadoEpais.textContent = `${name}, ${convertCountryCode(country)}`;
    desc.textContent = `${description}`;
    feelsLike.textContent = `Sensação térmica ${Math.round(feels_like)}° C`;
    local.textContent = `${humidity}%`;
    vento.textContent = `${Math.round(speed)}km/h`;

      main.style.height = "460px";
      middle.style.height = "357px";
//    weatherIcon.style.height = "320px";
      bottom.style.height = "90px";
      
      col.forEach(element => {
      element.style.fontSize = "18px"
      });

      weatherDetails.forEach(element => {
      element.style.fontSize = "22px"
      });

      celsius.style.fontSize = "70px"
      weatherIcon.style.height = "400px";
      weatherIcon.style.marginBottom = "16px";
  
      if (id >= 200 && id<= 232) weatherIcon.src = "/icones/thunder.svg";
      else if(id >= 300 && id<= 321) weatherIcon.src = "/icones/rainy-2.svg";
      else if(id >= 500 && id<= 531) weatherIcon.src = "/icones/rainy-1.svg";
      else if(id >= 600 && id<= 622) weatherIcon.src = "/icones/snowy.svg";
      else if(id >= 701 && id<= 781) weatherIcon.src = "/icones/cloudy-day-1.svg";
      else if(id === 800) weatherIcon.src = "/icones/day.svg";
      else if(id >= 801 && id<= 804) weatherIcon.src = "/icones/cloudy-day-3.svg";



}

/*btn.addEventListener("click", () =>{
    apiRequest(search.value);
 })
*/

btn.addEventListener("click", ()=>{
    if (search.value !== "") {
        apiRequest(search.value);
    } else{
        OnError("Digite o nome de uma cidade");
    }
})

search.addEventListener("keydown", (e)=>{
    if(e.key === 'Enter' && search.value !== ""){
        apiRequest(search.value);
    } else if(e.key === 'Enter' && search.value === ""){
        OnError("Digite o nome de uma cidade");
    }
});


//converter código do páis para o nome completo
function convertCountryCode(country) {
    let regionNames = new Intl.DisplayNames(["pt"], {type: "region"});
    return regionNames.of(country);
}


//se o evento não funcionar dá pra usar callback
// search.addEventListener('keydown', keyDown);

// function keyDown(e){
//     console.log(e.key);
// }



// apiRequest("Rio de Janeiro");