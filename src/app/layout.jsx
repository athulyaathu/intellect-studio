import '../index.css';

export const metadata = {
  title: 'Intellect Studio',
  description: 'Creative Design & Development Studio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
