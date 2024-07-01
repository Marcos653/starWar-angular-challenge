import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, RespostaAPI } from './types/interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<RespostaAPI<Movie>> {
    return this.httpClient.get<RespostaAPI<Movie>>('/assets/films.json');
  }
}
