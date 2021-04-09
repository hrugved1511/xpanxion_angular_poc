import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories:any;
  products:any;
  allcat:boolean=true;
  specificcat:boolean=false;
  catid:any;
  addedtocart:boolean=false;
  cartaddedproductid:any;
  quantity:number=1;
  quantitydisp:any;
  currentcartid:any;
  constructor(
    private apiService : ApiserviceService
  ) { }

  ngOnInit(): void {
    this.getallCategories();
    this.getallProducts();
    this.quantitydisp=this.quantity+" in cart";
  }

  getallCategories(){
    const res = this.apiService.getData('getAllCategories');
    res.subscribe(result => {
      console.log('all categories are  ',result);
      this.categories=result;
      
    })
  }
  
  getallProducts(){
    const res = this.apiService.getData('getallproducts');
    res.subscribe(result =>{
      console.log('all products are  ',result);
      this.products = result;
      this.allcat = true;
      this.specificcat = false;
    })
  }

  getcategorywiseproduct(id:any){
    this.catid =id;
    console.log('in getcategorywiseproduct with id ',id);

    const res = this.apiService.getData('/getproduct/category/'+id);
    res.subscribe(result=>{
      console.log('products for category id ',id,'are ',result);
      this.products = result;
      this.allcat = false;
      this.specificcat = true;
    })

  }

  addToCart(productId:any,productName:any,price:any){
    this.cartaddedproductid=productId;
    const data ={
      user_id:3,
      product_id:productId,
      product_name:productName,
      quantity:1,
      product_price:price
    }
    console.log(JSON.stringify(data));
    const res = this.apiService.postData('addtocart',JSON.stringify(data));
    res.subscribe(result=>{
      console.log("add to cart result ",result);
      this.currentcartid = result['cart_id'];
      if(result!=null){
        this.addedtocart = true;
      }
    })

  }

  incrementQuantity(productId:any,productName:any,productPrice:any){
    this.quantity=this.quantity+1;
    this.quantitydisp=this.quantity+" in cart";
    this.updateCart(this.currentcartid,productId,productName,this.quantity,productPrice);

  }
  decrementQuantity(productId:any,productName:any,productPrice:any){
    if((this.quantity-1)==0){
      this.addedtocart = false;
      const res = this.apiService.deleteData('deletecartitem/'+this.currentcartid);
      res.subscribe(result=>{
        console.log("in cart delete",result);
      })
    }else if((this.quantity-1<0)){
      console.log("not allowed");
    }else{
      this.quantity=this.quantity-1;
      this.quantitydisp=this.quantity+" in cart";
      this.updateCart(this.currentcartid,productId,productName,this.quantity,productPrice);
    }
    
  }
  updateCart(cartId:any,productId:any,productName:any,productQuantity:any,productPrice:any){

    const data = {
      cart_id:cartId,
      user_id: 3,
      product_id: productId,
      product_name: productName,
      quantity: productQuantity,
      product_price: productPrice
  }

  console.log(JSON.stringify(data));
  const res = this.apiService.putData('updatecart',JSON.stringify(data));
  res.subscribe(result=>{
    console.log("update cart",result);
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


/*{
       
  "user_id": 3,
  "product_id": 1002,
  "product_name": "brownbread",
  "quantity": 10,
  "product_price": 10
  
}*/