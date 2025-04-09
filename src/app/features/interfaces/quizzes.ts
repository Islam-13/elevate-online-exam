export interface QuizzesRes {
  message: string;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage: number;
  };
  subjects: Quiz[];
}

export interface Quiz {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
}
