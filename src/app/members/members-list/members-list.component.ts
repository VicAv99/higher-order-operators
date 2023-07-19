import { NgFor } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

import { Member } from '../member.model';

@Component({
  selector: 'higher-order-operators-members-list',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    NgFor,
  ],
  templateUrl: './members-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersListComponent {
  @Input() members?: Member[] | null = [];

  @Output() selected = new EventEmitter<Member>();

  selectedClicked(member: Member) {
    this.selected.emit(member);
  }
}
