export interface PostType {
  _id: string;
  community: string;
  username: string;
  userImage: string;
  title: string;
  content: string;
  comments: {
    _id: string;
    username: string;
    userImage: string;
    content: string;
    createdAt: Date;
  }[];
  votes: { username: string; vote: boolean }[];
  createdAt: Date;
  updatedAt: Date;
}
