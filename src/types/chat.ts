export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
};

export interface Suggestion {
  icon: React.ReactNode;
  text: string;
  points: number;
}
