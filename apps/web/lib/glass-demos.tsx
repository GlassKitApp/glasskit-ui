import type { ReactNode } from "react";
import {
  AsyncViewDemo,
  ButtonDemo,
  CallCardDemo,
  CompassDemo,
  ComposeFlowDemo,
  ConfirmDemo,
  DeckDemo,
  EmptyStateDemo,
  DirectionArrowDemo,
  LauncherDemo,
  ListDemo,
  NavigatorDemo,
  NotificationCardDemo,
  NowPlayingDemo,
  PermissionPromptDemo,
  ProgressDemo,
  QuickReplyChipsDemo,
  SegmentedDemo,
  SliderDemo,
  StepperDemo,
  TabsDemo,
  TimerDemo,
  ToasterDemo,
  ToggleDemo,
} from "@/components/glass-demos/demos";

/**
 * slug → interactive glass-app demo. A slug with an entry here renders a
 * working screen (state + live hooks) in /preview/<slug> and on its docs page;
 * anything else falls back to the static `doc.preview` node — pure-display
 * components need no entry.
 */
const GLASS_DEMOS: Record<string, ReactNode> = {
  "async-view": <AsyncViewDemo />,
  button: <ButtonDemo />,
  "call-card": <CallCardDemo />,
  compass: <CompassDemo />,
  "compose-flow": <ComposeFlowDemo />,
  confirm: <ConfirmDemo />,
  deck: <DeckDemo />,
  "direction-arrow": <DirectionArrowDemo />,
  "empty-state": <EmptyStateDemo />,
  launcher: <LauncherDemo />,
  list: <ListDemo />,
  navigator: <NavigatorDemo />,
  "notification-card": <NotificationCardDemo />,
  "now-playing": <NowPlayingDemo />,
  "permission-prompt": <PermissionPromptDemo />,
  progress: <ProgressDemo />,
  "quick-reply-chips": <QuickReplyChipsDemo />,
  segmented: <SegmentedDemo />,
  slider: <SliderDemo />,
  stepper: <StepperDemo />,
  tabs: <TabsDemo />,
  timer: <TimerDemo />,
  toaster: <ToasterDemo />,
  toggle: <ToggleDemo />,
};

export function getGlassDemo(slug: string): ReactNode | undefined {
  return GLASS_DEMOS[slug];
}
