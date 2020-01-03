import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'box-view',
  templateUrl: './box-view.component.html',
  styleUrls: ['./box-view.component.css']
})
export class BoxViewComponent implements OnInit {

  @Input() public Items: any[] = [];
  @Input() public options;
  public isActive: boolean[] = [];

  constructor() { }

  ngOnInit() {
  }

  addWidthAndHeight() {
    return {
      'width': this.options.width,
      'height': this.options.height
    }
  }


  loadItem(indexOfItem: number) {
    for (let i = 0; i < this.Items.length; i++)
      this.isActive[i] = false;

    this.isActive[indexOfItem] = true;
  }

}
