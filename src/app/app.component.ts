import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ReaderPage } from './reader/reader.page';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'zxing';
  result: any;

  constructor(
    private dialog: MatDialog
  ) { }

  openReader() {
    const dialogRef = this.dialog.open(ReaderPage, {
      panelClass: 'fullsize',
      height: '100vh',
      width: '100vh',
      maxWidth: '100vw',
      position: {
        left: '0',
        right: '0'
      }
    });
    dialogRef.componentInstance.capture.subscribe(result => {
      this.result = result;
      dialogRef.close();
    });
  }
}
