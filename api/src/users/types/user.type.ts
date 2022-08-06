import { Notification } from '../../notifications/types/notification.type';

export type NotificationMethod = 'email' | 'phone';

export type User = {
  id: number;
  email: string;
  phone: string;
  isAdmin: boolean;
  isPremium: boolean;
  urgent_notification_method: NotificationMethod;
  currency: string;
  locale: string;
  createdAt: string;
  deletedAt?: string;
  //
  notifications: Notification[];
};
