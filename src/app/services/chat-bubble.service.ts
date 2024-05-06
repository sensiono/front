// ChatBubbleService with optional JWT header
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatMessage } from 'src/app/Models/chat-bubble/ChatMessage';

@Injectable({
  providedIn: 'root',
})
export class ChatBubbleService {
  private baseUrl = 'http://localhost:8084/chatbot'; // Base URL for the backend service

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders | undefined {
    const jwt = localStorage.getItem('jwt'); // Retrieve JWT token
    if (jwt) {
      return new HttpHeaders({
        Authorization: `Bearer ${jwt}`,
        'Content-Type': 'application/json',
      });
    } else {
      console.warn('No JWT found. Sending without Authorization header.');
      return undefined; // Return undefined if JWT isn't available
    }
  }

  // Method to send chat messages to the backend
  chatfct(chatMessage: ChatMessage): Observable<ChatMessage> {
    const headers = this.getHeaders(); // Get headers with/without JWT
    return this.http.post<ChatMessage>(`${this.baseUrl}/respond`, chatMessage, {
      headers,
    });
  }
}
