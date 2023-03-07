import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.page.html',
  styleUrls: ['./weather.page.scss'],
})
export class WeatherPage implements OnInit {
  time: string = '';
  temperature: string = '';
  minTemperature: string = '';
  maxTemperature: string = '';
  weatherCondition: string = '';

  constructor() {}

  ngOnInit() {
    this.displayWeather();
  }

  async displayWeather() {
    const response = await this.getDominicanWeather();
    if (!response.ok) throw new Error('Bad response from weather API');

    const data = await response.json();
    const dailyWeather = data.daily;
    const currentWeather = data.current_weather;
    const weatherCode = currentWeather.weathercode;
    this.temperature = `${currentWeather.temperature}° C`;
    this.maxTemperature = `${dailyWeather.apparent_temperature_max[0]}°`;
    this.minTemperature = `${dailyWeather.apparent_temperature_min[0]}°`;
    this.time = new Date().toLocaleString().split(', ')[1]; // 3:12:08 PM

    const content = document.querySelector('ion-content#weather-content');

    content?.childNodes.forEach((child) => {
      if (child instanceof Element && child.tagName === 'IMG')
        content.removeChild(child);
    });

    const img = document.createElement('img');
    img.setAttribute(
      'style',
      ' width: 50%; display: block; margin-inline: auto'
    );

    switch (true) {
      case weatherCode <= 1:
        img.setAttribute('src', '../../../assets/images/sun.svg');
        img.setAttribute('alt', 'Cielo despejado');
        this.weatherCondition = 'Cielo despejado';
        break;

      case weatherCode === 2:
        img.setAttribute('src', '../../../assets/images/cloud-sun.svg');
        img.setAttribute('alt', 'Cielo parcialmente nublado');
        this.weatherCondition = 'Cielo parcialmente nublado';
        break;

      case weatherCode === 3:
        img.setAttribute('src', '../../../assets/images/cloud.svg');
        img.setAttribute('alt', 'Cielo nublado');
        this.weatherCondition = 'Cielo nublado';
        break;

      case weatherCode === 45 || weatherCode === 48:
        img.setAttribute('src', '../../../assets/images/smog.svg');
        img.setAttribute('alt', 'LLovizna suave');
        this.weatherCondition = 'Llovizna suave';
        break;

      case (weatherCode >= 51 && weatherCode <= 67) ||
        (weatherCode >= 80 && weatherCode <= 82):
        img.setAttribute(
          'src',
          '../../../assets/images/cloud-showers-heavy.svg'
        );
        img.setAttribute('alt', 'Lluvia');
        this.weatherCondition = 'Lluvia constante';
        break;

      case weatherCode >= 71 && weatherCode <= 86:
        img.setAttribute('src', '../../../assets/images/snowflake.svg');
        img.setAttribute('alt', 'Nevada');
        this.weatherCondition = 'Nevada';
        break;

      case weatherCode > 90:
        img.setAttribute('src', '../../../assets/images/cloud-bolt.svg');
        img.setAttribute('alt', 'Tormenta Eléctrica');
        this.weatherCondition = 'Tormenta Eléctrica';
        break;

      default:
        img.setAttribute(
          'src',
          'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAjdJREFUeNrtmsGtgzAMhjtCRmAERsgIHYFjjx2BERiBEToCI+TaG2+DbJBnKj8pD1Eaiv8AwpX+C1Ap/hzHjpNLCOFyZl0UgAJQAApAASgABaAAFIACODEA9C/83AypIrUkRwpv5Pib4dsCNp5cAMgIS3rMGPxJw3/t4QDQoEtSt8LwsTpJEFAAAONjNUM4HSIEOO7vJC8Mwa2FkHURZBDSM2KAWu4CwPP5LEgtyZMCy/OzIgKBgGA2BUAGliPDxxreldFM2EU4JAOgwRtSPeHdmj0/Z3z8fcEQasTCiATgEgxMURvNAkR2sOIA2MtBSH60KNbC4dAhAHhBACFDdrBiADj2A0DI7PA4AgB0dihWAaBBXUk92Hhkdqi+BsDGh8ySzg7tGgD9BgC88FrgvgKQIeY/ZgepxXB3m6EFm6bm7ADqQwDggSLUHQVA2KG6P50JQJ+a96UBuC08OwqRerOWGPftkUa7Oc/GrTBKo5b0mEivwzOLAlABjb8v6EY1CXVGgwCAampUqZ5NNP5fuS1aB6w87Zn1PG+XpStOKw3AIro5IONfM0e8EhRsZFxz7EYRACRmgQc0YPMAENrAdJk6UBgAKwojz/W/yQUgXgilARguS5dUd2Yir+foPzSQ7TAfifdLOjZvzhSzQID0A3gmuJTDzIQzRXg4IC9IvFsY68jzWxr/qgvQV2TsRJ1gwMXOIuW+JNWhjtx2DWCDE6fvAOhNUQWgABSAAlAACkABKAAFoABOp1+6Bd0LJ+BorgAAAABJRU5ErkJggg=='
        );
    }

    content?.insertAdjacentElement('afterbegin', img);
  }

  getDominicanWeather() {
    return fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=19.00&longitude=70.67&current_weather=true&daily=weathercode,temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min&timezone=America%2FSanto_Domingo'
    );
  }
}
