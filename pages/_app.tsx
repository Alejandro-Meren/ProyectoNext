import { AppProps } from 'next/app';
import { ThemeProvider } from 'next-themes';
import '../app/ui/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;