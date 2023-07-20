import { Component } from '@angular/core';

import { MemberCommentsComponent } from './member-comments/member-comments.component';
import { MemberInfoComponent } from './member-info/member-info.component';

@Component({
  standalone: true,
  selector: 'higher-order-operators-member',
  templateUrl: './member.component.html',
  imports: [MemberCommentsComponent, MemberInfoComponent],
})
export class MemberComponent {}
