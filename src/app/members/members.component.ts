import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Member } from './member.model';
import { MembersDetailsComponent } from './members-details/members-details.component';
import { MembersListComponent } from './members-list/members-list.component';
import { MembersStore } from './members.store';

@Component({
  standalone: true,
  selector: 'higher-order-operators-members',
  templateUrl: './members.component.html',
  providers: [MembersStore],
  imports: [AsyncPipe, MembersDetailsComponent, MembersListComponent],
})
export class MembersComponent {
  private readonly membersStore = inject(MembersStore);

  members$ = this.membersStore.members$;
  selectedMember$ = this.membersStore.member$;

  constructor() {
    this.membersStore.fetchMembers();
  }

  selectMember(member: Member): void {
    this.membersStore.setMember(member);
  }

  createMember(member: Member): void {
    this.membersStore.createMember(member);
  }

  updateMember(member: Member): void {
    this.membersStore.updateMember(member);
  }

  deleteMember(member: Member): void {
    this.membersStore.deleteMember(member);
  }

  reset(): void {
    this.membersStore.clearMember();
  }
}
