import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Member } from '../member.model';

type NullablePartial<T> = { [P in keyof T]?: T[P] | null };

@Component({
  standalone: true,
  selector: 'higher-order-operators-members-details',
  templateUrl: './members-details.component.html',
  imports: [
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    ReactiveFormsModule,
  ],
})
export class MembersDetailsComponent {
  @Input() set member(value: Member | undefined) {
    if (!value) return;
    this.form.patchValue(value);
  }

  @Output() created = new EventEmitter<Member>();
  @Output() updated = new EventEmitter<Member>();

  get memberId(): number | null | undefined {
    return this.form.get('id')?.value;
  }

  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group<Member>({
    id: 0,
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
  });

  formSubmitted(member: NullablePartial<Member>) {
    if (member.id) {
      this.updated.emit(member as Member);
    } else {
      this.created.emit(member as Member);
    }
  }
}
