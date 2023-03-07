import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gender',
  templateUrl: './gender.page.html',
  styleUrls: ['./gender.page.scss'],
})
export class GenderPage implements OnInit {
  name: string = '';
  gender: string = '';

  constructor() {}

  ngOnInit() {}

  onSubmitTemplate() {
    this.callGenderAPI(this.name);
  }

  callGenderAPI(name: string) {
    fetch(`https://api.genderize.io?name=${name}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          return 'Bad response';
        }
      })
      .then((data) => {
        if (!data.gender) {
          this.gender = 'Nombre no registrado.';
          return;
        }

        this.gender = data.gender;
        this.displayGender();
      });
  }

  displayGender() {
    if (!this.gender) return;

    if (this.gender === 'male') this.gender = 'Masculino 👮‍♂️';
    if (this.gender === 'female') this.gender = 'Femenino 💃';
  }
}
