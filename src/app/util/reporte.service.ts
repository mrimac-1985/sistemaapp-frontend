import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ReporteService {
 

  constructor(
    private sanitization: DomSanitizer
  ) { }



  generareporte(reporte: any, nombrereporte: string, extensionarchivo: string) {

    //let reportesano : byte[] = this.sanitization.bypassSecurityTrustResourceUrl(reporte);

    var sampleArr = this.base64ToArrayBuffer(reporte);
    this.saveByteArray(nombrereporte, sampleArr,extensionarchivo);
  }

  base64ToArrayBuffer(base64 : any) {
    var binaryString = window.atob(base64);
    var binaryLen = binaryString.length;
    var bytes = new Uint8Array(binaryLen);
    for (var i = 0; i < binaryLen; i++) {
       var ascii = binaryString.charCodeAt(i);
       bytes[i] = ascii;
    }
    return bytes;
 }

  saveByteArray(reportName : any, byte : any , tiporeporte:string) {
  var blob = new Blob([byte]);
  var link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('style', 'display:none;')
  var fileName = reportName + "."+tiporeporte;
  link.download = fileName;
  link.click();
};

}
