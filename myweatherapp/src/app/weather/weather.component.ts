import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  myWeather: any;
  temperature: number = 0;
  feelsLikeTemp: number = 0;
  humidity: number = 0;
  pressure: number = 0;
  summary: string = '';
  iconURL: string = '';
  city: string = '';
  units: string = 'imperial';

  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.getWeather();
  }

  getWeather() {
    this.weatherService.getweather(this.city, this.units).subscribe({
      next: (res) => {
        this.myWeather = res;
        this.updateWeatherData();
      },
      error: (error) => console.log(error.message),
      complete: () => console.info('API call completed')
    });
  }

  updateWeatherData() {
    this.temperature = this.myWeather.main.temp;
    this.feelsLikeTemp = this.myWeather.main.feels_like;
    this.humidity = this.myWeather.main.humidity;
    this.pressure = this.myWeather.main.pressure;
    this.summary = this.myWeather.weather[0].main;
    this.iconURL = 'https://openweathermap.org/img/wn/' + this.myWeather.weather[0].icon + '.png';
  }

  onRadioButtonChange() {
    this.toggleUnits();
    this.getWeather();
  }

  toggleUnits() {
    this.units = this.units === 'imperial' ? 'metric' : 'imperial';
    // Convert temperature and feelsLikeTemp when toggling units
    if (this.units === 'metric') {
      this.temperature = this.convertToFahrenheit(this.temperature);
      this.feelsLikeTemp = this.convertToFahrenheit(this.feelsLikeTemp);
    } else {
      this.temperature = this.convertToCelsius(this.temperature);
      this.feelsLikeTemp = this.convertToCelsius(this.feelsLikeTemp);
    }
  }

  convertToFahrenheit(celsius: number): number {
    return (celsius * 9/5) + 32;
  }

  convertToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5/9;
  }
}
