export type Profile = {
  username: string;
  image?: string;
  bio?: string;
  rating: number;
  user_id: number;
  relation?: {
    observed: boolean;
  };
};
