import { Injectable } from '@angular/core'
import { BehaviorSubject } from 'rxjs'
import { max } from 'lodash'
declare function require(name:string)
const customerDemoData = require('./customer_demo_data.json') 

@Injectable({providedIn: 'root'})

export class CustomerDataService {
    customerData = new BehaviorSubject([])

    constructor() { }
    
    setData() {
        this.customerData.next(customerDemoData)
    }

    getCustomer(id: number) {
        return this.customerData.value.find(({id: customerId}) => id === customerId)
    }

    editCustomer(id: number, updatedCustomer) {
        const data = this.customerData.value.map((customer) => {
            if (customer.id !== id) return customer

            return Object.assign(customer, updatedCustomer)
        })
        this.customerData.next(data)
    }

    addCustomer(newCustomer) {
        const maxId = max(this.customerData.value.map(({id}) => id))
        const customer = Object.assign(newCustomer, { id: maxId + 1, userId: '' })
        const newList = [ ... this.customerData.value, customer ]
        this.customerData.next(newList)
    }

    getMaxCustomerNumber(): number {
        const numbers = this.customerData.value.map(({number}) => number)
        return max(numbers) + 1
    }

    isCustomerNumberTaken(number: number): boolean {
        return !!this.customerData.value.find(({number: customerNumber}) => number === customerNumber)
    }
}