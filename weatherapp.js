const apikey="e2050220c44e86b158a2ae59ed406ec8";
const weatherdatae1=document.getElementById("weather-data");
const cityinpute1=document.getElementById("city-input");
const forme1=document.querySelector("form");


forme1.addEventListener("submit",(event)=>{
    event.preventDefault();
    const cityvalue  =cityinpute1.value;
    console.log(cityvalue);
    getweatherdata(cityvalue);

});
async function getweatherdata(cityvalue){
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityvalue}&appid=${apikey}&units=metric`);
        if(!response.ok){
            throw new error("network response was not ok")
        }
        const data=await response.json()
        // console.log(data);
        const temperature =Math.round(data.main.temp);
        const description =data.weather[0].description;
        const icon =data.weather[0].icon;
        const details =[
            `Feels like: ${Math.round(data.main.feels_like)}°C`,
            `Humadity: ${data.main.humidity}%`,
            `wind speed: ${data.wind.speed}m/s`
        ]
        weatherdatae1.querySelector(".icon").innerHTML=` <img src="http://openweathermap.org/img/wn/${icon}.png" alt="">`
        weatherdatae1.querySelector(".temperature").textContent=`${temperature}°C`;
        weatherdatae1.querySelector(".description").textContent=`${description}`;
        weatherdatae1.querySelector(".details").innerHTML= details.map((detail)=>`<div>${detail}</div>`)
        .join("");
    }
     catch(error){
        
        weatherdatae1.querySelector(".icon").innerHTML="";
        weatherdatae1.querySelector(".temperature").textContent="";
        weatherdatae1.querySelector(".description").textContent="AN Error occured, please try Again";
        weatherdatae1.querySelector(".details").innerHTML= "";

    }
}