export type ChatRole = "user" | "assistant" | "system";

export type ChatMessageKind = "text" | "notice" | "analysis";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  kind: ChatMessageKind;
  content: string;
  createdAt: string;
};

export type Conversation = {
  id: string;
  title: string;
  studyId: string | null;
  createdAt: string;
  updatedAt: string;
  messages: ChatMessage[];
};

const STORAGE_KEY = "claritycxr:conversations:v1";

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }

  return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export function createMessage(
  message: Pick<ChatMessage, "role" | "kind" | "content">,
): ChatMessage {
  return {
    ...message,
    id: newId(),
    createdAt: new Date().toISOString(),
  };
}

export function createConversation(studyId?: string | null): Conversation {
  const now = new Date().toISOString();

  return {
    id: newId(),
    title: "New analysis",
    studyId: studyId ?? null,
    createdAt: now,
    updatedAt: now,
    messages: [],
  };
}

export function deriveTitle(
  conversation: Conversation,
  fallbackStudyName?: string | null,
) {
  const firstUserMessage = conversation.messages.find(
    (message) => message.role === "user" && message.content.trim().length > 0,
  );

  if (firstUserMessage) {
    const text = firstUserMessage.content.trim().replace(/\s+/g, " ");
    return text.length > 52 ? `${text.slice(0, 49)}…` : text;
  }

  if (fallbackStudyName) {
    return fallbackStudyName;
  }

  return conversation.title;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseMessage(value: unknown): ChatMessage | null {
  if (!isRecord(value)) return null;

  const { id, role, kind, content, createdAt } = value;

  if (typeof id !== "string" || typeof content !== "string") return null;
  if (role !== "user" && role !== "assistant" && role !== "system") return null;
  if (kind !== "text" && kind !== "notice" && kind !== "analysis") return null;
  if (typeof createdAt !== "string") return null;

  return { id, role, kind, content, createdAt };
}

function parseConversation(value: unknown): Conversation | null {
  if (!isRecord(value)) return null;

  const { id, title, studyId, createdAt, updatedAt, messages } = value;

  if (typeof id !== "string") return null;
  if (typeof title !== "string") return null;
  if (studyId !== null && typeof studyId !== "string") return null;
  if (typeof createdAt !== "string" || typeof updatedAt !== "string") {
    return null;
  }
  if (!Array.isArray(messages)) return null;

  const parsedMessages = messages
    .map(parseMessage)
    .filter((message): message is ChatMessage => message !== null);

  return {
    id,
    title,
    studyId,
    createdAt,
    updatedAt,
    messages: parsedMessages,
  };
}

export function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    return parsed
      .map(parseConversation)
      .filter((conversation): conversation is Conversation => conversation !== null)
      .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
      .slice(0, 50);
  } catch {
    return [];
  }
}

export function saveConversations(conversations: Conversation[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(conversations.slice(0, 50)),
    );
  } catch {
    /* Storage may be unavailable (private mode, quota). */
  }
}
