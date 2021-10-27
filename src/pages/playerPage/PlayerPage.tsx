import React, { useState } from 'react';
import { Container, Row, Button, Spinner, Card } from 'react-bootstrap';
import { useFetch } from 'hooks/useFetch';
import { getMediaPlayInfo, GetMediaPlayInfoResponse } from 'api/mediaApi';
import ErrorModal from 'components/ErrorModal';
import { useHistory } from 'react-router-dom';
import ReactHlsPlayer from 'react-hls-player';
import styles from './PlayerPage.module.css';
import Placeholder from 'assets/images/image-placeholder.jpg';

interface IPlayerPageProps {
  match: any;
}

export default function PlayerPage({ match }: IPlayerPageProps) {
  const [payload] = useState<RequestInit | undefined>(getMediaPlayInfo.preparePayload(+match.params.mediaId, 'TRIAL'));
  const [media, loading, error] = useFetch<GetMediaPlayInfoResponse>(getMediaPlayInfo.url, payload);
  const playerRef = React.useRef<HTMLVideoElement>(null);

  const history = useHistory();

  return (
    <div>
      <Container fluid>
        {loading ? (
          <Row className="justify-content-center">
            <Spinner animation="border" variant="primary"></Spinner>
          </Row>
        ) : (
          <>
            <Row>
              <Card className="w-100">
                <Card.Body>
                  <Card.Title className="text-center">{media?.Title}</Card.Title>
                  <div className="justify-content-center d-flex">
                    {media?.ContentUrl ? (
                      <ReactHlsPlayer
                        className={styles.video}
                        src={media?.ContentUrl || ''}
                        autoPlay={true}
                        playerRef={playerRef}
                        hlsConfig={{
                          maxLoadingDelay: 4,
                          minAutoBitrate: 0,
                          lowLatencyMode: true,
                        }}
                      />
                    ) : (
                      <Card.Img className={styles.image} src={Placeholder} />
                    )}
                  </div>
                  <Card.Subtitle>{media?.Description}</Card.Subtitle>
                </Card.Body>
                <Button onClick={() => history.push('/')} variant="primary">
                  Back
                </Button>
              </Card>
            </Row>
          </>
        )}
      </Container>
      <ErrorModal error={error} />
    </div>
  );
}
