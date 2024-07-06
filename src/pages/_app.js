import { QuestionsProvider } from '@/context/GlobalProvider';
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
  <QuestionsProvider >
    <div className=' font-ClashDisplay'>
  <Component {...pageProps} />
  </div>
  </QuestionsProvider>
  );
}
