import { AsyncPipe, NgIf } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

import { MemberCommentsComponent } from './member-comments/member-comments.component';
import { MemberInfoComponent } from './member-info/member-info.component';
import { MembersStore } from './member.store';

@Component({
  standalone: true,
  selector: 'higher-order-operators-member',
  templateUrl: './member.component.html',
  providers: [MembersStore],
  imports: [
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MemberCommentsComponent,
    MemberInfoComponent,
    NgIf,
    RouterModule,
  ],
})
export class MemberComponent {
  private readonly membersStore = inject(MembersStore);

  readonly viewModel$ = this.membersStore.viewModel$;

  @Input() set id(value: number | string | null) {
    this.membersStore.fetchMember(value);
  }
}
