import './globals.css'
import { UserProvider } from './context/UserContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body>
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
