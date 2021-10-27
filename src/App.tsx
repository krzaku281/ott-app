import { BrowserRouter } from 'react-router-dom';
import MainRouter from 'routers/MainRouter';
import styles from './App.module.css';
import { AuthProvider } from 'contexts/AuthContext';

function App() {
  return (
    <BrowserRouter basename={''}>
      <div className={styles.background}>
        <AuthProvider>
          <MainRouter />
        </AuthProvider>
      </div>
    </BrowserRouter>
  );
}

export default App;
