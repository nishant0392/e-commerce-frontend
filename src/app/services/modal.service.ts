import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  private customMessageModal: { openModal(), closeModal(), openModalWithAutoClose(display_duration: number) };

  // data for 'custom message' Modal
  private customModal_data_Source = new BehaviorSubject<any>({});
  public customModal_data$ = this.customModal_data_Source.asObservable();

  private changeCustomModal_data(data: { header: string, category?: string }) {
    this.customModal_data_Source.next(data);
  }

  constructor() {
    setTimeout(() => {
      this.customMessageModal = this.init_CustomMessageModal();
      console.log(this.customMessageModal)
    }, 0)
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
   * Returns a Modal with the custom message.
   * @param modal_data Data to display in 'custom message' Modal
   */
  public getCustomMessageModal(modal_data: { header: string, category?: string }) {

    // emit data to display in custom modal
    this.changeCustomModal_data(modal_data);

    return this.customMessageModal;

  }

} // END
