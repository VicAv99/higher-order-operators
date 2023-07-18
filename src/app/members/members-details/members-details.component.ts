import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'higher-order-operators-members-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './members-details.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersDetailsComponent {}
