import { Component, EventEmitter, Output } from '@angular/core';
import { catchError, debounceTime, Subject, switchMap } from 'rxjs';
import { ShipService } from 'src/app/service/ship.service';
import { Ship } from 'src/app/service/types/interface';

@Component({
  selector: 'app-search-ships',
  templateUrl: './search-ships.component.html',
  styleUrls: ['./search-ships.component.scss']
})
export class SearchShipsComponent {
  @Output() searchResults = new EventEmitter<Ship[]>();
  ships: Ship[] = [];
  isLoading = false;
  searchQuery = '';
  searchQuerySubject = new Subject<string>();
  errorMessage: string = '';

  constructor(private shipService: ShipService) {

    this.searchQuerySubject.pipe(
      debounceTime(300),
      switchMap(query => {
        this.isLoading = true;
        this.ships = [];
        return this.shipService.getShips(query);
      }),
      catchError(error => {
        console.error('Search failed:', error);
        this.errorMessage = 'Failed to load data!';
        this.isLoading = false;
        throw error;
      })
    ).subscribe(ships => {
      this.ships = ships;
      this.isLoading = false;
      this.searchResults.emit(this.ships);
    });
  }

  searchShips(): void {
    this.searchQuerySubject.next(this.searchQuery);
  }
}
