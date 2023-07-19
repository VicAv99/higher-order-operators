import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

export const validationMessages: ValidationErrors = {
  email: 'This Field must be a valid email',
  minlength: 'This Field must be at least 3 characters long',
  required: 'This Field is Required',
};

@Pipe({
  name: 'errorKeys',
  standalone: true,
})
export class ErrorKeysPipe implements PipeTransform {
  transform(errors: ValidationErrors): string[] {
    if (!errors) return [];
    return Object.keys(errors);
  }
}
