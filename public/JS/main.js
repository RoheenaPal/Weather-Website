const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const city_name = document.getElementById('city_name');
const temp_status = document.getElementById('temp_status');
const temp_real_val = document.getElementById('temp_real_val');

const dataHide = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal === ""){
        city_name.innerText = `Please write the name before your search`;
        dataHide.classList.add('data_hide');
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=07bf44ac26195ba012e89cc905967dc3`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const getCurrentDay = () => {
                let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                
                let currentTime = new Date();
                // var offset = currentTime.getTimezoneOffset();
                // console.log(offset);

                let days = weekday[currentTime.getUTCDay()];
                let day = document.getElementById('day');
    
                day.innerText = days;
            };
    
            getCurrentDay();
    
            const getCurrentTime = () => {
                let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    
                var now = new Date();
                // console.log(now);
                var month = months[now.getUTCMonth()];
                var date = now.getUTCDate();
                // console.log(date)
                var time_modify = arrData[0].timezone;
                // console.log(now.getUTCHours())
                let hours = Math.floor(now.getUTCHours() + (time_modify / 3600));
                // console.log(hours)
                let mins = Math.floor(now.getUTCMinutes() + ((time_modify % 3600) / 60));
    
                let period = "AM"
                if(hours < 0){
                    hours = 24 + hours;
                    // console.log(new Date().getUTCDay());
                    let days = new Date().getUTCDay();
                    let day = document.getElementById('day');
                    date -= 1;
                    if(days > 0){
                        day.innerText = weekday[days - 1];
                    }
                    else{
                        day.innerText = "Saturday";
                    }
                }
                // console.log(hours)
                if(hours > 11){
                    period = "PM";
                    if(hours > 12){
                        hours -= 12;
                    }
                }
                if(hours == 0){
                    hours = 12;
                }
    
                if(mins < 10){
                    mins = "0" + mins;
                }
                let date_today = document.getElementById('todayDate')
    
                date_today.innerText = `${month} ${date} | ${hours}:${mins}${period}` 
            };
    
            getCurrentTime();


            const tempMood = arrData[0].weather[0].main;
            // console.log(tempMood);

            if(tempMood == "Clear"){
                temp_status.innerHTML = 
                    "<i class='fas fa-sun' style='color: #eccc68;></i>"
            } else if(tempMood == "Clouds"){
                temp_status.innerHTML = 
                    "<i class='fa fa-cloud' style='color: #f1f2f6; aria-hidden='true'></i>"
            } else if(tempMood == "Rain"){
                temp_status.innerHTML = 
                    "<i class='fa fa-cloud-rain' style='color: #a4b0be;></i>"
            } else{
                temp_status.innerHTML = 
                    "<i class='fa fa-cloud' style='color: #f1f2f6; aria-hidden='true'></i>"
            }
            dataHide.classList.remove('data_hide');
            // console.log(data);
        }
        catch{
            city_name.innerText = `Please enter the city name properly`;
            dataHide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);