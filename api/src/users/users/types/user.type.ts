export type Notification = {
  order_id: number;
  body: string;
  created_at: number;
};

export type NotificationMethod = 'email' | 'phone';

export type User = {
  id: number;
  email: string;
  phone: string;
  is_admin: boolean;
  is_premium: boolean;
  urgent_notification_method: NotificationMethod;
  created_at: number;
  deleted_at?: number;
  notifications: Notification[];
};
