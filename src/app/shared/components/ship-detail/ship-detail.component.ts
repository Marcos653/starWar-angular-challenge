import { AfterViewInit, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.scss']
})
export class ShipDetailComponent implements AfterViewInit {
  @ViewChild('closeButton') closeButton: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private focusMonitor: FocusMonitor) {
    this.closeButton = new ElementRef(null);
  }

  ngAfterViewInit() {
    this.focusMonitor.focusVia(this.closeButton.nativeElement, 'program');
  }

  ngOnDestroy() {
    this.focusMonitor.stopMonitoring(this.closeButton.nativeElement);
  }
}
