import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ListComponent } from './components/list/list.component'
import { CustomerComponent } from './components/customer/customer.component'

const routes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  { path: 'list', component: ListComponent },
  {
    path: 'edit',
    children: [{
      path: ':id',
      component: CustomerComponent,
    }]
  },
  { path: 'create', component: CustomerComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
