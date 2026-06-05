import QRCode from "qrcode";

/**
 * Generate a QR code as inline SVG markup (server-side, at build). Used by the
 * "open on your glasses" popover to deep-link to a full-screen live preview.
 */
export function qrSvg(text: string): Promise<string> {
  return QRCode.toString(text, {
    type: "svg",
    margin: 1,
    errorCorrectionLevel: "M",
    color: { dark: "#14161a", light: "#ffffff" },
  });
}
