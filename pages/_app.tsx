import type { AppProps } from 'next/app';
import { FaustProvider } from '@faustwp/core';
import { client } from '../src/lib/faust';
import { ThemeProvider } from '../src/components/ThemeContext';
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <FaustProvider client={client} pageProps={pageProps}>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </FaustProvider>
  );
}
