import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Member } from '../../members/member.model';
import { MembersDetailsForm } from '../../members/members-details/members-details.form';

@Component({
  standalone: true,
  selector: 'higher-order-operators-member-info',
  templateUrl: './member-info.component.html',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
})
export class MemberInfoComponent {
  form = new MembersDetailsForm();

  @Input() set member(value: Member | undefined) {
    this.form.disable();
    this.form.patchValue(value as Member);
  }
}
