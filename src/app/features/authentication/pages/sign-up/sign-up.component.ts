import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../../../core/http/authentication.service';
import {SignUpRequest} from '../../models/sign-up-request';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
  ) {
    /** Redirect to home if already logged in */
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/certificates']);
    }
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    const signUpRequest: SignUpRequest = {
      email: this.signUpForm.get('email').value,
      password: this.signUpForm.get('password').value,
      lastName: this.signUpForm.get('lastName').value,
      firstName: this.signUpForm.get('firstName').value
    };
    this.authService.signUp(signUpRequest).subscribe(data => {
      this.redirectToLoginPage();
    }, error => {
      console.log(error);
    });
  }

  redirectToLoginPage(): void {
    this.router.navigateByUrl('/login');
  }
}
