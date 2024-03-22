import { AbstractControl, FormGroup, ValidationErrors } from '@angular/forms';

/**
 *
 * provide password match validation
 * @param formGroup
 * @returns ValidationErrors
 */
export function passwordMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const formGroup = control as FormGroup;
  const password = formGroup.get('password')?.value;
  const confirmPassword = formGroup.get('confirmPassword')?.value;

  if (password && confirmPassword && password !== confirmPassword) {
    return { passwordMismatch: true };
  } else {
    return null;
  }
}

/**
 *
 * @param field
 * check if a formgroup filed is valid
 * @param formGroup
 * @returns
 */
export function isFieldValid(field: string, formGroup: FormGroup) {
  return !formGroup?.get(field)?.valid && formGroup?.get(field)?.touched;
}

export function validateField(field: string, formGroup: FormGroup) {
  return {
    'ng-invalid': isFieldValid(field, formGroup),
    'ng-dirty': isFieldValid(field, formGroup),
    'w-full': true,
    // 'mb-3': true,
  };
}
