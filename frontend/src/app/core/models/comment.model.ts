export interface Comment {
  id: string;
  body: string;
  author_id: string;
  text_id: string;
  created_at: string;
  profiles?: { username: string };
}