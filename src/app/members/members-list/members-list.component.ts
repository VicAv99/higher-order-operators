import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';

import { CallState, LoadingState, Member } from '../member.model';

@Component({
  standalone: true,
  selector: 'higher-order-operators-members-list',
  templateUrl: './members-list.component.html',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatProgressBarModule,
    NgFor,
    NgIf,
  ],
})
export class MembersListComponent {
  @Input() callState?: CallState = LoadingState.INIT;
  @Input() members?: Member[] | null = [];

  @Output() deleted = new EventEmitter<Member>();
  @Output() selected = new EventEmitter<Member>();

  protected readonly loadingState = LoadingState;

  selectedClicked(member: Member) {
    this.selected.emit(member);
  }

  deleteClicked(member: Member) {
    this.deleted.emit(member);
  }
}
