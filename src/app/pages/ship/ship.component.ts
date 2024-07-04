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

  constructor(private shipService: ShipService) { }

  ngOnInit(): void {
    this.shipService.getShips()
    .subscribe(ships => {
      this.ships = ships;
      console.log(this.ships);
    });
  }


  handleSearchResults(results: Ship[]): void {
    this.ships = results;
  }
}
