// Imports
import AppRouter from '@/routes/AppRouter';
import { LanguageProvider } from '@/i18n';

// Componente principal

/**
 * App: Componente raíz de React.
 * Su única responsabilidad en esta arquitectura es instanciar el Router principal.
 * Cualquier proveedor global de estado (Context, Redux, etc.) debería envolver a este componente.
 */
const App = () => {
  // Render
  return (
    <LanguageProvider>
      <AppRouter />
    </LanguageProvider>
  );
};

export default App;
