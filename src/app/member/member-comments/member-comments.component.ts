import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
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
  ],
})
export class MemberCommentsComponent {
  @Input() comments?: Comment[] = [];
}
