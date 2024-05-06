// ChatBubbleComponent with optional user role handling
import { Component } from '@angular/core';
import { ChatBubbleService } from 'src/app/services/chat-bubble.service';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ChatMessage } from 'src/app/Models/chat-bubble/ChatMessage';

@Component({
  selector: 'app-chat-bubble',
  templateUrl: './chat-bubble.component.html',
  styleUrls: ['./chat-bubble.component.css'],
})
export class ChatBubbleComponent {
  isChatOpen = false; // Controls chat bubble's visibility
  chatHistory: ChatMessage[] = []; // Stores chat messages
  newMessage = ''; // Holds new chat message text

  constructor(
    private chatBubbleService: ChatBubbleService,
    private authService: AuthServiceService
  ) {
    this.addMessage({
      text: 'Welcome! How can I help you today?',
      sender: 'bot',
    });
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen; // Toggle chat bubble visibility
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      let userRole = this.authService.getDecodedJwtData()?.role; // Retrieve user role if JWT is present
      if (!userRole) {
        userRole = 'anonymous'; // Default role if no JWT is available
      }

      const clientMessage: ChatMessage = {
        text: this.newMessage,
        sender: 'client',
        userRole, // Pass user role to backend
      };

      this.addMessage(clientMessage);

      this.chatBubbleService.chatfct(clientMessage).subscribe({
        next: (response: ChatMessage) => {
          this.addMessage({ text: response.text, sender: 'bot' }); // Handle bot's response
        },
        error: (error) => {
          console.error('Error sending chat message:', error);
        },
      });

      this.newMessage = ''; // Clear message input after sending
    }
  }

  addMessage(message: ChatMessage): void {
    this.chatHistory.push(message); // Add message to chat history
  }
}
