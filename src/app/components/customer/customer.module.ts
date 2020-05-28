import { NgModule } from '@angular/core'

import { CustomerComponent } from './customer.component'
import { ReactiveFormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSelectModule } from '@angular/material/select'
import { MatCardModule } from '@angular/material/card'
import { AddressComponent } from './address/address.component'
import { CommonModule } from '@angular/common'
import { MatDividerModule } from '@angular/material/divider'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatCardModule,
        MatDividerModule,
        MatButtonModule
    ],
    exports: [ CustomerComponent ],
    declarations: [ CustomerComponent, AddressComponent ],
    providers: [],
})
export class CustomerModule { }
