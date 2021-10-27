import React from 'react';
import { ButtonGroup, ToggleButton } from 'react-bootstrap';

interface IMediaListTypesProps {
  mediaListId: number;
  handleMediaListChange: (mediaListId: number) => void;
}

export default function MediaListTypes({ mediaListId, handleMediaListChange }: IMediaListTypesProps) {
  const mediaList = [2, 3, 4, 5, 6, 7];
  return (
    <>
      <h3 className="text-center">Media List Types</h3>
      <ButtonGroup className="d-block m-3 text-center">
        {mediaList.map(media => (
          <ToggleButton
            key={media}
            id={`media-list-${media}`}
            type="radio"
            name="media-list"
            value={media}
            checked={mediaListId === media}
            onChange={e => handleMediaListChange(+e.currentTarget.value)}
          >
            {media}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </>
  );
}
