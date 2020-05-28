import { CustomerDataService } from 'src/app/customer-data/customer-data.service'
import { AbstractControl } from '@angular/forms'

export const customerNumberValidator = (customerDataService: CustomerDataService) => {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.touched && customerDataService.isCustomerNumberTaken(parseInt(control.value, 10))) {
            return {
                numberExists: true
            }
        }
        return null
    }
}