import { Component, OnInit } from '@angular/core';
import { Root } from './model/weatherData.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'weather_app';
  
  cityName : string = ''
  myweatherData!: Root;
  // weatherData : any
  WeatherData: any;
  showWeatherData : boolean = false
  constructor(){}


  ngOnInit(): void {
    this.getWeatherData(this.cityName);
    this.cityName = '';
    this.WeatherData = {
      main : {},
    };
    console.log(this.WeatherData.temp_celcius)
  }

  onSubmit() {
    this.getWeatherData(this.cityName);
    this.cityName = '';
    }


    getWeatherData(cityName:string){
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=ff1bc4683fc7325e9c57e586c20cc03e`)
      .then(response=>response.json())
      .then(data=>{this.setWeatherData(data);})
}

setWeatherData(data: Root){
  this.WeatherData = data;
  let sunsetTime = new Date(this.WeatherData.sys.sunset * 1000);
  this.WeatherData.sunset_time = sunsetTime.toLocaleTimeString();
  let currentDate = new Date();
  this.WeatherData.isDay = (currentDate.getTime() < sunsetTime.getTime());
  this.WeatherData.temp_celcius = (this.WeatherData.main.temp - 273.15).toFixed();
  this.WeatherData.temp_min = (this.WeatherData.main.temp_min - 273.15).toFixed();
  this.WeatherData.temp_max = (this.WeatherData.main.temp_max - 273.15).toFixed();
  this.WeatherData.temp_feels_like = (this.WeatherData.main.feels_like - 273.15).toFixed();
  this.showWeatherData = true
}
}
