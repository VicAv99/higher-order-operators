import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Member } from '../member.model';

@Component({
  selector: 'higher-order-operators-members-details',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './members-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MembersDetailsComponent {
  @Input() set member(value: Member | undefined) {
    if (!value) return;
    this.form.patchValue(value);
  }

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group<Member>({
    id: 0,
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
  });
}
