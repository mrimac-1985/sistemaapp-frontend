import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImagenService {
  
  imagenData: any;

  constructor(private sanitization: DomSanitizer) {}

  convertir(binario: any) {
    
    //this.imagenData= null;

    let reader = new FileReader();
    reader.readAsDataURL(this.b64toBlob(binario, 'image/png', 512));
    reader.onloadend = () => {
      let base64 = reader.result;
      this.sanar(base64);
    };

    return this.imagenData;
  }


  sanar(base64: any) {
    this.imagenData = this.sanitization.bypassSecurityTrustResourceUrl(base64);
  }


  b64toBlob(b64Data: string, contentType: string, sliceSize: number) {
    contentType = contentType || 'image/png';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
}
