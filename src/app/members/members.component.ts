import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'higher-order-operators-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './members.component.html',
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersComponent {}
