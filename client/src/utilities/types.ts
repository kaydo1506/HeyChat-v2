
export type Message = {
  id: string,
  text: string,
  sender: string | null
}

export type MessagesProps = {
  messages: Message[];
  currentUser: string | null;
};

export type ChatInputProps = {
  onSendMessage: (message: string) => void;
};

export type ErrorMessageProps = {
  message: string;
  clearError: () => void; // Function to clear the error
};

export type ChatContainerProps = {
  handleLeave: () => void;
  messages: Message[];
  username: string | null;
  handleSendMessage: (newMessageText: string) => void;
};
