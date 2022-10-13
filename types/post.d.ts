export interface PostType {
  _id: string;
  uid: string;
  username: string;
  userImage: string;
  community: string;
  title: string;
  content: string;
  comments: {
    _id: string;
    uid: string;
    username: string;
    userImage: string;
    content: string;
    createdAt: Date;
  }[];
  votes: { uid: string; vote: boolean }[];
  saved: string[];
  createdAt: Date;
  updatedAt: Date;
}
