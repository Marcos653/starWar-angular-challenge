import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, RespostaAPI } from './types/interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'https://swapi.dev/api/films';

  constructor(private httpClient: HttpClient) { }

  getMovies(): Observable<RespostaAPI<Movie>> {
    return this.httpClient.get<RespostaAPI<Movie>>(this.apiUrl);
  }
}
