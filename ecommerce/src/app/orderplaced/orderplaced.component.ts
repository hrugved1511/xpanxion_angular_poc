import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiserviceService } from '../services/apiservice.service';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.scss']
})
export class OrderplacedComponent implements OnInit {

  orderid:any;
  userid:number=3;
  constructor(
    private activatedRoute : ActivatedRoute,
    private apiService : ApiserviceService
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.orderid = params.get('id');
      
      console.log(" id is" + this.orderid);
      this.clearshoppingcart();
    });

   }

  ngOnInit(): void {
    console.log(localStorage.getItem('orderid'))
  }
  clearshoppingcart(){
    const res = this.apiService.deleteData('clearcart/'+this.userid);
    res.subscribe(result=>{
      console.log("Cart Cleared");
     
    })
  }

}
