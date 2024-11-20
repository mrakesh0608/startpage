"use server";

const OPEN_WEATHER_API_KEY = process.env.NEXT_PUBLIC_OPEN_WEATHER_API_KEY!;

export async function getWeather(city: string) {
    const params = new URLSearchParams({
        q: city,
        appid: OPEN_WEATHER_API_KEY,
        units: "metric",
    });

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?${params}`);

    const json = await res.json();

    return {
        city: json.name + ", " + json.sys.country,
        temp: Math.round(json.main.temp),
        hum: json.main.humidity + "%",
        wind: json.wind.speed + "m/s",
        image: "http://openweathermap.org/img/wn/" + json.weather[0].icon + "@2x.png",
        desc: json.weather[0].description,
    };
}
