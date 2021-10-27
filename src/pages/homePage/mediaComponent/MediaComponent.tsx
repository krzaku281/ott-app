import React from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import { MediaEntity } from 'models/media/MediaEntity';
import Placeholder from 'assets/images/image-placeholder.jpg';
import { useHistory } from 'react-router-dom';

interface IMediaEntityProps {
  entity: MediaEntity;
}

export default function MediaComponent({ entity }: IMediaEntityProps) {
  const history = useHistory();

  return (
    <>
      {entity ? (
        <Col sm={3} className="mb-3">
          <Card className="h-100">
            <Card.Img variant="top" src={entity.Images[0] ? entity.Images[0].Url : Placeholder} />
            <Card.Body>
              <Card.Title>{entity.Title}</Card.Title>
              {entity.Description && (
                <Card.Text>
                  {entity.Description.length < 120 ? entity.Description : entity.Description.substring(0, 117) + '...'}
                </Card.Text>
              )}
              <Button onClick={() => history.push('/player/' + entity.Id)} variant="primary">
                Player
              </Button>
            </Card.Body>
          </Card>
        </Col>
      ) : null}
    </>
  );
}
