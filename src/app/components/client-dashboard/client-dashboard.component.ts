import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface IMovie {
  id: number;
  name: string;
  imdbRating: string;
  year: number;
}
@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
})
export class ClientDashboardComponent implements OnInit {
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
