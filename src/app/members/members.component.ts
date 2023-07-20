import { AsyncPipe, NgIf } from '@angular/common';
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
  imports: [AsyncPipe, MembersDetailsComponent, MembersListComponent, NgIf],
})
export class MembersComponent {
  private readonly membersStore = inject(MembersStore);

  viewModel$ = this.membersStore.viewModel$;

  constructor() {
    this.membersStore.fetchMembers();
  }

  selectMember(member: Member): void {
    this.membersStore.setMember(member);
  }

  searchMembers(searchText: string): void {
    this.membersStore.searchMembers(searchText);
  }

  saveMember(member: Member): void {
    this.membersStore.saveMember(member);
  }

  deleteMember(member: Member): void {
    this.membersStore.deleteMember(member);
  }

  reset(): void {
    this.membersStore.clearMember();
  }
}
