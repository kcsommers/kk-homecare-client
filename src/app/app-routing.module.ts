import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent, AppShellNoMenuComponent } from '@kk/app-shell';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./loader-modules/page-loaders/home-page-loader.module')
          .then((mod) => mod.HomePageLoaderModule)
      },
      {
        path: 'about',
        loadChildren: () => import('./loader-modules/page-loaders/about-page-loader.module')
          .then((mod) => mod.AboutPageLoaderModule)
      },
      {
        path: 'services',
        loadChildren: () => import('./loader-modules/page-loaders/services-page-loader.module')
          .then((mod) => mod.ServicesPageLoaderModule)
      },
      {
        path: 'services/:id',
        loadChildren: () => import('./loader-modules/page-loaders/service-page-loader.module')
          .then((mod) => mod.ServicePageLoaderModule)
      },
      {
        path: 'photos',
        loadChildren: () => import('./loader-modules/page-loaders/photos-page-loader.module')
          .then((mod) => mod.PhotosPageLoaderModule)
      },
      {
        path: 'contact',
        loadChildren: () => import('./loader-modules/page-loaders/contact-page-loader.module')
          .then((mod) => mod.ContactPageLoaderModule)
      }
    ]
  },
  {
    path: 'admin',
    component: AppShellNoMenuComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./loader-modules/admin-loader.module').then(m => m.AdminLoaderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
