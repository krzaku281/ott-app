import React, { useEffect, useState } from 'react';
import { Container, Card, Form, Spinner, Button } from 'react-bootstrap';
import { useFetch } from 'hooks/useFetch';
import { signIn, SignInResponse } from 'api/authorizationApi';
import styles from './LoginPage.module.css';
import ErrorModal from 'components/ErrorModal';
import { DeviceUUID } from 'device-uuid';
import { useHistory } from 'react-router-dom';
import { useAuth } from 'contexts/AuthContext';

export default function LoginPage() {
  const [username, setUsername] = useState<string>('test@bsgroup.eu');
  const [password, setPassword] = useState<string>('Test12!@');
  const [payload, setPayload] = useState<RequestInit | undefined>(undefined);
  const [authData, loading, error] = useFetch<SignInResponse>(signIn.url, payload);
  const history = useHistory();
  const auth = useAuth();

  const handleCredentialsLogIn = () => {
    setPayload(signIn.preparePayload('WEB', new DeviceUUID().get(), username, password));
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
            <Form>
              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter username"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  type="password"
                  placeholder="Enter password"
                />
              </Form.Group>

              <Button onClick={handleCredentialsLogIn} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
        )}
      </Container>
      <ErrorModal error={error} />
    </div>
  );
}
