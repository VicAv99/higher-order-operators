import { JsonPipe, NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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

import { Member, NullablePartial } from '../member.model';
import { MembersDetailsForm } from './members-details.form';

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
  @Input() set member(value: Member | undefined | null) {
    this.selectedMember = value ?? ({} as Member);
    this.form.patchValue(value ?? ({} as Member));
  }

  @Output() submitted = new EventEmitter<Member>();
  @Output() cancelled = new EventEmitter<void>();

  get title(): string {
    return this.selectedMember?.id
      ? `Edit ${this.selectedMember.firstName} ${this.selectedMember.lastName}`
      : 'Add Member';
  }

  protected selectedMember = {} as Member;
  protected messages = validationMessages;
  protected form = new MembersDetailsForm(this.selectedMember);

  formSubmitted(member: NullablePartial<Member>) {
    if (this.form.invalid) return;
    this.submitted.emit(member as Member);
    this.formReset();
  }

  formReset() {
    this.form.reset();
    this.cancelled.emit();
  }
}
