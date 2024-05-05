import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications = new BehaviorSubject<Notification[]>([]); // Reactive source for notifications

  // Observable to which components can subscribe
  notifications$ = this.notifications.asObservable();

  constructor() {}

  // Add a new notification
  addNotification(notification: Notification): void {
    const currentNotifications = this.notifications.getValue();
    this.notifications.next([...currentNotifications, notification]);
  }

  // Mark all notifications as read
  markAllAsRead(): void {
    this.notifications.next([]);
  }
}

export interface Notification {
  id: number;
  title: string;
  message: string;
  reclamationId: number; // ID of the reclamation this notification is linked to
}
