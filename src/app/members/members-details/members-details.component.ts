import { JsonPipe, NgFor } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  ErrorKeysPipe,
  validationMessages,
} from 'src/app/shared/error-keys.pipe';

import { Member } from '../member.model';

type NullablePartial<T> = { [P in keyof T]?: T[P] | null };

@Component({
  standalone: true,
  selector: 'higher-order-operators-members-details',
  templateUrl: './members-details.component.html',
  imports: [
    ErrorKeysPipe,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    NgFor,
    ReactiveFormsModule,
    JsonPipe,
  ],
})
export class MembersDetailsComponent {
  @Input() set member(value: Member | undefined) {
    if (!value) return;
    this.form.patchValue(value);
  }

  @Output() created = new EventEmitter<Member>();
  @Output() updated = new EventEmitter<Member>();
  @Output() cancelled = new EventEmitter<void>();

  get memberId(): number | null | undefined {
    return this.form.get('id')?.value;
  }

  get memberFirstName(): string | null | undefined {
    return this.form.get('firstName')?.value;
  }

  private formBuilder = inject(FormBuilder);

  protected messages = validationMessages;
  protected form = this.formBuilder.group({
    id: 0,
    firstName: ['', [Validators.required, Validators.minLength(3)]],
    lastName: ['', [Validators.required, Validators.minLength(3)]],
    dob: '',
    email: ['', [Validators.required, Validators.email]],
  });

  formSubmitted(member: NullablePartial<Member>) {
    if (this.form.invalid) return;
    if (member.id) {
      this.updated.emit(member as Member);
    } else {
      this.created.emit(member as Member);
    }
    this.formReset();
  }

  formReset() {
    this.form.reset();
    this.cancelled.emit();
  }
}
