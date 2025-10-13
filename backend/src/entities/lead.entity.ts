export interface Lead {
  id: string;
  name: string;
  phone: string;
  role?: string;
  language?: string;
  lastMessage?: string;
  lastContact?: string;
  score?: number;
}
