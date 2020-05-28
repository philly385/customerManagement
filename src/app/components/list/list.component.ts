import { Component } from '@angular/core'
import { CustomerDataService } from 'src/app/customer-data/customer-data.service'
import { Router } from '@angular/router'
import { sortBy } from 'lodash'

const COLUMN_DEFS = [
    'number',
    'name',
    'email',
    'tel1',
    'tel2',
    'type',
    'vatId'
]

@Component({
    selector: 'customer-list',
    templateUrl: 'list.component.html',
    styleUrls: [ 'list.component.scss' ]
})

export class ListComponent  {
    customerListData
    subscription
    columnDefs = COLUMN_DEFS

    constructor(
        private router: Router,
        private customerDataService: CustomerDataService) { }

    ngOnInit() {
        this.subscription = this.customerDataService.customerData.subscribe((data) => {
            this.customerListData = sortBy(data, 'number')
        })
    }

    ngOnDestroy() {
        this.subscription.unsubscribe()
    }
 
    editUser(row) {
        this.router.navigate(['edit', row.id ])
    }

    createNewCustomer() {
        this.router.navigate(['create'])
    }
}