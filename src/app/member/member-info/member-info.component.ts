import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'higher-order-operators-member-info',
  templateUrl: './member-info.component.html',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule],
})
export class MemberInfoComponent {}
