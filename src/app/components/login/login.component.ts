import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: any = FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.login = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  loginSubmit(data: any) {
    this.http
      .post<any>('http://localhost:3000/users/login', {
        email: data.email,
        password: data.password,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          if (data.role.roleName == 'client') {
            this.goToClientDashboard();
          } else {
            this.goToAdminDashboard();
          }
        },
        error: (error) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }

  goToRegister() {
    this.router.navigate(['register']);
  }

  goToClientDashboard() {
    this.router.navigate(['home']);
    console.log('posalji na client dashboard');
  }

  goToAdminDashboard() {
    // this.router.navigate()
    console.log('posalji na admin dashboard');
  }
}
