import { Injectable } from '@angular/core';
import { Ship, RespostaAPI } from './types/interface';
import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipService {
  private apiUrl = 'https://swapi.dev/api';

  constructor(private httpClient: HttpClient) { }

  getShips(query: string = '', page: number = 1): Observable<RespostaAPI<Ship>> {
    return this.httpClient.get<RespostaAPI<Ship>>(`${this.apiUrl}/starships?search=${query}&page=${page}`)
    .pipe(map(response => response));
  }
}
