import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import { useFetch } from 'hooks/useFetch';
import { getMediaList, GetMediaListResponse } from 'api/mediaApi';
import styles from './HomePage.module.css';
import ErrorModal from 'components/ErrorModal';
import MediaListTypes from 'pages/homePage/mediaListTypes/MediaListTypes';
import MediaComponent from 'pages/homePage/mediaComponent/MediaComponent';
import Pagination from 'react-js-pagination';

export default function HomePage() {
  const [page, setPage] = useState<number>(1);
  const [mediaListId, setMediaListId] = useState<number>(2);
  const pageSize = 15;

  const [payload, setPayload] = useState<RequestInit | undefined>(
    getMediaList.preparePayload(mediaListId, page, pageSize)
  );
  const [media, loading, error] = useFetch<GetMediaListResponse>(getMediaList.url, payload);

  const handleMediaListChange = (mediaListId: number) => {
    setMediaListId(mediaListId);
    setPage(1);
  };

  useEffect(() => {
    setPayload(getMediaList.preparePayload(mediaListId, page, pageSize));
  }, [page, mediaListId]);

  return (
    <div className={styles.background}>
      <Container fluid>
        <Row>
          <Col>
            <MediaListTypes mediaListId={mediaListId} handleMediaListChange={handleMediaListChange} />
          </Col>
        </Row>
        {loading ? (
          <Row className="justify-content-center">
            <Spinner animation="border" variant="primary"></Spinner>
          </Row>
        ) : (
          <Row>{media && media.Entities.map(entity => <MediaComponent key={entity.Id} entity={entity} />)}</Row>
        )}
        {media && media.TotalCount > 15 ? (
          <Row>
            <Pagination
              innerClass={styles.paginationJustifyCenter + ' pagination'}
              activePage={page}
              itemsCountPerPage={pageSize}
              totalItemsCount={media.TotalCount}
              pageRangeDisplayed={5}
              onChange={(pageNumber: number) => setPage(pageNumber)}
              itemClass="page-item"
              linkClass="page-link"
            />
          </Row>
        ) : null}
      </Container>
      <ErrorModal error={error} />
    </div>
  );
}
