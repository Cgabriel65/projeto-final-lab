import { Text as StoryText } from './text.model';

export interface User {
  id: string;
  email: string;
}

export interface Profile {
  id: string;
  username: string;
  bio: string | null;
  created_at: string;
  texts?: StoryText[];
}