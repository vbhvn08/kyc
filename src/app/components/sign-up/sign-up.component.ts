import { Component } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { KycService } from '../../services/kyc.service';

@Component({
  selector: 'app-sign-up',
  providers: [],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  signUpForm = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: ['', { validators: [Validators.required, Validators.email] }],
  });

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private kycService: KycService
  ) {}

  onSubmit() {
    this.kycService.signUp(this.signUpForm.value).subscribe({
      next: () => alert('User signed up!'),
      error: () => alert('Please try again after some time!'),
    });
  }
}
