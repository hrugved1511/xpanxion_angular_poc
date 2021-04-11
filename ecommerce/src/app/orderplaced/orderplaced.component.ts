import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-orderplaced',
  templateUrl: './orderplaced.component.html',
  styleUrls: ['./orderplaced.component.scss']
})
export class OrderplacedComponent implements OnInit {

  orderid:any;

  constructor(
    private activatedRoute : ActivatedRoute
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      this.orderid = params.get('id');
      
      console.log(" id is" + this.orderid);
    });

   }

  ngOnInit(): void {
    console.log(localStorage.getItem('orderid'))
  }

}
