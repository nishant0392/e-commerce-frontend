import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  /**
   * debounce function
   * @param {function} fn function to debounce
   * @param {Number} time waiting time
   */
  public debounce = (fn, time) => {
    let timeout;
  
    return function() {
      const functionCall = () => fn.apply(this, arguments);
      
      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }


   /**
   * Add or remove class by ID.
   * @param selectorId ID of element whose background is to be changed.
   * @param className class name to add/remove.
   * @param addOrRemoveClass 'ADD' or 'REMOVE' -- operation to perform (add/remove)
   */
  public addOrRemoveClass(selectorId: string, className: string, addOrRemoveClass:string, ) {

    let _class = className;
    let element = document.getElementById(selectorId);

    if(element) {
      addOrRemoveClass === 'ADD' ? element.classList.add(_class) : element.classList.remove(_class);
    }
  }

}
