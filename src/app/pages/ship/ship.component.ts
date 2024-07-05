import { Component } from '@angular/core';
import { ShipService } from 'src/app/service/ship.service';
import { Ship } from 'src/app/service/types/interface';

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.scss']
})
export class ShipComponent {
  public ships: Ship[] = [];
  public totalShips = 0;
  public currentPage = 1;
  public pageSize = 0;

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    this.fetchShips();
  }

  fetchShips(page: number = 1): void {
    this.shipService.getShips('', page)
    .subscribe(response => {
      this.ships = response.results;
      this.totalShips = response.count;
      this.pageSize = response.results.length;
      console.log(this.ships);
    });
  }

  handleSearchResults(results: Ship[]): void {
    this.ships = results; 
  }

  handlePageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.fetchShips(this.currentPage);
  }
}
