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

    return function () {
      const functionCall = () => fn.apply(this, arguments);

      clearTimeout(timeout);
      timeout = setTimeout(functionCall, time);
    }
  }


  /**
  * Add or remove or replace class by ID.
  * @param selectorId ID of element whose background is to be changed.
  * @param className class name to add/remove.
  * @param operation 'ADD' or 'REMOVE' or 'REPLACE' -- operation to perform (add/remove/replace).
  * @param replaceWith Class to replace with.
  */
  public addRemoveReplaceClass(selectorId: string, className: string, operation: string, replaceWith?: string) {

    let _class = className;
    let element = document.getElementById(selectorId);

    if (element) {

      switch (operation) {
        case 'ADD':
          element.classList.add(_class); break;

        case 'REMOVE':
          element.classList.remove(_class); break;

        case 'REPLACE':
          if (replaceWith)
            element.classList.replace(_class, replaceWith);
      }

    }
  } // END addRemoveReplaceClass()

}
