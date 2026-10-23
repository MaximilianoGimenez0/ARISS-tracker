import AppRouter from '@/routes/AppRouter';
import { LanguageProvider } from '@/i18n';

const App = () => {
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
};

export default App;
