import { Component, HostListener } from '@angular/core';
import { ModalService } from './_modal';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  message: string;
  loggedUserName: string = '';

  constructor(
    private modalService: ModalService,
    private chatService: ChatService
  ) {}

  @HostListener('window:beforeunload', ['$event']) 
  
  beforeunloadHandler(event) { 
    this.chatService.disconnectUser();
  } 
  
  ngAfterViewInit() {
    this.openModal('custom-modal-1')
  }

  ngOnDestroy() {
    this.chatService.disconnectUser();
  }

  openModal(id: string): void {
    this.modalService.open('custom-modal-1');
  }

  generateRandomUserName() {
    var d = new Date().getTime();
    var uuid = 'xxx4xyx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
  }

  createNewUser(id: string): void {
    this.modalService.close('custom-modal-1');
    let unique = this.generateRandomUserName( );
    this.loggedUserName =  `User_${unique}`;
    this.chatService.connectUser(this.loggedUserName);
    this.chatService.getloggedUserName(this.loggedUserName);
  }

}
