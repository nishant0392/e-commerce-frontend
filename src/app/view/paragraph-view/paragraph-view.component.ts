import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'paragraph-view',
  templateUrl: './paragraph-view.component.html',
  styleUrls: ['./paragraph-view.component.css']
})
export class ParagraphViewComponent implements OnInit {

  @Input() public Items = [];
  
  constructor() { }

  ngOnInit() {
  }

}
