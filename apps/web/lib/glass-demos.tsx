import type { ReactNode } from "react";
import {
  AsyncViewDemo,
  ButtonDemo,
  CallCardDemo,
  CompassDemo,
  ConfirmDemo,
  DeckDemo,
  DictationDemo,
  DirectionArrowDemo,
  LauncherDemo,
  ListDemo,
  NavigatorDemo,
  NotificationCardDemo,
  NowPlayingDemo,
  PermissionPromptDemo,
  ProgressDemo,
  QuickReplyChipsDemo,
  ReticleDemo,
  SegmentedDemo,
  SliderDemo,
  StepperDemo,
  TabsDemo,
  TextFieldDemo,
  ToastDemo,
  ToggleDemo,
  ViewfinderDemo,
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
  confirm: <ConfirmDemo />,
  deck: <DeckDemo />,
  dictation: <DictationDemo />,
  "direction-arrow": <DirectionArrowDemo />,
  launcher: <LauncherDemo />,
  list: <ListDemo />,
  navigator: <NavigatorDemo />,
  "notification-card": <NotificationCardDemo />,
  "now-playing": <NowPlayingDemo />,
  "permission-prompt": <PermissionPromptDemo />,
  progress: <ProgressDemo />,
  "quick-reply-chips": <QuickReplyChipsDemo />,
  reticle: <ReticleDemo />,
  segmented: <SegmentedDemo />,
  slider: <SliderDemo />,
  stepper: <StepperDemo />,
  tabs: <TabsDemo />,
  "text-field": <TextFieldDemo />,
  toast: <ToastDemo />,
  toggle: <ToggleDemo />,
  viewfinder: <ViewfinderDemo />,
};

export function getGlassDemo(slug: string): ReactNode | undefined {
  return GLASS_DEMOS[slug];
}
