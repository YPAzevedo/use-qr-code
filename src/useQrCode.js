import QRCode from "qrcode";
import { useCallback, useLayoutEffect, useRef } from "react";

import useLiveRef from "./useLiveRef";

const DEFAULT_QRCODE_OPTIONS = { width: 400, filename: "QRCode" };

export default function useQrCode(
  code,
  { filename, ...qrCodeOptions } = DEFAULT_QRCODE_OPTIONS
) {
  const canvasRef = useRef(null);
  const optionsRef = useLiveRef(qrCodeOptions);

  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const currentOptions = optionsRef.current;
    QRCode.toCanvas(canvas, code, currentOptions).catch((error) => {
      console.error(error);
    });
  }, [code, optionsRef]);

  const toDataUrl = useCallback(() => QRCode.toDataURL(code), [code]);

  const downloadQrCode = useCallback(async () => {
    const url = await toDataUrl();
    const link = document.createElement("a");
    link.setAttribute("download", `${filename}.png`);
    link.setAttribute("href", url);
    link.click();
  }, [toDataUrl, filename]);

  const printQrCode = useCallback(async () => {
    const url = await toDataUrl();
    const win = window.open("");
    win.document.write(
      `<img src="${url}" onload="window.print();window.close()" />`
    );
  }, [toDataUrl]);

  return [canvasRef, { toDataUrl, downloadQrCode, printQrCode }];
}
