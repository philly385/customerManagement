import { Component } from '@angular/core'
import { CustomerDataService } from 'src/app/customer-data/customer-data.service'
import { ActivatedRoute, Router } from '@angular/router'
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms'
import { customerNumberValidator } from './custom-validations/number-validator'
import { validationErrorMessages } from './_helpers/validation-error-messages'
import { languageSelectOptions } from './_helpers/language-select-options'
import { customerTypeOptions } from './_helpers/customer-type-select-options'

const EMAIL_REGEX = /\S+@\S+\.\S+/

@Component({
    selector: 'customer-component',
    templateUrl: 'customer.component.html',
    styleUrls: [ 'customer.component.scss' ]
})

export class CustomerComponent {
    isEdit: boolean = true
    customerId: number
    addressForms: FormArray
    form: FormGroup
    errorMessages = validationErrorMessages
    customer = {
        id: null,
        userId: null,
        name: '',
        number: null,
        customNote: '',
        email: '',
        tel1: '',
        tel2: '',
        fax: '',
        vatId: '',
        type: 'customer',
        defaultDueAfterDays: 0,
        language: 'DE',
        addresses: []
    }
    selectOptions = {
        language: languageSelectOptions,
        type: customerTypeOptions
    }

    constructor(
        private customerDataService: CustomerDataService,
        private route: ActivatedRoute,
        private router: Router,
    ) {
        this.route.params.subscribe(params => {
            this.customerId = parseInt(params.id, 10)
        })
    }

    ngOnInit() {
        const data = this.customerDataService.getCustomer(this.customerId)

        if (!this.customerId && !data) this.isEdit = false
        if (this.isEdit) this.customer = Object.assign(this.customer, data)
        else this.customer = Object.assign(this.customer, { number: this.customerDataService.getMaxCustomerNumber() })

        const {
            name,
            number,
            customNote,
            email,
            tel1,
            tel2,
            fax,
            vatId,
            type,
            defaultDueAfterDays,
            language,
            addresses
        } = this.customer

        this.form = new FormGroup({
            number: new FormControl(number, [Validators.required, customerNumberValidator(this.customerDataService)]),
            name: new FormControl(name, Validators.required),
            email: new FormControl(email, Validators.pattern(EMAIL_REGEX)),
            tel1: new FormControl(tel1),
            tel2: new FormControl(tel2),
            fax: new FormControl(fax),
            vatId: new FormControl(vatId),
            type: new FormControl(type, [Validators.required]),
            customNote: new FormControl(customNote),
            defaultDueAfterDays: new FormControl(defaultDueAfterDays),
            language: new FormControl(language, [Validators.required]),
            addresses: this.getFormArray(addresses)
        })
    }

    getFormArray(addresses) {
        return new FormArray(addresses.map((address) => {
            const {
                addressType,
                company,
                firstName,
                lastName,
                street,
                housenumber,
                zip,
                city,
                state,
                countryCode,
                email,
                tel1,
                tel2,
                fax,
                salutation
            } = address

            return new FormGroup({
                addressType: new FormControl(addressType, Validators.required),
                company: new FormControl(company, Validators.required),
                firstName: new FormControl(firstName, Validators.required),
                lastName: new FormControl(lastName, Validators.required),
                street: new FormControl(street, Validators.required),
                housenumber: new FormControl(housenumber, Validators.required),
                zip: new FormControl(zip, Validators.required),
                city: new FormControl(city, Validators.required),
                state: new FormControl(state, Validators.required),
                countryCode: new FormControl(countryCode, Validators.required),
                email: new FormControl(email, Validators.pattern(EMAIL_REGEX)),
                tel1: new FormControl(tel1),
                tel2: new FormControl(tel2),
                fax: new FormControl(fax),
                salutation: new FormControl(salutation)
            })
        }))
    }

    getNumberErrorMessage() {
        if (this.form.controls?.number.errors?.required) return this.errorMessages.required
        if (this.form.controls?.number.errors?.numberExists) return this.errorMessages.numberExists
    }

    addNewAddress() {
        const addressForm = new FormGroup({
            addressType: new FormControl('billing', Validators.required),
            company: new FormControl('', Validators.required),
            firstName: new FormControl('', Validators.required),
            lastName: new FormControl('', Validators.required),
            street: new FormControl('', Validators.required),
            housenumber: new FormControl('', Validators.required),
            zip: new FormControl('', Validators.required),
            city: new FormControl('', Validators.required),
            state: new FormControl('', Validators.required),
            countryCode: new FormControl('', Validators.required),
            email: new FormControl('', Validators.pattern(EMAIL_REGEX)),
            tel1: new FormControl(''),
            tel2: new FormControl(''),
            fax: new FormControl(''),
            salutation: new FormControl(null)
        })

        const formArray = (<FormArray>this.form.controls.addresses)
        formArray.push(addressForm)
    }

    deleteAddress(index: number) {
        (<FormArray>this.form.controls.addresses).removeAt(index)
    }

    onSave() {
        const customer = Object.assign({}, this.form.value)

        if (this.isEdit) {
            this.customerDataService.editCustomer(this.customerId, customer)
            console.log('Customer updated 🎉')
        } else {
            this.customerDataService.addCustomer(customer)
            console.log('Customer created 🎉')
        } 

        this.router.navigate(['list'])
    }
}