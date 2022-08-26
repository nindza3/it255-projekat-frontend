import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IMovie {
  id: number;
  name: string;
  imdbRating: string;
  year: number;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  movies: IMovie[] | null;
  constructor(private http: HttpClient) {
    this.movies = null;
  }

  ngOnInit(): void {
    this.getAllMovies();
    console.log(this.movies);
  }

  getAllMovies(): void {
    let customHeaders = new HttpHeaders().set(
      'front-auth',
      localStorage.getItem('user_id')!.toString()
    );
    console.log(customHeaders);
    this.http
      .get<IMovie[]>('http://localhost:3000/movies', { headers: customHeaders })
      .subscribe({
        next: (data: IMovie[]) => {
          console.log(data);
          this.movies = data;
        },
        error: (error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
}
