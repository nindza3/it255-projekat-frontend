import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './addmovie.component.html',
  styleUrls: ['./addmovie.component.css'],
})
export class AddmovieComponent implements OnInit {
  addmovie: any = FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.addmovie = this.fb.group({
      name: ['', Validators.required],
      imdbRating: ['', Validators.required],
      year: ['', Validators.required],
    });
  }

  movieSubmit(data: any) {
    let customHeaders = new HttpHeaders().set(
      'front-auth',
      localStorage.getItem('user_id')!.toString()
    );
    this.http
      .post<any>(
        'http://localhost:3000/movies',
        {
          name: data.name,
          imdbRating: data.imdbRating,
          year: data.year,
        },
        { headers: customHeaders }
      )
      .subscribe({
        next: (data) => {
          this.router.navigate(['admin-dashboard']);
          console.log(data);
        },
        error: (error) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
