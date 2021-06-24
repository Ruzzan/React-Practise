import React, {useState} from 'react'
import Navbar from './snippets/navbar'

const axios = require('axios').default;

const api = {
    key: "c6608c1f58e6c5e7dc86e014dd57b4e4",
    base: "https://api.openweathermap.org/data/2.5/",
    icon: "http://openweathermap.org/img/wn/",
}

const Weather = () => {
    document.title = "Weather";

    const [query, setQuery] = useState('');
    const [data, setData] = useState({});
    const [error, setError] = useState({})
    const [loading, setLoading] = useState(false);
    
    async function getWeather(event) {
        if(event.key === "Enter") {
        let url = `${api.base}weather?q=${query}&units=metric&APPID=${api.key}`
        try {
        setLoading(true);
            const response = await axios.get(url);
            setData(response.data);
            setError({})
            setQuery('')
            setLoading(false);
        }
        catch(err) {
            setLoading(true)
            setError(err.response)
            setData({})
            setLoading(false)
        }
    }
    }

    const getDateTime = () => {
        let months = ["Jan", "Feb", "Mar", "April", "May", "June", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

        let dateObj = new Date();

        let timeData = {
            month:months[dateObj.getMonth()],
            day:`${days[dateObj.getDay()]} ${dateObj.getDate()}`,
            time:dateObj.toLocaleString('np-Np',{ hour: 'numeric', minute: 'numeric', hour12: true }),
        }
        return timeData;
    }

    return (
        <section className={(data.main !== undefined) ?
        (data.main.temp >= 15) ? "warmStyle" : "coolStyle" : "warmStyle"}>
        <Navbar />
        <div className="container">
        <div className="row">
        <div className="col-md-5 mt-2 mx-auto">
        <input type="text" className="weather__input" placeholder="City or Location"
        onChange={(e)=>setQuery(e.target.value)}
        onKeyPress={getWeather} value={query}/>
        </div>
        </div>
        
        <div className="row mt-4">
        { loading ? 

        <div className="col-md-5 mx-auto">
        <div className="weather__container"><h4 className="load"> Loading </h4></div>
        </div>
        :

        <div className="col-md-5 mx-auto mb-2">
        
        { (typeof(error) !== "undefined") ? 
        ((error.status === 404) ? 
        <div className="weather__container"><h3 className="load"> No Location Found
        </h3></div> :
        null
        ) : null }

        { Object.keys(data).length !== 0  ? 

        <div className="weather__container">
        <h3 className="text-center text-light text-bold">{data.name}</h3>
        <div className="data">
        <span className="temp">{data.main.temp}&deg;C</span>
        <img src={`${api.icon}/${data.weather[0]['icon']}.png`} alt="icon"/>
        <span className="temp">{data.weather[0]['main']}</span>
        </div>
        <p className="text-center my-1" style={{color:"whitesmoke"}}>
        {getDateTime().day} {getDateTime().month}, {getDateTime().time} </p>
        </div>

        : null
        }
        </div>
    
    }

    </div>
    </div>
    </section>
    )
}

export default Weather;