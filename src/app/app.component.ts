import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home-outline' },
    { title: 'Género', url: '/gender', icon: 'body-outline' },
    { title: 'Edad', url: '/age', icon: 'calendar-number-outline' },
    { title: 'Universidades', url: '/universities', icon: 'book-outline' },
    {
      title: 'Clima Dominicano',
      url: '/weather',
      icon: 'thunderstorm-outline',
    },
    {
      title: 'Contáctame',
      url: '/about-me',
      icon: 'send-outline',
    },
  ];
  constructor() {}
}
