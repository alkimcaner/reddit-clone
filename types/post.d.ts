export interface PostType {
  _id: string;
  community: string;
  username: string;
  title: string;
  content: string;
  comments: PostType[];
  votes: { username: string; vote: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}
