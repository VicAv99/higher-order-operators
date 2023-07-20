import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'higher-order-operators-member-comments',
  templateUrl: './member-comments.component.html',
  imports: [MatFormFieldModule, MatInputModule],
})
export class MemberCommentsComponent {}
