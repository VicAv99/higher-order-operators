import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'higher-order-operators-members-list',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './members-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersListComponent {}
