import * as io from 'socket.io-client';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from "@angular/common/http";
import { UserListComponent } from '../components/user-list/user-list.component';
import { PushNotificationsService} from 'ng-push';

const apiUrl = environment.domainApiUrl;

@Injectable({
  providedIn: 'root'
})

export class ChatService {
    @Output() loggedUserName: EventEmitter<any> = new EventEmitter();
    private url = 'http://localhost:3000';
    private socket;
    totalActiveUsers;
    messagesHistory;

    constructor(
      private _pushNotifications: PushNotificationsService,
      private http: HttpClient
    ) {
      this.socket = io(this.url);
      this._pushNotifications.requestPermission();
    }

    notify(message): void {
      let options = {
        body: message.message,
        icon: `https://cdn.pixabay.com/photo/2017/01/10/03/54/icon-1968237_1280.png`
      }
       this._pushNotifications.create(`Mensaje de ${message.sender}`, options)
       .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
    }

    connectUser(loggedUserName): void {
      this.socket.emit('connected')
      this.getloggedUserName(loggedUserName)
    }

    disconnectUser(): void {
      this.socket.emit('disconnected')
    }

    getloggedUserName(userName): void {
        this.loggedUserName.emit(userName);
    }

    async sendMessage(message): Promise<void> {
        this.socket.emit('new-message', message);
        await this.saveMessage(message);
        this.getTotalActiveUsers();
    }

    getMessages() {
        return Observable.create((observer) => {
            this.socket.on('new-message', (message) => {
              this.notify(message);
                observer.next(message);
            });
        });
    }

    getTotalActiveUsers() {
      return Observable.create((observer) => {
        this.socket.on('connected', (usersList) => {
            observer.next(usersList);
        });
      });
    }

    getInactiveUsers() {
      return Observable.create((observer) => {
        this.socket.on('disconnected', (usersList) => {
            observer.next(UserListComponent);
        });
      });
    }

    async consultTotalActiveUsers() {
      await this.http
        .request('get', `${this.url}/getTotalUsers`)
        .toPromise()
        .then(totalActiveUsers => {
          this.totalActiveUsers = totalActiveUsers
        })
        .catch(error => {
          console.log("Service error: " + error);
        });

        return this.totalActiveUsers
    }

    async saveMessage(message) {
      let aux = {
        sender: message.sender,
        message: message.message,
        sendTime: message.sendTime
      }
      await this.http
      .post(
        `${this.url}/api/saveMessage`,
        { message: aux }
      )
      .toPromise()
      .then(response => {
      })
      .catch(error => {
        console.error("API Error : ", error.status);
        console.error("API Error : ", JSON.stringify(error));
      });
    }

    async getMessageHistory() {
      await this.http
      .request('get', `${apiUrl}/getMessages`)
      .toPromise()
      .then(messages => {
        this.messagesHistory = messages
        //<- Try to comment this and evaluate..
      })
      .catch(error => {
        console.log("Service error: " + error);
      });
      return this.messagesHistory.messages;
    }
}
