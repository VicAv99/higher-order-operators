import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs';

import { CallState, LoadingState, Member } from '../member.model';

@Component({
  standalone: true,
  selector: 'higher-order-operators-members-list',
  templateUrl: './members-list.component.html',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatListModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    NgFor,
    NgIf,
    ReactiveFormsModule,
  ],
})
export class MembersListComponent {
  protected readonly loadingState = LoadingState;
  protected readonly searchControl = new FormControl();

  @Input() callState?: CallState = LoadingState.INIT;
  @Input() members?: Member[] | null = [];

  @Output() deleted = new EventEmitter<Member>();
  @Output() selected = new EventEmitter<Member>();
  @Output() searched = this.searchControl.valueChanges.pipe(
    debounceTime(500),
    distinctUntilChanged()
  );

  selectedClicked(member: Member) {
    this.selected.emit(member);
  }

  deleteClicked(member: Member) {
    this.deleted.emit(member);
  }
}
