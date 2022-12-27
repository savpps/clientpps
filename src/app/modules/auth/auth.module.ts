import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AuthComponent } from './auth.component';
import { TranslationModule } from '../i18n/translation.module';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { VerifyCodeComponent } from './components/verify-code/verify-code.component';
import { CreateProfileComponent } from './components/create-profile/create-profile.component';


@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    ForgotPasswordComponent,
    LogoutComponent,
    AuthComponent,
    VerifyCodeComponent,
    CreateProfileComponent,
  ],
  imports: [
    CommonModule,
    TranslationModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BsDropdownModule.forRoot(), 
    NgxIntlTelInputModule,
  ],
})
export class AuthModule {}
