import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { SnackBarComponent } from 'src/app/shared/components/snack-bar/snack-bar.component';
import { SessionService } from 'src/app/shared/services/session.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  loginForm: FormGroup;

  registerForm: FormGroup;

  disabled: boolean = false;

  @ViewChild('tabs') tabGroup: MatTabGroup;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService,
    private snackBar: SnackBarComponent, private session: SessionService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.email],
      password: ['', Validators.required]
    });

    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  onSubmit(formValue: { email: string, password: string }) {
    this.authService.login(formValue).subscribe(
      (response: { token: string }) => {
        if (response && response.token) {
          this.session.setToken(response.token);
          this.router.navigate(['/search']);
        } else {
          this.snackBar.openSnackBar('Invalid Token', 'Close', 'error');
        }
      },
      error => {
        this.snackBar.openSnackBar('Invalid Credentials', 'Close', 'error');
      }
    );
  }

  onRegister(formValue: { name: string, email: string, password: string } ) {
    this.disabled = true;
    this.authService.register(formValue).subscribe(
      response => {
        this.snackBar.openSnackBar('User Created', 'Close', 'success');
        this.tabGroup.selectedIndex = 0;
        this.disabled = false;
      },
      error =>{
        console.log(error)
        debugger
        this.snackBar.openSnackBar(error.error.errors[0].msg, 'Close', 'error');
        this.disabled = false;
      }
    )
  }

}
