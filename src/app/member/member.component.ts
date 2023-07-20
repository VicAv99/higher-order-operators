import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

import { MemberCommentsComponent } from './member-comments/member-comments.component';
import { MemberInfoComponent } from './member-info/member-info.component';

@Component({
  standalone: true,
  selector: 'higher-order-operators-member',
  templateUrl: './member.component.html',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatDividerModule,
    MemberCommentsComponent,
    MemberInfoComponent,
  ],
})
export class MemberComponent {}
