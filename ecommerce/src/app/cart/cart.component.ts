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
  totalcartamount:number=0;
  itemscount:number=0
  constructor(
    private apiService : ApiserviceService
  ) { }

  ngOnInit(): void {
    this.getallcartitems();
  }

  getallcartitems(){
    this.itemscount=0;
    const res = this.apiService.getData('getcartitems/'+this.userid);
    res.subscribe(results=>{
      console.log("cart items are ",results);
      this.cartitems=results;
      this.totalcartamount=0;
      
      for(var i=0;i<this.cartitems.length;i++){
        this.totalcartamount = this.totalcartamount +this.cartitems[i]['total_amount'];
        this.itemscount = this.itemscount + this.cartitems[i]['quantity'];
      }
      console.log("total cart amount is ",this.totalcartamount);
    })
   
  }

  incrementquantity(cartid:any,productid:any,productname:any,product_price:any,quantity:any){
    console.log(quantity);

  }
  decrementquantity(cartid:any,productid:any,productname:any,product_price:any,quantity:any){

  }
  updatecart(cartid:any,productid:any,productname:any,productprice:any,quantity:any){
    if(quantity==0){
      const res = this.apiService.deleteData('deletecartitem/'+cartid);
      res.subscribe(result=>{
        console.log("deleted from cart");
        this.getallcartitems();
      })
    }else{
      const data = {
        cart_id:cartid,
        user_id: 3,
        product_id: productid,
        product_name:productname ,
        quantity: quantity,
        product_price: productprice
      }
      const res = this.apiService.putData('updatecart',JSON.stringify(data));
        res.subscribe(result=>{
         console.log("update cart",result);
          this.getallcartitems();
        })

    }
    
  }

  clearcart(){
    const res = this.apiService.deleteData('clearcart/'+this.userid);
    res.subscribe(result=>{
      console.log("Cart Cleared");
      this.getallcartitems();
    })
  }
  

}
/*
{
        "cart_id":3,
        "user_id": 3,
        "product_id": 1002,
        "product_name": "brownbread",
        "quantity": 100,
        "product_price": 20
        
    }
 */