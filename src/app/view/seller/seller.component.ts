import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.css']
})
export class SellerComponent implements OnInit {

  @Input() public Item = {};
  @Input() public options;
  
  constructor() { }

  ngOnInit() {
  }

}
