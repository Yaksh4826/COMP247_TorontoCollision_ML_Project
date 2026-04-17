import "./globals.css";

export const metadata = {
  title: "Collision Risk Predictor",
  description: "Predict KSI accident severity using ML models — Toronto collision data",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full" style={{ background: "#f5f7ff", color: "#0f172a" }}>{children}</body>
    </html>
  );
}
