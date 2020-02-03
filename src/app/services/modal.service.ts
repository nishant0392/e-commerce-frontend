import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private customMessageModal: { openModal(), closeModal(), openModalWithAutoClose(display_duration: number) };

  // data for 'custom message' Modal
  private customModal_data_Source = new BehaviorSubject<any>(null);
  public customModal_data$ = this.customModal_data_Source.asObservable();

  private changeCustomModal_data(data: { serviceType: string, header?: string,  category?: string , duration?: number }) {
    this.customModal_data_Source.next(data);
  }

  constructor() {
    setTimeout(() => {
      this.customMessageModal = this.init_CustomMessageModal();
    })
  }


  /**
   * Initialize Custom message Modal
   */
  private init_CustomMessageModal() {

    let el_open = document.getElementById('open-modal-customMsg');  // click to open
    let el_close = document.getElementById('close-modal-customMsg'); // click to close

    let modalOperations = {
      openModal: () => { if (el_open) el_open.click(); },

      closeModal: () => { if (el_close) el_close.click(); },

      openModalWithAutoClose: (display_duration) => {
        modalOperations.openModal();
        setTimeout(() => modalOperations.closeModal(), display_duration)
      }
    }

    return modalOperations;
  }


  /**
   * Provides service to operate on custom message modal (mainly used by App Component).
   * @param serviceType Service type: 'open', 'close' and 'open_with_auto_close'.
   * @param options Options such as duration of display.
   */
  public customModalService(serviceType: string, options?: { display_duration: number }) {

    setTimeout(() => {
    
      switch (serviceType) {
        case 'open':
          this.customMessageModal.openModal(); break;
  
        case 'close':
          this.customMessageModal.closeModal(); break;
  
        default:   
          let display_duration = options ? options.display_duration : 3000;
          this.customMessageModal.openModalWithAutoClose(display_duration);
      }

    })
    
  } 


  /**
   * Shows a Modal with the custom message.
   * @param serviceType Service type: 'open', 'close' and 'open_with_auto_close'.
   * @param header Message to display in 'custom message' Modal.
   * @param category Category of message
   * @param display_duration Duration of message display
   */
  public showCustomMessageModal(serviceType: string, header: string, category?: string, display_duration?: number) {

    let dataToEmit = {
      serviceType: serviceType,
      header: header,
      category: category,
      display_duration: display_duration
    }

    // emit data to display in custom modal
    this.changeCustomModal_data(dataToEmit);

  }

} // END
