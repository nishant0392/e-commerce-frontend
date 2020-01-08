import { Component, OnInit, Input } from '@angular/core';
import { DataProvider2Service } from 'src/app/services/data-provider2.service';

@Component({
  selector: 'nav-menu',
  templateUrl: './nav-menus.component.html',
  styleUrls: ['./nav-menus.component.css']
})
export class NavMenusComponent implements OnInit {

  constructor(private data: DataProvider2Service) { }

  @Input('menu') public menuTitle: string;
  public electronics;

  ngOnInit() {
    this.electronics = this.data.electronics;
  }

}
