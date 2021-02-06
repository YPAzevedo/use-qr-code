import "./styles.css";
import useQrCode from "./useQrCode";

export default function App() {
  const [canvasRef, { downloadQrCode, printQrCode }] = useQrCode(
    "http://www.google.com",
    {
      filename: "useQrCode",
      width: 400
    }
  );

  return (
    <div className="App">
      <h1>useQrCode</h1>
      <h2>Print and download your QR Code</h2>
      <canvas id="qrcode" ref={canvasRef} />
      <div>
        <button onClick={printQrCode}>Print</button>
        <button onClick={downloadQrCode}>Download</button>
      </div>
    </div>
  );
}
