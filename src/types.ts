export interface UserInput {
    email: string;
    password: string;
    [key: string]: any;
  }
  
  export interface User {
    id: string | number;
    email: string;
    password: string;
    [key: string]: any;
  }
  
  export interface AuthAdapter {
    findByEmail(email: string): Promise<User | null>;
    createUser(data: UserInput): Promise<User>;
  }
  