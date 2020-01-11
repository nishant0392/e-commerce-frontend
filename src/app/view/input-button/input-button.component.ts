import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

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

  @Input('type') type: string = 'input'; // input type
  @Input() public maxlength: number;
  @Input('placeholder') public default_placeholder: string = "Enter the characters";
  @Input('width') public width: number;
  public placeholder: string;
  public visibility_style: string = "";

  // Input value
  public value: any;
  @Output('value') public emitValue = new EventEmitter<any>();

  // textarea related
  @Input() public rows: number;


  public addClass(focus: string) {

    // focus in
    if (focus == 'focusin') {
      this.placeholder = "";
      this.visibility_style = "visible";
    }
    // focus out
    else {
      this.placeholder = this.default_placeholder;
      this.visibility_style = "";
      // emit value
      this.emitValue.emit(this.value);
    }
  }


  public addWidth() {

    if(this.width)
    return {
      'width': this.width + 'px'
    }
  }

}
