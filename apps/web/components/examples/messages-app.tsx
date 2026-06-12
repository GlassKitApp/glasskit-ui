"use client";

import { useState } from "react";
import { Navigator, useNavigator } from "@registry/ui/navigator";
import { Screen } from "@registry/ui/screen";
import { Cue } from "@registry/ui/cue";
import { Heading } from "@registry/ui/heading";
import { List, ListRow } from "@registry/ui/list";
import { Avatar } from "@registry/ui/avatar";
import { MessageThread, ChatBubble } from "@registry/ui/chat-bubble";
import { ComposeFlow } from "@registry/ui/compose-flow";
import { Toast } from "@registry/ui/toast";

/**
 * Messages — a complete example app: thread list → conversation, with
 * ComposeFlow as the reply path (activate the field, pick a quick reply,
 * it lands in the thread — middle pinch closes the picker, not the app).
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
    <Screen cue={<Cue>Pinch opens a conversation</Cue>}>
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
      cue={
        <Toast open={confirmed} emphasis="accent">
          Sent to {who}
        </Toast>
      }
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
