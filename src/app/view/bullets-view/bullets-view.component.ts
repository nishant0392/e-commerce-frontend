import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bullets-view',
  templateUrl: './bullets-view.component.html',
  styleUrls: ['./bullets-view.component.css']
})
export class BulletsViewComponent implements OnInit {

  @Input() public Item = {};
  @Input() public options;
  
  constructor() { }

  ngOnInit() {
  }

}
