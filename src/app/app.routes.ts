import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'members',
    loadComponent: () =>
      import('./members/members.component').then((m) => m.MembersComponent),
  },
  {
    path: '**',
    redirectTo: '/members',
  },
];
