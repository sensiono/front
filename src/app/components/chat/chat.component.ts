import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html', // Use a separate template file
})
export class ChatComponent {
    userMessage: string = '';
    responses: string[] = [];
  
    constructor(private chatService: ChatService) {}
  
    send() {
      if (this.userMessage.trim() !== '') {
        this.chatService.sendMessage(this.userMessage).subscribe((response) => {
          this.responses.push(`User: ${this.userMessage}`);
          this.responses.push(`Bot: ${response}`);
          this.userMessage = '';
        });
      }
    }
  }