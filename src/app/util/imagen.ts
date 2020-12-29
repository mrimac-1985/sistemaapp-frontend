import { DomSanitizer } from '@angular/platform-browser';

export class ImagenConver{

    
    imagenusuario: any;

    constructor(
        private sanitization: DomSanitizer
      ) {  
    
      }
     
  convertir(binario: any) {
    let reader = new FileReader();
    reader.readAsDataURL(this.b64toBlob(binario, 'image/png', 512));
    reader.onloadend = () => {
      let base64 = reader.result;
     this.sanar(base64);    
    }

    return this.imagenusuario;
  }

  sanar(base64: any) {
     this.imagenusuario = this.sanitization.bypassSecurityTrustResourceUrl(base64);
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
      
        var blob = new Blob(byteArrays, {type: contentType});
        return blob;
      }
    
    
      dataURLtoBlob(dataURL: string) {
        // Decode the dataURL   
        var binary = atob(dataURL.split(',')[1]);
        // Create 8-bit unsigned array
        var array = [];
        for (var i = 0; i < binary.length; i++) {
            array.push(binary.charCodeAt(i));
        }
        // Return our Blob object
        return new Blob([new Uint8Array(array)], { type: 'image/png' });
    }


}