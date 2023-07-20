import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';

import { Comment } from '../../members/member.model';

@Component({
  standalone: true,
  selector: 'higher-order-operators-member-comments',
  templateUrl: './member-comments.component.html',
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    NgFor,
    ReactiveFormsModule,
  ],
})
export class MemberCommentsComponent {
  commentControl = new FormControl();

  @Input() id?: string;
  @Input() comments?: Comment[] = [];

  @Output() commented = new EventEmitter<Omit<Comment, 'id'>>();

  comment(text: string) {
    if (!this.id) return;

    this.commented.emit({
      memberId: this.id,
      text,
    });

    this.commentControl.reset();
  }
}
