import { Component, Input } from '@angular/core'
import { FormGroup } from '@angular/forms'
import { addressTypeSelectOptions } from '../_helpers/address-type-select-options'
import { salutationSelectOptions } from '../_helpers/salutation-select-options'
import { countryCodeSelectOptions } from '../_helpers/country-code-select-options'
import { stateSelectOptions } from '../_helpers/state-select-options'
import { validationErrorMessages } from '../_helpers/validation-error-messages'

@Component({
    selector: 'customer-address',
    templateUrl: 'address.component.html',
    styleUrls: [ 'address.component.scss' ]
})

export class AddressComponent {
    selectOptions = {
        addressType: addressTypeSelectOptions,
        salutation: salutationSelectOptions,
        countryCode: countryCodeSelectOptions,
        state: stateSelectOptions
    }
    errorMessages = validationErrorMessages
    @Input('addressForm') addressForm: FormGroup
}