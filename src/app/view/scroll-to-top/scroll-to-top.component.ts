import { Component, ElementRef, ViewChild } from '@angular/core';
import { UtilityService } from 'src/app/services/utility.service';

@Component({
  selector: 'scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
  styleUrls: ['./scroll-to-top.component.css']
})
export class ScrollToTopComponent {

  @ViewChild('scrollToTop', { static: false }) _scrollToTopBtn: ElementRef;

  // "scroll to top" button
  public scrollToTopBtn: Element;

  constructor(private utilService: UtilityService) { }

  ngAfterViewInit() {
    this.scrollToTopBtn = this._scrollToTopBtn.nativeElement;
    this.init_ScrollToTop();
  }


  public init_ScrollToTop() {

    if (this.scrollToTopBtn) {
    
      window.addEventListener('scroll', this.utilService.debounce((event) => {
       
        if (window.pageYOffset > 500)
          this.scrollToTopBtn.classList.add('visible');

        else
          this.scrollToTopBtn.classList.remove('visible');

      }, 500));
    }

  } // END init_ScrollToTop()


  /**
  * Function to scroll to top of the page.
  */
  public scrollToTopFunc() {

    console.log('scroll to top function called!!')
    this.scrollToTopBtn.classList.remove('visible');

    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }, 250);

  } // END scrollToTop()


} // END
