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
  favouriteMovies: IMovie[] | null;
  watchedMovies: IMovie[] | null;
}
@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css'],
})
export class ClientDashboardComponent implements OnInit {
  movies: IMovie[] | null;
  favouriteMovies: IMovie[] | null;
  watchedMovies: IMovie[] | null;
  constructor(private http: HttpClient, private router: Router) {
    this.movies = null;
    this.favouriteMovies = null;
    this.watchedMovies = null;
  }

  ngOnInit(): void {
    this.getUserInfo();
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
  getUserInfo(): void {
    let userId = localStorage.getItem('user_id')!.toString();
    let customHeaders = new HttpHeaders().set(
      'front-auth',
      localStorage.getItem('user_id')!.toString()
    );
    console.log(customHeaders);
    this.http
      .get<IUser>(`http://localhost:3000/users/${userId}`, {
        headers: customHeaders,
      })
      .subscribe({
        next: (data: IUser) => {
          this.favouriteMovies = data.favouriteMovies;
          this.watchedMovies = data.watchedMovies;
          console.log(data);
        },
        error: (error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }

  addMovieToWatched(movieId: number): void {
    let userId = localStorage.getItem('user_id')!.toString();
    let customHeaders = new HttpHeaders().set('front-auth', userId);
    console.log(customHeaders);
    this.http
      .patch<IMovie[]>(
        `http://localhost:3000/movies/${movieId}/addMovieToWatched`,
        { userId },
        { headers: customHeaders }
      )
      .subscribe({
        next: (data: IMovie[]) => {
          console.log(data);
          this.ngOnInit();
        },
        error: (error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
  addMovieToFavourite(movieId: number): void {
    let userId = localStorage.getItem('user_id')!.toString();
    let customHeaders = new HttpHeaders().set('front-auth', userId);
    console.log(customHeaders);
    this.http
      .patch<IMovie[]>(
        `http://localhost:3000/movies/${movieId}/addMovieToFavourites`,
        { userId },
        { headers: customHeaders }
      )
      .subscribe({
        next: (data: IMovie[]) => {
          console.log(data);
          this.ngOnInit();
        },
        error: (error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
  removeMovieFromFavourite(movieId: number): void {
    let userId = localStorage.getItem('user_id')!.toString();
    let customHeaders = new HttpHeaders().set('front-auth', userId);
    console.log(customHeaders);
    this.http
      .patch<IMovie[]>(
        `http://localhost:3000/movies/${movieId}/removeMoviefromFavourites`,
        { userId },
        { headers: customHeaders }
      )
      .subscribe({
        next: (data: IMovie[]) => {
          console.log(data);
          this.ngOnInit();
        },
        error: (error: any) => {
          // this.errorMessage = error.message;
          console.error('There was an error!', error);
        },
      });
  }
  removeMovieFromWatched(movieId: number): void {
    let userId = localStorage.getItem('user_id')!.toString();
    let customHeaders = new HttpHeaders().set('front-auth', userId);
    console.log(customHeaders);
    this.http
      .patch<IMovie[]>(
        `http://localhost:3000/movies/${movieId}/removeMoviefromWatched`,
        { userId },
        { headers: customHeaders }
      )
      .subscribe({
        next: (data: IMovie[]) => {
          console.log(data);
          this.ngOnInit();
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
