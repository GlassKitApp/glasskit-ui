import type { ReactNode } from "react";
import { WorkoutApp } from "@registry/ui/workout";
import { MessagesApp } from "@registry/ui/messages";

export type Example = {
  slug: string;
  name: string;
  summary: string;
  /** What the example demonstrates — rendered as a bullet list. */
  shows: string[];
  /** A copy-paste usage snippet for the doc page. */
  usage: string;
  node: ReactNode;
};

/**
 * Complete example apps — multi-screen compositions of the real components,
 * runnable at /examples/<slug> (and installable on glasses via the docs QR).
 * The visual suite screenshots these too (e2e/visual.spec.ts).
 */
export const EXAMPLES: Example[] = [
  {
    slug: "workout",
    name: "Workout",
    summary:
      "A fitness companion: list → live session → rest timer, with a destructive end-confirm that seeds the ring on the safe action.",
    shows: [
      "Navigator hierarchy with focus memory (pop lands on the row you came from)",
      "Screen status slot (live GPS dot) and the one-task-per-view rhythm",
      "Timer with pause/resume; EmptyState for unvisited history",
      "Confirm destructive: a blind pinch can't end the run",
    ],
    usage:
      'import { WorkoutApp } from "@/components/glasskit/workout";\n\nexport default function Page() {\n  return <WorkoutApp />;\n}',
    node: <WorkoutApp />,
  },
  {
    slug: "messages",
    name: "Messages",
    summary:
      "An inbox: thread list to conversation, replying through ComposeFlow's picker, the realistic text path on a keyboard-less platform.",
    shows: [
      "Navigator push with params (the thread you opened)",
      "ComposeFlow reply: back gesture closes the picker, not the app",
      "ChatBubble thread + an accent Toast confirming the send",
      "List rows with Avatar leading slots",
    ],
    usage:
      'import { MessagesApp } from "@/components/glasskit/messages";\n\nexport default function Page() {\n  return <MessagesApp />;\n}',
    node: <MessagesApp />,
  },
];

export function getExample(slug: string): Example | undefined {
  return EXAMPLES.find((e) => e.slug === slug);
}
