import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass']
})
export class UserListComponent implements OnInit {
  loggedUserName: string;
  editLoggedUserName: boolean = false;
  totalActiveUsers;

  constructor(
    private chatService: ChatService
  ) {
    this.chatService.loggedUserName.subscribe(userName => {
      this.loggedUserName = userName;
    });
  }

  async ngOnInit(): Promise<void> {
    this.chatService
      .getTotalActiveUsers()
      .subscribe(async (usersList) => {
        let auxTotalActiveUsers = await this.chatService.consultTotalActiveUsers();
        this.totalActiveUsers = auxTotalActiveUsers.total
      });
    
    this.chatService
      .getInactiveUsers()
      .subscribe(async (usersList) => {
        let auxTotalActiveUsers = await this.chatService.consultTotalActiveUsers();
        this.totalActiveUsers = auxTotalActiveUsers.total
      });
  }

  closeEditUserName(): void {
    this.editLoggedUserName = !this.editLoggedUserName
    this.chatService.getloggedUserName(this.loggedUserName);
  }

}
