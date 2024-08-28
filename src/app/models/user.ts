import { Session } from './session';

export interface User {
  id: number;
  userName: string;
  sessions?: Session[];
  isStudying?: boolean;
  isRequesting?: boolean;
  queuePosition?: number;
  bookedLicenceId?: number;
  role?: string;
}
