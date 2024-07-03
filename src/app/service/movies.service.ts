import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Movie, RespostaAPI } from './types/interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private apiUrl = 'https://swapi.dev/api/films';

  constructor(private httpClient: HttpClient) { }

  getMovies(query: string = ''): Observable<Movie[]> {
    return this.httpClient.get<RespostaAPI<Movie>>(`${this.apiUrl}?search=${query}`)
    .pipe(map(response => response.results)
    );
  }
}
