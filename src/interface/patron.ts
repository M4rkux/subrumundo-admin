export interface IPatron {
  id: string;
  email: string;
  createdAt: Date;
}

export interface IPatronView {
  patrons?: [IPatron];
  total?: number;
  error: string;
}

export interface IPatronCreateView {
  patron?: IPatron;
  error: string;
}
