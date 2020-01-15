import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import SignaturePad from 'signature_pad';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.sass']
})
export class TestComponent implements OnInit, AfterViewInit {

  //reference: https://github.com/szimek/signature_pad

  @ViewChild('signatureCanvas') signatureCanvas: any;

  signaturePad : SignaturePad;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.signatureCanvas.nativeElement, {
      minWidth: 0.5,
      maxWidth: 2.5,
      backgroundColor: 'rgb(255, 255, 255)',
      penColor: "black"
    });
  }

  public savePNG() : void {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    this.download(this.signaturePad.toDataURL(), "signature.png");
  }

  public saveJPG() : void {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    this.download(this.signaturePad.toDataURL("image/jpeg"), "signature.jpg");
  }

  public saveSVG() : void {
    if (this.signaturePad.isEmpty()) {
      alert("Please provide a signature first.");
      return;
    }

    this.download(this.signaturePad.toDataURL("image/svg+xml"), "signature.svg");
  }

  public clear() : void {
    this.signaturePad.clear();
  }

  private download(dataURL, filename) {
    if (navigator.userAgent.indexOf("Safari") > -1 && navigator.userAgent.indexOf("Chrome") === -1) {
      window.open(dataURL);
    } else {
      var blob = this.dataURLToBlob(dataURL);
      var url = window.URL.createObjectURL(blob);

      let a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = filename;

      document.body.appendChild(a);
      a.click();

      window.URL.revokeObjectURL(url);
    }
  }

  private dataURLToBlob(dataURL) {
    var parts = dataURL.split(';base64,');
    var contentType = parts[0].split(":")[1];
    var raw = window.atob(parts[1]);
    var rawLength = raw.length;
    var uInt8Array = new Uint8Array(rawLength);

    for (var i = 0; i < rawLength; ++i) {
      uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
  }

}
