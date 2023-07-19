import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Member } from './member.model';
import { MembersDetailsComponent } from './members-details/members-details.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersService } from './members.service';

@Component({
  selector: 'higher-order-operators-members',
  standalone: true,
  imports: [AsyncPipe, MembersDetailsComponent, MembersListComponent],
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent {
  membersService = inject(MembersService);
  members$ = this.membersService.all();
  selectedMember?: Member;

  selectMember(member: Member): void {
    this.selectedMember = member;
  }
}
