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
            console.log(arrData);

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;

            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

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
            console.log(data);
        }
        catch{
            city_name.innerText = `Please enter the city name properly`;
            dataHide.classList.add('data_hide');
        }
    }
}

submitBtn.addEventListener('click', getInfo);