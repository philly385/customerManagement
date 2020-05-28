import { Component } from '@angular/core'
import { CustomerDataService } from './customer-data/customer-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'customer-management'

  constructor(private customerDataService: CustomerDataService) {}

  ngOnInit() {
    this.customerDataService.setData()
  }
}
