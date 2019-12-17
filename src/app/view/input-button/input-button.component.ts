import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'input-button',
  templateUrl: './input-button.component.html',
  styleUrls: ['./input-button.component.css']
})
export class InputButtonComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.placeholder = this.default_placeholder;
  }

  @Input() public maxlength: number;
  @Input('placeholder') public default_placeholder: string = "Enter the characters";
  public placeholder: string;
  public visibility_style: string = "";


  public addClass(focus: string) {

    if(focus == 'focusin') {
      this.placeholder = "";
      this.visibility_style = "visible";
    }
    else {
      this.placeholder = this.default_placeholder;
      this.visibility_style = "";
    }
  }

}
