interface IRepliesItem {
  mid: number;
  like: number;
  member: {
    uname: string;
  };
  content: {
    message: string;
  };
}

interface IPage {
  num: number;
  size: number;
  count: number;
  acount: number;
}

export interface IResponse {
  page: IPage;
  replies: IRepliesItem[];
}
