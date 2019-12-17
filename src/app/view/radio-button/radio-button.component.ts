import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, OnInit } from '@angular/core';
import { WebComponentsService } from 'src/app/services/web-components.service';


@Component({
  selector: 'radio-button',
  templateUrl: './radio-button.component.html',
  styleUrls: ['./radio-button.component.css']
})
export class RadioButtonComponent implements OnInit {

  @ViewChild('radioBtn', { static: true }) public radioButton: ElementRef<HTMLElement>;

  @Input('value') public value: any;  // value of radio button selected

  @Input('group-class') public radioButtonsGroupClassName: string = "radio-button-group";

  @Input('selected') public selected: boolean = false;

  public CHECKED: string = 'checked';
  public radioButtonClassName: string = "inner-circle";
  public initialClass: string;

  @Output('selectedValue') public data: EventEmitter<any> = new EventEmitter<any>();

  constructor(private webComponentService: WebComponentsService) { }

  ngOnInit() {
    if(this.selected)
      this.radioButton.nativeElement.click();
  }


  public selectOption(element: Element) {

    let child = element.getElementsByClassName(this.radioButtonClassName)[0];

    // if option already selected, do nothing
    if (child && child.className.indexOf(this.CHECKED) !== -1) return;

    // find ancestor with "radio-button-group" class
    let ancestor = this.webComponentService.findAncestor(element, this.radioButtonsGroupClassName);

    // remove "inner-circle" class from child nodes
    this.webComponentService.removeClassFromChildNodes(ancestor, this.CHECKED);

    // add "checked" class to selected option
    child.className += ' ' + this.CHECKED;

    // emit value of the selected option
    this.data.emit(this.value);
  }

}
