export const metadata = {
  title: "PredictHer",
  description: "Track her Periods",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="vsc-initialized">{children}</body>
    </html>
  );
}