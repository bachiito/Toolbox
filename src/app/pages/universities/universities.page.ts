import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-universities',
  templateUrl: './universities.page.html',
  styleUrls: ['./universities.page.scss'],
})
export class UniversitiesPage implements OnInit {
  country: string = '';

  constructor() {}

  ngOnInit() {}

  onSubmitTemplate() {
    this.listUniversities(this.country);
  }

  async listUniversities(country: string) {
    try {
      let universityHTML = '';
      const cardsArticle = document.querySelector('article#cards');

      if (cardsArticle) {
        cardsArticle.innerHTML = '';
      }

      const response = await this.callUniversitiesApi(country);
      if (!response.ok) throw new Error('Bad response');

      const universitiesData = await response.json();

      if (!universitiesData || universitiesData.length === 0) {
        const alert = `
        <ion-text color="danger" class="ion-text-center">
          <p>País no registrado.</p>
        </ion-text>
        `;

        cardsArticle?.insertAdjacentHTML('afterbegin', alert);
        cardsArticle?.classList.remove('ion-hide');
        return;
      }

      universitiesData.forEach((university: any) => {
        let universityWebPagesHTML = '';
        const universityDomains = university.domains;
        const universityWebPages = university.web_pages;

        universityWebPages.forEach((page: string[]) => {
          universityWebPagesHTML += `
          <p>
            <strong>Página Web</strong>:
            <a href="${page}" target="_blank" rel="noopener noreferrer">
              ${university.name}  
            </a>
          </p>
          `;
        });

        universityHTML += `
        <ion-card class="ion-no-margin ion-margin-vertical">
          <ion-card-header>
            <ion-card-title>${university.name}</ion-card-title>
            <ion-card-subtitle>
              ${university.country}
            </ion-card-subtitle>
          </ion-card-header>
      
          <ion-card-content>
            <p><strong>Dominio</strong>: ${universityDomains.join(', ')}</p>
            ${universityWebPagesHTML}
          </ion-card-content>
        </ion-card>
      `;
      });

      cardsArticle?.insertAdjacentHTML('afterbegin', universityHTML);
      cardsArticle?.classList.remove('ion-hide');
    } catch (error) {
      console.error(error);
    }
  }

  callUniversitiesApi(country: string) {
    return fetch(`http://universities.hipolabs.com/search?country=${country}`);
  }
}
