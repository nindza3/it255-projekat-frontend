import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'my-app';

  constructor(private router: Router) {
    this.initializeApp();
  }

  initializeApp() {
    if (localStorage.getItem('user_id') != undefined || null) {
      if (localStorage.getItem('user_role') != undefined || null) {
        if (localStorage.getItem('user_role') == 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['client-dashboard']);
        }
      }
    } else {
      this.router.navigate(['/login']);
    }
  }
}
