import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'specifications',
  templateUrl: './specifications.component.html',
  styleUrls: ['./specifications.component.css']
})
export class SpecificationsComponent implements OnInit {

  @Input() public item_specifications: any;  // Item Specifications
  @Input() public MPI_Info: any;  // Manufacturing, Product and Import Info

  public specifications: any = []; // Temporary Placeholder for item_spefications
  public readMore: boolean = false;

  ngOnInit() {
    this.specifications.push(this.item_specifications[0]);
  }

}
