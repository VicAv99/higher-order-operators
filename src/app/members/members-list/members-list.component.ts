import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Member } from '../member.model';

@Component({
  standalone: true,
  selector: 'higher-order-operators-members-list',
  templateUrl: './members-list.component.html',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    NgFor,
  ],
})
export class MembersListComponent {
  @Input() members?: Member[] | null = [];

  @Output() deleted = new EventEmitter<Member>();
  @Output() selected = new EventEmitter<Member>();

  selectedClicked(member: Member) {
    this.selected.emit(member);
  }

  deleteClicked(member: Member) {
    this.deleted.emit(member);
  }
}
