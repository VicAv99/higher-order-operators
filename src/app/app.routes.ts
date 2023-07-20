import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'members',
    loadComponent: () =>
      import('./members/members.component').then((m) => m.MembersComponent),
  },
  {
    path: 'member/:id',
    loadComponent: () =>
      import('./member/member.component').then((m) => m.MemberComponent),
  },
  {
    path: '**',
    redirectTo: '/members',
  },
];
