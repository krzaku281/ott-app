import React, { useEffect } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import { useFetch } from 'hooks/useFetch';
import { signIn, SignInResponse } from 'api/authorizationApi';
import styles from './SplashPage.module.css';
import ErrorModal from 'components/ErrorModal';
import { DeviceUUID } from 'device-uuid';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

export default function SplashPage() {
  const [payload, setPayload] = React.useState<RequestInit | undefined>(undefined);
  const [authData, loading, error] = useFetch<SignInResponse>(signIn.url, payload);
  const history = useHistory();
  const auth = useAuth();

  const handleAnonymousLogIn = () => {
    setPayload(signIn.preparePayload('WEB', new DeviceUUID().get()));
  };

  const handleCredentialsLogIn = () => {
    history.push('/login');
  };

  useEffect(() => {
    if (authData) {
      auth.setTokenExpires(new Date(authData?.AuthorizationToken.TokenExpires));
      auth.setToken(authData?.AuthorizationToken.Token);
      history.push('/');
    }
  }, [authData]);

  return (
    <div className={styles.background}>
      <Container fluid className="d-flex h-100 justify-content-center align-items-center">
        {loading ? (
          <Spinner animation="border" variant="primary"></Spinner>
        ) : (
          <Card className={styles.centeredCard}>
            <h1 className="font-weight-bold text-center animate__animated animate__backInDown">Video Player</h1>
            <div className="d-flex justify-content-around mt-4">
              <Button
                onClick={handleAnonymousLogIn}
                size="lg"
                className="animate__animated animate__backInUp"
                variant="secondary"
              >
                Anonymous
              </Button>
              <Button
                onClick={handleCredentialsLogIn}
                size="lg"
                className="animate__animated animate__backInUp"
                variant="primary"
              >
                Log in
              </Button>
            </div>
          </Card>
        )}
      </Container>
      <ErrorModal error={error} />
    </div>
  );
}
