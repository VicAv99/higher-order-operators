import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { Member } from '../member.model';

export class MembersDetailsForm extends FormGroup {
  id = this.get('id') as FormControl;
  firstName = this.get('firstName') as FormControl;
  lastName = this.get('lastName') as FormControl;
  dob = this.get('dob') as FormControl;
  email = this.get('email') as FormControl;

  constructor(private movie?: Member, private formBuilder = new FormBuilder()) {
    super(
      formBuilder.group({
        id: undefined,
        firstName: [
          movie?.firstName,
          [Validators.required, Validators.minLength(3)],
        ],
        lastName: [
          movie?.lastName,
          [Validators.required, Validators.minLength(3)],
        ],
        dob: [movie?.dob, []],
        email: [movie?.email, [Validators.required, Validators.email]],
      }).controls
    );
  }
}
