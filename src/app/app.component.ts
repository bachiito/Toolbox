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
  ];
  constructor() {}
}
