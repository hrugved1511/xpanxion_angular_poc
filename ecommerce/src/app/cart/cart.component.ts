import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  userid:any=3;
  cartitems:any;
  
  constructor(
    private apiService : ApiserviceService
  ) { }

  ngOnInit(): void {
    this.getallcartitems();
  }

  getallcartitems(){
    const res = this.apiService.getData('getcartitems/'+this.userid);
    res.subscribe(results=>{
      console.log("cart items are ",results);
      this.cartitems=results;
    })
  }

  

}
