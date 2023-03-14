export type Comment = {
  id: number;
  comment: string;
  date: string;
  rating: number;
  user?: { id: number; name: string };
  users_permissions_user?: number;
};
