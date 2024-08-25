import "./globals.css";
import Navbar from "../components/Navbar";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
