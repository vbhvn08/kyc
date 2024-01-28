import { Spectator, byTestId } from '@ngneat/spectator';
import { createComponentFactory, mockProvider } from '@ngneat/spectator/jest';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SignUpComponent } from './sign-up.component';
import { KycService } from '../../services/kyc.service';
import { of } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';

describe('SignUpComponent', () => {
  let spectator: Spectator<SignUpComponent>;

  const kycMockService = {
    signUp: () => of({ message: 'User signed up!' }),
  };

  const createComponent = createComponentFactory({
    component: SignUpComponent,
    declarations: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    detectChanges: false,
    imports: [ReactiveFormsModule],
    providers: [mockProvider(KycService, kycMockService)],
  });

  beforeEach(async () => {
    spectator = createComponent();
  });

  it('should create the component', () => {
    expect(spectator.component).toBeTruthy();
  });

  it('should check the validations', () => {
    const firstName = spectator.query('#first-name');
    spectator.focus(firstName as Element);
    spectator.blur(firstName as Element);
    spectator.detectChanges();

    const errorElement = spectator.query(byTestId('first-name-error'));
    expect(errorElement).toExist();
    expect(errorElement).toHaveText('Name is required');

    spectator.typeInElement('test', firstName as Element);
    spectator.detectChanges();
    expect(spectator.query(byTestId('first-name-error'))).not.toExist();
  });
});
