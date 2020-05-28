import { NgModule } from '@angular/core'
import { ListComponent } from './list.component'
import { MatTableModule } from '@angular/material/table'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatButtonModule
    ],
    exports: [ListComponent],
    declarations: [ListComponent],
    providers: [],
})
export class ListModule { }
