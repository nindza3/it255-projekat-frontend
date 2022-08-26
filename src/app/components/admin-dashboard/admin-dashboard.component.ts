import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface IMovie {
  id: number;
  name: string;
  imdbRating: string;
  year: number;
}

interface IUser {
  id: number;
  name: string;
  email: string;
}

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
})
export class AdminDashboardComponent implements OnInit {
  movies: IMovie[] | null;
  clients: IUser[] | null;
  constructor(private http: HttpClient, private router: Router) {
    this.movies = null;
    this.clients = null;
  }

  ngOnInit(): void {
    this.getAllUsers();
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

  addMovie(): void {
    this.router.navigate(['add-movies']);
  }

  deleteMovie(movieId: any): void {
    let customHeaders = new HttpHeaders().set(
      'front-auth',
      localStorage.getItem('user_id')!.toString()
    );
    this.http
      .delete<any>(`http://localhost:3000/movies/${movieId}`, {
        headers: customHeaders,
      })
      .subscribe({
        next: (data: any) => {
          this.ngOnInit();
        },
        error: (error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }

  getAllUsers(): void {
    let customHeaders = new HttpHeaders().set(
      'front-auth',
      localStorage.getItem('user_id')!.toString()
    );
    console.log(customHeaders);
    this.http
      .get<IUser[]>('http://localhost:3000/users/allClients', {
        headers: customHeaders,
      })
      .subscribe({
        next: (data: IUser[]) => {
          console.log(data);
          this.clients = data;
        },
        error: (error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
  logout(): void {
    localStorage.clear();
    this.router.navigate(['login']);
  }
}
