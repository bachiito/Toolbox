import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },

  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'gender',
    loadChildren: () =>
      import('./pages/gender/gender.module').then((m) => m.GenderPageModule),
  },
  {
    path: 'age',
    loadChildren: () =>
      import('./pages/age/age.module').then((m) => m.AgePageModule),
  },
  {
    path: 'universities',
    loadChildren: () =>
      import('./pages/universities/universities.module').then(
        (m) => m.UniversitiesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
