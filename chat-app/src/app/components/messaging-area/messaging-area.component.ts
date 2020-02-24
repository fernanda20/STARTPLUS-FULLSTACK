import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import {formatDate } from '@angular/common';

@Component({
  selector: 'app-messaging-area',
  templateUrl: './messaging-area.component.html',
  styleUrls: ['./messaging-area.component.sass']
})
export class MessagingAreaComponent implements OnInit {
  toggled: boolean = false;
  message: string = '';
  messages: string[] = [];
  loggedUserName: string = '';

  constructor(
    private chatService: ChatService
  ) { 
    this.chatService.loggedUserName.subscribe(userName => {
      this.loggedUserName = userName;
      var objDiv = document.getElementById("scroller");
      objDiv.scrollTo(0, objDiv.scrollHeight);
    });
    this.chatService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
        setTimeout( () => { 
          var objDiv = document.getElementById("scroller");
          objDiv.scrollTo(0, objDiv.scrollHeight);
        }, 20 );
      });
  }

  scrollEnd(): void {

  }

  async ngOnInit(): Promise<void> {
    this.messages = await this.chatService.getMessageHistory();
  }

  selectedEmoji (event): void {
    this.message += event.char;
    this.toggled = !this.toggled;
  }

  sendMessage(): void {
    let now = new Date();
    let formatDateResult = formatDate(now, 'hh:mm:ss a', 'en-US', '+0530');
    let messageObject = {
      message: this.message,
      sender: this.loggedUserName,
      sendTime: formatDateResult
    }
    this.chatService.sendMessage(messageObject);
    this.message = '';
  }

}
