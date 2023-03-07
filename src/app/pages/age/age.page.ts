import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-age',
  templateUrl: './age.page.html',
  styleUrls: ['./age.page.scss'],
})
export class AgePage implements OnInit {
  name: string = '';
  ageRange: string = '';
  ageDescription: string = '';
  personInfo: string = '';

  constructor() {}

  ngOnInit() {}

  onSubmitTemplate() {
    this.callAgeApi(this.name);
  }

  callAgeApi(name: string) {
    fetch(`https://api.agify.io/?name=${name}`)
      .then((res) => {
        if (!res.ok) return 'Bad response';
        return res.json();
      })
      .then((data) => {
        const errorEl = document.querySelector('#error');
        const card = document.querySelector('ion-card');

        if (!data.age) {
          errorEl?.classList.remove('ion-hide');
          card?.classList.add('ion-hide');
          return;
        }

        errorEl?.classList.add('ion-hide');
        card?.classList.remove('ion-hide');

        this.displayAge(data.age);
      });
  }

  displayAge(edad: number) {
    const card = document.querySelector('ion-card');

    const ageRanges = {
      childhood: {
        min: 0,
        max: 11,
        title: 'Niñez',
        description: `Periodo de la vida humana que va desde el nacimiento 
          hasta los 12 años aproximadamente.`,
      },

      adolescence: {
        min: 12,
        max: 17,
        title: 'Adolescencia',
        description: `Etapa del desarrollo humano que se produce entre la niñez
          y la edad adulta. Se caracteriza por cambios físicos, emocionales y 
          sociales significativos. Durante la adolescencia, las personas 
          experimentan cambios hormonales y físicos que pueden afectar su
          autoimagen y autoestima. Además, suelen empezar a explorar su 
          identidad, a desarrollar sus intereses y a establecer relaciones 
          interpersonales más complejas. La adolescencia es una etapa de
          transición en la que las personas se preparan para enfrentar los
          desafíos y responsabilidades de la edad adulta.`,
      },

      youth: {
        min: 18,
        max: 29,
        title: 'Juventud',
        description: `Etapa de la vida que se caracteriza por la vitalidad, la
         energía y la búsqueda de experiencias nuevas,`,
      },

      adulthood: {
        min: 30,
        max: 59,
        title: 'Adultez',
        description: `Etapa de la vida que se caracteriza por la madurez y la
          estabilidad emocional, personal y profesional. Durante esta etapa,
          las personas suelen haber alcanzado ciertos hitos y logros en su vida,
          como la independencia financiera, la formación de una familia y la
          consolidación de una carrera profesional.`,
      },

      oldAge: {
        min: 60,
        max: 999,
        title: 'Vejez',
        description: `Etapa de la vida, que se caracteriza por la disminución 
          de la capacidad física y cognitiva, y el aumento de la vulnerabilidad
          a enfermedades y aislamiento social.`,
      },
    };

    card?.childNodes.forEach((child) => {
      if (child instanceof Element && child.tagName === 'ION-IMG')
        card?.removeChild(child);
    });

    const image = document.createElement('ion-img');
    this.personInfo = `${this.name}, edad ${edad}`;

    if (edad < ageRanges.childhood.max) {
      image.src =
        'https://www.hallmark.com/dw/image/v2/AALB_PRD/on/demandware.static/-/Sites-hallmark-master/default/dwb9a21f08/images/finished-goods/products/1BBY4793/Welcome-Baby-Recordable-Teddy-Bear-Plush_1BBY4793_01.jpg?sw=512&sh=512&sm=fit';
      this.ageRange = ageRanges.childhood.title;
      this.ageDescription = ageRanges.childhood.description;
      card?.insertAdjacentElement('afterbegin', image);
      card?.classList.remove('ion-hide');
      return;
    }

    if (edad < ageRanges.adolescence.max) {
      image.src =
        'https://ichef.bbci.co.uk/news/976/cpsprodpb/11252/production/_99662207_gettyimages-644990988-1.jpg';
      this.ageRange = ageRanges.adolescence.title;
      this.ageDescription = ageRanges.adolescence.description;
      card?.insertAdjacentElement('afterbegin', image);
      card?.classList.remove('ion-hide');
      return;
    }

    if (edad < ageRanges.youth.max) {
      image.src =
        'https://www.unesco.org/sites/default/files/styles/best_image/public/2022-07/main_intyouthday_1900px.jpg?itok=mYYpikxn';
      this.ageRange = ageRanges.youth.title;
      this.ageDescription = ageRanges.youth.description;
      card?.insertAdjacentElement('afterbegin', image);
      card?.classList.remove('ion-hide');
      return;
    }

    if (edad < ageRanges.adulthood.max) {
      image.src =
        'https://www.focusonthefamily.com/wp-content/uploads/2021/04/HelpingTeensTransitionToAdulthood_SliderFriendly-1024x576.png';
      this.ageRange = ageRanges.adulthood.title;
      this.ageDescription = ageRanges.adulthood.description;
      card?.insertAdjacentElement('afterbegin', image);
      card?.classList.remove('ion-hide');
      return;
    }

    image.src =
      'https://www.thestatesman.com/wp-content/uploads/2021/01/iStock-1205057589.jpg';
    this.ageRange = ageRanges.oldAge.title;
    this.ageDescription = ageRanges.oldAge.description;
    card?.insertAdjacentElement('afterbegin', image);
    card?.classList.remove('ion-hide');
  }
}
