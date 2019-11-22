import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'gallery-view',
  templateUrl: './gallery-view.component.html',
  styleUrls: ['./gallery-view.component.css']
})
export class GalleryViewComponent implements OnInit {

  @Input() public Items: any[] = [];
  @Input() public options;

  constructor() {}

  ngOnInit() {
  }

  loadItem(item) {
    console.log('item', item)
    
  }

  addWidthAndHeight() {
    return {
      'width': this.options.width,
      'height': this.options.height
    }
  }

}
