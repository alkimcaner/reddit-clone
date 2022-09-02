export interface PostType {
  _id: string;
  subreddit: string;
  username: string;
  title: string;
  content: string;
  comments: {
    _id: string;
    username: string;
    content: string;
    vote: number;
    createdAt: number;
  }[];
  vote: number;
  createdAt: Date;
  updatedAt: Date;
}
