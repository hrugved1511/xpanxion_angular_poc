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
  productnames:any;
  quantity:any;
  productprices:any;
  orderid:any;
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
    this.getallcartitems();
    this.productprices=this.cartitems[0]['product_price'];
    this.productnames=this.cartitems[0]['product_name'];
    this.quantity=this.cartitems[0]['quantity'];
    for(var i=1;i<this.cartitems.length;i++){
      this.productnames = this.productnames+","+this.cartitems[i]['product_name'];
      this.quantity = this.quantity+","+this.cartitems[i]['quantity'];
      this.productprices = this.productprices+","+this.cartitems[i]['product_price'];
    }
    const data = {
        user_id: 3,
        address_id: 1,
        order_placed_on: "2021-03-27T18:30:00.000+00:00",
        shipped_onDate: "2021-04-04T18:30:00.000+00:00",
        order_stage: "not shipped",
        total_amount:this.totalcartamount,
        is_delivered: "no",
        product_name: this.productnames,
        quantity: this.quantity,
        payment_mode: "cod",
        payment_status: 0,
        discount_id: 0,
        product_price:this.productprices
    }
    console.log(JSON.stringify(data));
    const res = this.apiService.postData('placeorder',JSON.stringify(data));
    res.subscribe(result=>{
      console.log("order placed with order number ",result);
      this.orderid=result['order_id'];
      console.log("order id is",this.orderid)
      this.router.navigate(['/orderplaced',this.orderid])
    });
    
    
    
  }

}

/*

 {
        
        "user_id": 1,
        "address_id": 1,
        "order_placed_on": "2021-03-27T18:30:00.000+00:00",
        "shipped_onDate": "2021-04-04T18:30:00.000+00:00",
        "order_stage": "shipped",
        "total_amount":500,
        "is_delivered": "no",
        "product_name": "milkbread,spinach,curd",
        "quantity": "5,3,4",
        "payment_mode": "cod",
        "payment_status": 0,
        "discount_id": 0,
        "product_price": "10,20,50"
    }

*/
