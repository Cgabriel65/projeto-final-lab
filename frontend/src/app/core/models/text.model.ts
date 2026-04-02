export interface Text {
    id: string;
    title: string;
    body: string;
    genre: 'short-story' | 'poem' | 'column' | 'other';
    author_id: string;
    created_at: string;
    update_at: string;
    profiles?: { username: string}
}