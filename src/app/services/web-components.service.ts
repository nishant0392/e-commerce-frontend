import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WebComponentsService { constructor() { console.log('Web Service called') }

  /**
   * Finds the specified ancestor of the element.
   * @param element node whose ancestor is to be found
   * @param ancestorClassName class of the ancestor
   */
  public findAncestor(element: Element, ancestorClassName: string) {

    // traverse up until specified ancestor is found
    while (element) {

      if (element.className.indexOf(ancestorClassName) !== -1) break;

      element = element.parentElement;
    }

    return element;
    
  } // END findAncestor()


  /**
   * Removes specified class from the child nodes of the parent node.
   * @param parentElement parent node
   * @param className class to be removed from child nodes
   */
  public removeClassFromChildNodes(parentElement: Element, className: string) {

    let childElements: HTMLCollectionOf<Element>;
    let childElement: Element;

    if (parentElement)
      childElements = parentElement.getElementsByClassName(className);

    for (let i = 0; i < childElements.length; i++) {

      childElement = childElements[i];
      childElement.classList.remove(className);

    }

  } // END removeClassFromChildNodes()

} // END
