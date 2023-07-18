import { ChangeDetectionStrategy, Component } from '@angular/core';

import { MembersDetailsComponent } from './members-details/members-details.component';
import { MembersListComponent } from './members-list/members-list.component';

@Component({
  selector: 'higher-order-operators-members',
  standalone: true,
  imports: [MembersDetailsComponent, MembersListComponent],
  templateUrl: './members.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent {}
