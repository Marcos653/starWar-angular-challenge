import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ShipService } from 'src/app/service/ship.service';
import { Ship } from 'src/app/service/types/interface';
import { ShipDetailComponent } from 'src/app/shared/components/ship-detail/ship-detail.component';

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

  constructor(private shipService: ShipService, public dialog: MatDialog) {}

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

  openDialog(ship: any): void {
    this.dialog.open(ShipDetailComponent, {
      width: '250px',
      data: ship
    });
  }
}
