"use client";

import { useState } from "react";
import { Navigator, useNavigator } from "./navigator";
import { Screen } from "./screen";
import { Heading } from "./heading";
import { List, ListRow } from "./list";
import { Avatar } from "./avatar";
import { MessageThread, ChatBubble } from "./chat-bubble";
import { ComposeFlow } from "./compose-flow";

/**
 * <Messages> — an inbox: a thread list and a conversation, replying through
 * ComposeFlow on a keyboard-less platform.
 */
export function MessagesApp() {
  return (
    <Navigator
      screens={{
        home: () => <Threads />,
        thread: (p) => <Thread who={(p as { who?: string })?.who ?? "Maya"} />,
      }}
      initial="home"
    />
  );
}

const PREVIEWS: Record<string, string> = {
  Maya: "Still on for 7?",
  Dispatch: "Route updated — Market St is closed",
  "Group ride": "Sam: rolling out at 6:15",
};

function Threads() {
  const nav = useNavigator();
  return (
    <Screen cue="Pinch opens a conversation">
      <Heading eyebrow="Messages">Inbox</Heading>
      <List>
        {Object.entries(PREVIEWS).map(([who, preview]) => (
          <ListRow
            key={who}
            leading={<Avatar name={who} size="sm" tone="violet" />}
            trailing={who === "Maya" ? "now" : undefined}
            onClick={() => nav.push("thread", { who })}
          >
            {who} · {preview}
          </ListRow>
        ))}
      </List>
    </Screen>
  );
}

function Thread({ who }: { who: string }) {
  const [sent, setSent] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  return (
    <Screen
      status={<Heading eyebrow={who}>Thread</Heading>}
      cue={confirmed ? `Sent to ${who}` : "Pinch to reply"}
      cueLive={confirmed}
    >
      <MessageThread>
        <ChatBubble from="them">{PREVIEWS[who]}</ChatBubble>
        <ChatBubble from="them">I got us a table by the window.</ChatBubble>
        {sent ? <ChatBubble from="me">{sent}</ChatBubble> : null}
      </MessageThread>
      <ComposeFlow
        label="Reply"
        value={sent}
        placeholder="Pinch to reply"
        options={["On my way", "5 min", "Call me", "Can't talk now"]}
        pickerTitle="Quick replies"
        onChange={(v) => {
          setSent(v);
          setConfirmed(true);
          setTimeout(() => setConfirmed(false), 2200);
        }}
      />
    </Screen>
  );
}
