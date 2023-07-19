import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { delay, filter, switchMap } from 'rxjs';

import { DialogService } from '../ui/dialog/dialog.service';
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
  private dialogService = inject(DialogService);
  private membersService = inject(MembersService);

  members$ = this.membersService.all();
  selectedMember?: Member;

  selectMember(member: Member): void {
    this.selectedMember = member;
  }

  createMember(member: Member): void {
    this.membersService.create(member).subscribe(() => {
      this.members$ = this.membersService.all();
    });
  }

  updateMember(member: Member): void {
    this.membersService.update(member).subscribe(() => {
      this.members$ = this.membersService.all();
    });
  }

  deleteMember(member: Member): void {
    this.dialogService
      .openConfirmDelete(member)
      .pipe(
        filter((confirmed) => confirmed),
        delay(Math.floor(Math.random() * (10 - 1) + 1) * 1000), // Simulate network latency
        switchMap(() => this.membersService.delete(member.id))
      )
      .subscribe(() => {
        this.members$ = this.membersService.all();
      });
  }

  reset(): void {
    this.selectedMember = undefined;
  }
}
