import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';  
import { NgModule } from '@angular/core';
import { NgxEmojiPickerModule } from 'ngx-emoji-picker';
import { HttpClientModule } from '@angular/common/http'; 
import { PushNotificationsModule } from 'ng-push';

import { ModalModule } from './_modal';
import { AppComponent } from './app.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { MessagingAreaComponent } from './components/messaging-area/messaging-area.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    MessagingAreaComponent
  ],
  imports: [
    PushNotificationsModule,
    HttpClientModule,
    ModalModule,
    BrowserModule,
    FormsModule,
    NgxEmojiPickerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
