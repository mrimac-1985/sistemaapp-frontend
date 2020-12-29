import { Injectable} from '@angular/core';
import { FormGroup} from '@angular/forms';
@Injectable()
export class ValidatorService {

    public errorMessage: string;
    /**
     * @summary Usada para saber si un campo es valido o no
     * @param _field FormControlName ==> campo a validar
     * @param _form FormGroup ==> Formulario al que pertenece el campo a validar
     * @return boolean => true: válido | false = inválido
     */
 

    public isValid(_field: string , _form: FormGroup): boolean {
          
 
            if (_form.get(_field)?.invalid && _form.get(_field)?.touched) {
                if (_form.get(_field)?.errors?.required) {
                    this.errorMessage = "Campo es requerido";
                    return false;
                }

                if (_form.get(_field)?.errors?.minlength) {
                    this.errorMessage = "Mínimo " + _form.get(_field)?.errors?.minlength.requiredLength + " caracteres";
                    return false;
                }

                if (_form.get(_field)?.errors?.maxlength) {
                    this.errorMessage = "Máximo " + _form.get(_field)?.errors?.maxlength.requiredLength + " caracteres";
                    return false;
                }

                if (_form.get(_field)?.hasError('pattern')) {
                    this.errorMessage = "Campo no valido";
                    return false;
                }
 

            }
       
       
        return true;
    }
}