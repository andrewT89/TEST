import { Routes, RouterModule } from '@angular/router';

const pagesRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule)
  },
  {
    path: 'articles',
    loadChildren: () =>
      import('./articles/articles.module').then((m) => m.ArticlesModule)
  },
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);
