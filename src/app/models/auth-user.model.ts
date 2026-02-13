export interface AuthUser {
  username: string;
  role: 'admin' | 'user';
  name: string;
  skillIds: string[];
}
