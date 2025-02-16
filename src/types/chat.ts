
export interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export interface Suggestion {
  icon: React.ReactNode;
  text: string;
  points: number;
}
