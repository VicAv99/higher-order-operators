import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Member } from './member.model';
import { MembersDetailsComponent } from './members-details/members-details.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersService } from './members.service';

@Component({
  standalone: true,
  selector: 'higher-order-operators-members',
  templateUrl: './members.component.html',
  imports: [AsyncPipe, MembersDetailsComponent, MembersListComponent],
})
export class MembersComponent {
  membersService = inject(MembersService);
  members$ = this.membersService.all();
  selectedMember?: Member;

  selectMember(member: Member): void {
    this.selectedMember = member;
  }

  createMember(member: Member) {
    this.membersService.create(member).subscribe({
      next: () => {
        this.members$ = this.membersService.all();
      },
    });
  }

  updateMember(member: Member) {
    this.membersService.update(member).subscribe({
      next: () => {
        this.members$ = this.membersService.all();
      },
    });
  }

  deleteMember(member: Member) {
    this.membersService.delete(member.id).subscribe({
      next: () => {
        this.members$ = this.membersService.all();
      },
    });
  }
}
