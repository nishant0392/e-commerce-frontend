import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Renderer2, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit, AfterViewInit {

  @ViewChild('myCarousel', { static: true }) carouselElement: ElementRef;

  constructor(private renderer: Renderer2) { }

  // Carousel
  public carousel: any;
  @Input() public carouselItems: any = [];

  /**
   *  @param {number} subitems_count Count of subitems per slide
   *  @param {number} widthOfCarousel Width of Carousel
   *  @param {number} heightOfCarousel Height of Carousel
   *  @param {number} heightOfSubitemDiv Height of Subitem div
   *  @param {number} widthOfSubitem Width of Subitem
   *  @param {number} heightOfSubitem Height of Subitem
   *  @param {boolean} cycle Whether carousel should cycle or not (default: 'false')
   */
  @Input() public carouselOptions: any;  // configuration options

  @Output() public hoverOverSubitemEvent: EventEmitter<any> = new EventEmitter<any>();

  public slidesCounter: number[];
  public subitemsCounter: number[];
  public counterForItemsInLastSlide: number[];


  ngOnInit() {
    this.initCarouselView();
  }


  ngAfterViewInit() {

    // Get the carousel using the renderer2 in Angular
    this.carousel = this.renderer.selectRootElement(this.carouselElement).nativeElement;
    console.log('carousel:', this.carousel);

    this.setAndPlayCarousel();
  }

  /**
   * Set width and height of the carousel and it's elements.
   * @param {string} HTMLElement string denoting HTML DOM element.
   */
  public setWidthAndHeight(HTMLElement) {

    switch (HTMLElement) {
      case 'carousel': return {
        'width': this.carouselOptions.widthOfCarousel,
        'height': this.carouselOptions.heightOfCarousel
      }
      case 'carousel_subitem_div': return {
        'width': this.carouselOptions.widthOfCarousel,
        'height': this.carouselOptions.heightOfSubitemDiv
      }
      case 'carousel_img': return {
        'width': this.carouselOptions.widthOfSubitem,
        'height': this.carouselOptions.heightOfSubitem
      }
    }

  }

  /**
   * Initialize the counters for rendering the Carousel View.
   */
  public initCarouselView() {

    let items_count = this.carouselItems.length,
      subitems_count = this.carouselOptions.subitems_count,
      slides_count = Math.ceil(items_count / subitems_count);

    this.slidesCounter = <Array<number>>Array(slides_count - 1).fill(0).map((val, idx) => idx);
    this.subitemsCounter = <Array<number>>Array(subitems_count).fill(0).map((val, idx) => idx);

    // create an array [len-items_count,...,len-2,len-1] for the last slide
    this.counterForItemsInLastSlide = [];
    for (let i = items_count - subitems_count; i < items_count; i++) {
      this.counterForItemsInLastSlide.push(i)
    }

  }


  /**
      * Function to make sub-items of vertical slider(carousel) active on hover one 
      * at a time (assuming there is a 'toActive' class already)
     */
  public makeSubitemActive(DOM_element) {

    var carousel__item = DOM_element.parentElement;
    console.log('corresponding carousel item:', carousel__item)

    // Remove 'toActive' class from the subitem of the corresponding carousel item
    var activeSubitem = carousel__item.getElementsByClassName("toActive")[0];
    if (activeSubitem)
      activeSubitem.className = activeSubitem.className.replace(" toActive", "");

    // Add 'toActive' class
    if (DOM_element.className.indexOf("toActive") === -1)
      DOM_element.className += " toActive";

  } // END makeSubitemActive()


  /**
      * Function to make sub-items of vertical slider(carousel) active on hover one 
      * at a time (assuming there is a 'toActive' class already)
     */
  public addEventListenerToSubitems(carousel) {

    let carousel_subitems = carousel.getElementsByClassName('carousel__subitem');
    let subitems_count = carousel_subitems.length;

    // check if there are any subitems
    if (subitems_count > 0) {

      carousel_subitems[0].className += " toActive";

      console.log('carousel subitems:', carousel_subitems)

      for (let j = 0; j < subitems_count; j++) {

        let subitem = carousel_subitems[j];

        // Hover over Subitem event Listener
        subitem.addEventListener('mouseover', () => {

          this.makeSubitemActive(subitem);
          this.onHoverOverSubitem(subitem);

        })

      }
    }

  }  // END addEventListenerToSubitems()

  
  public onHoverOverSubitem(DOM_element) {

    let subitem = DOM_element.getElementsByClassName('subitem')[0];

    // Emit data to parent component on the hover event
    if (subitem && subitem.src)
      this.hoverOverSubitemEvent.emit(subitem.src);
  }

  /**
   * Set and Play the Carousel.
   */
  public setAndPlayCarousel() {

    var itemClassName = "carousel__item";
    var carousel = this.carousel;
    var carouselOptions = this.carouselOptions;

    if (carousel) {

      console.log('carousel in setAndPlayCarousel', carousel)
      setCarousel(carousel, itemClassName, carouselOptions);

      this.addEventListenerToSubitems(carousel);
    }


    /**
     * Function to initialize and set a carousel
     * @param {'DOM object'} carousel carousel DOM object
     * @param {string} itemClassName class name of carousel items
     * @param {object} carouselOptions configuration options for carousel
     */
    function setCarousel(carousel, itemClassName, carouselOptions) {

      let items = carousel.getElementsByClassName(itemClassName);
      console.log('items in setCarousel', items)

      let next = carousel.getElementsByClassName('carousel__button--next')[0],
        prev = carousel.getElementsByClassName('carousel__button--prev')[0];

      let totalItems = items.length,
        prevSlide = totalItems - 1,
        slide = 0,
        nextSlide = 1,
        moving = true;


      // Set classes
      function setInitialClasses() {

        // Targets the previous, current, and next items
        // This assumes there are at least two items.
        items[totalItems - 1].classList.add("prev");
        items[0].classList.add("active");
        items[1].classList.add("next");

        if (!carouselOptions.cycle)
          prev.style.display = "none";
      }


      // Set event listeners
      function setEventListeners() {
        next.addEventListener('click', moveNext);
        prev.addEventListener('click', movePrev);
      }


      // Next navigation handler
      function moveNext() {

        // Add prev button (if removed in case of first slide)
        prev.style.display = "block";

        // Check if moving
        if (!moving) {

          // if cycle is set to 'false'
          if (!carouselOptions.cycle && slide === (totalItems - 1)) return;

          // Remove 'prev' class from old previous slide
          items[prevSlide].className = itemClassName;

          // update previous slide
          prevSlide = slide;

          // If it's the last slide, reset to 0, else +1
          if (slide === (totalItems - 1)) {
            slide = 0;
            nextSlide = slide + 1;
          }
          else if (slide === (totalItems - 2)) {
            slide++;
            nextSlide = 0;
            // Remove next button for last slide
            if (!carouselOptions.cycle)
              next.style.display = "none";
          }
          else {
            slide++;
            nextSlide = slide + 1;
          }

          // Move carousel to updated slide
          moveCarouselTo(slide);
        }
      }


      // Previous navigation handler
      function movePrev() {

        // Add next button (if removed in case of last slide)
        next.style.display = "block";

        // Check if moving
        if (!moving) {

          // if cycle is set to 'false'
          if (!carouselOptions.cycle && slide === 0) return;

          // Remove 'next' class from old next slide
          items[nextSlide].className = itemClassName;

          // update next slide
          nextSlide = slide;

          // If it's the first slide, set as the last slide, else -1
          if (slide === 0) {
            slide = totalItems - 1;
            prevSlide = slide - 1;
          }
          else if (slide === 1) {
            slide--;
            prevSlide = totalItems - 1;
            // Remove prev button for first slide
            if (!carouselOptions.cycle)
              prev.style.display = "none";
          }
          else {
            slide--;
            prevSlide = slide - 1;
          }

          // Move carousel to updated slide
          moveCarouselTo(slide);
        }
      }


      function disableInteraction() {

        // Set 'moving' to true for the same duration as our transition (0.5s)
        moving = true;

        setTimeout(() => { moving = false }, 500);
      }


      function moveCarouselTo(slide) {

        // Check if carousel is moving, if not, allow interaction
        if (!moving) {

          // temporarily disable interactivity
          disableInteraction();

          // Add new classes
          items[prevSlide].className = itemClassName + " prev";
          items[slide].className = itemClassName + " active";
          items[nextSlide].className = itemClassName + " next";
        }
      }


      function initCarousel() {

        // If carousel has less than two items
        if (totalItems < 2) {

          // check if the carousel contains single slide(item) and 
          // if it does, remove prev/next buttons and add 'active' class.
          if (totalItems === 1) {

            prev.style.display = "none";
            next.style.display = "none";

            items[0].classList.add("active");
          }

        }

        // If carousel has atleast two items
        else {

          setInitialClasses();
          setEventListeners();

          // Set moving to false so that the carousel becomes interactive
          moving = false;
        }

      }

      // start with the carousel
      initCarousel();

    }
  } // END setAndPlayCarousel()

} // THE END 


