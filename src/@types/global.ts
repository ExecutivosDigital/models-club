export interface ChatProps {
  id: string;
  userId: string;
  model: ModelProps;
  lastMessageDate: Date;
  isWaitingForResponse: boolean;
  lastMessage: string;
  respondAfter: Date;
}

export interface ModelProps {
  name: string;
  id: string;
  photoUrl: string;
  bio: string;
  sellPrompt: string;
  contentPrompt: string;
}

export interface MessageProps {
  text: string;
  entity: "USER" | "MODEL";
}
export interface UserProps {
  name: string;
  phone: string;
  hasCpfCnpj: boolean;
}
