import { AbstractControl } from '@angular/forms';

export class ConfirmPasswordValidator {
  /**
   * Check matching password with confirm password
   * @param control AbstractControl
   */
  static MatchPassword(control: AbstractControl): void {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;

    if (password !== confirmPassword) {
      control.get('confirm_password')?.setErrors({ ConfirmPassword: true });
    }
  }
}
