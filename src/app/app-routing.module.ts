import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppShellComponent, AppShellNoMenuComponent, AppShellSolidHeaderComponent } from '@kk/app-shell';
import { AuthGuard } from '@kk/core';
import { AdminPageComponent } from 'projects/admin/src/lib/pages/admin-page/admin-page.component';

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
    path: '',
    component: AppShellSolidHeaderComponent,
    children: [
      {
        path: 'services/:id',
        loadChildren: () => import('./loader-modules/page-loaders/service-page-loader.module')
          .then((mod) => mod.ServicePageLoaderModule)
      },
    ]
  },
  {
    path: 'admin',
    component: AppShellNoMenuComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: '',
        component: AdminPageComponent,
        children: [
          {
            path: '',
            loadChildren: () => import('./loader-modules/page-loaders/admin-pages/admin-dashboard-page-loader.module').then(m => m.AdminDashboardPageLoaderModule)
          },
          {
            path: 'invoices',
            loadChildren: () => import('./loader-modules/page-loaders/admin-pages/invoices-dashboard-loader.module').then(m => m.InvoicesDashboardComponentLoaderModule)
          },
          {
            path: 'invoice',
            loadChildren: () => import('./loader-modules/page-loaders/admin-pages/invoice-page-loader.module').then(m => m.InvoicePageComponentLoaderModule)
          },
          {
            path: 'messages',
            loadChildren: () => import('./loader-modules/page-loaders/admin-pages/admin-messages-page-loader.module').then(m => m.AdminMessagesPageLoaderModule)
          },
        ]
      },
      {
        path: 'login',
        loadChildren: () => import('./loader-modules/page-loaders/admin-pages/admin-login-page-loader.module').then(m => m.AdminLoginPageLoaderModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }

