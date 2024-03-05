export type User = {
  id: string;
  username: string;
  fullname: string | null;
  email: string;
  password: string;
  address: string | null;
  createdAt: Date;
  updatedAt: Date;
};
