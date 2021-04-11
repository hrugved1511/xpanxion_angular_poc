import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  itemcount:number=0;
  cartitems: any;
  userid: number=3;

  constructor(
    private apiService : ApiserviceService
  ) { }

  ngOnInit(): void {
    this.getitemscount();
  }

  
  getitemscount(){
    console.log("In get items count");
    this.itemcount=0;
    const res = this.apiService.getData('getcartitems/'+this.userid);
    res.subscribe(results=>{
      console.log("cart items are ",results);
      this.cartitems=results;
      for(var i=0;i<this.cartitems.length;i++){
        this.itemcount = this.itemcount + this.cartitems[i]['quantity'];
      }
     
    })
    
  }

 

}
