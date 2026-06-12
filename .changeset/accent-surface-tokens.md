---
"@glasskit-ui/react": minor
---

The accent ramp is now the complete theming contract.

Primary "on" surfaces (Button primary, Toggle on-track, Segmented on, Badge
accent, Toast accent, Toaster action, ChatBubble me) hardcoded their blue
gradient and depth shadow — retheming `--accent` recolored focus rings but
left every filled surface blue. New tokens close the gap:

- `--accent-grad-hi` / `--accent-grad-lo` — the primary-surface gradient stops
- `--accent-surface` — the derived filled treatment (override the stops)
- `--accent-glow` / `--accent-glow-strong` — the accent-tinted depth shadows

Defaults are byte-identical to the previous literals, so existing apps render
unchanged. Toasts portal outside `.glass-viewport`; when retheming, re-declare
the grad stops on `:root` too so toast action buttons match the lens.
