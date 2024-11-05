export interface ChatInput {
  id: string;
  label: string;
  type: 'text' | 'select';
  options?: { value: string; label: string }[];
}

export interface ChatData {
  id: string;
  title: string;
  inputs: ChatInput[];
  message: string;
}

export interface ChatIndex {
  label: string;
  items: string[];
}

export interface ChatDataResponse {
  chats: ChatData[];
  indice: ChatIndex[];
}