import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  itemcount:number=0;
  userid:any=3;
  cartitems:any;
  totalcartamount:number=0;
  constructor(
    private apiService : ApiserviceService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.getallcartitems();
  }

  getallcartitems(){
    const res = this.apiService.getData('getcartitems/'+this.userid);
    res.subscribe(results=>{
      console.log("cart items are ",results);
      this.cartitems=results;
      this.totalcartamount=0;
     
      for(var i=0;i<this.cartitems.length;i++){
        this.totalcartamount = this.totalcartamount +this.cartitems[i]['total_amount'];
        this.itemcount = this.itemcount + this.cartitems[i]['quantity'];
      }
      console.log("total cart amount is ",this.totalcartamount);
    })
  }
  placeorder(){
    console.log("order placed");
    this.router.navigateByUrl('orderplaced')
  }

}
