import { Component, OnInit, OnDestroy, ViewChild, Output, EventEmitter } from '@angular/core';
import { BrowserQRCodeReader } from '@zxing/library';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-reader',
  templateUrl: './reader.page.html',
  styleUrls: ['./reader.page.scss']
})
export class ReaderPage implements OnInit, OnDestroy {
  @ViewChild('video', { static: true })
  video: ElementRef<HTMLVideoElement>;
  animationFrame;
  metadata: any = {};
  @Output()
  capture: EventEmitter<any> = new EventEmitter();

  constructor(
    private dialogRef: MatDialogRef<DocumentComponent>
  ) { }

  ngOnInit(): void {
    this.metadata.events = {
      initApp: new Date()
    };
    const video = this.video.nativeElement;
    navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        width: { min: 960, ideal: 1280 },
        height: { min: 720, ideal: 960 }
      }
    })
      .then((stream) => {
        this.metadata.events.gettingStream = new Date();
        video.srcObject = stream;
        const codeReader = new BrowserQRCodeReader();
        codeReader
          .decodeOnceFromVideoDevice(undefined, video.id)
          .then(result => {
            this.metadata.result = result.text;
            this.capture.emit(result);
          })
          .catch(err => console.error(err));
      });
  }
  ngOnDestroy() {
    console.log('OnDestroy');
  }

}
