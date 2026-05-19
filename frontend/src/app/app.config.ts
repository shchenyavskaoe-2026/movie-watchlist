  import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
  import { provideRouter, Routes } from '@angular/router';
  import { provideHttpClient, withFetch } from '@angular/common/http';

  import { Home } from './pages/home/home';
  import { Settings } from './pages/settings/settings';
  

  const routes: Routes = [
    { path: '', component: Home },
    { path: 'settings', component: Settings }
  ];


  export const appConfig: ApplicationConfig = {
    providers: [
      provideZonelessChangeDetection(),
      provideRouter(routes),
      provideHttpClient(withFetch())
    ]
  };