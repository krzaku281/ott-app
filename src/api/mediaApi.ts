import { oAuthHeaders } from 'api/settings';
import { MediaEntity } from 'models/media/MediaEntity';

export const getMediaList = {
  url: process.env.REACT_APP_API_URL + '/Media/GetMediaList',
  preparePayload: (
    mediaListId: number,
    pageNumber: number,
    pageSize: number,
    includeCategories: boolean = false,
    includeImages: boolean = true,
    includeMedia: boolean = false
  ): RequestInit => {
    return {
      method: 'POST',
      headers: oAuthHeaders(),
      body: JSON.stringify({
        MediaListId: mediaListId,
        IncludeCategories: includeCategories,
        IncludeImages: includeImages,
        IncludeMedia: includeMedia,
        PageNumber: pageNumber,
        PageSize: pageSize,
      }),
    };
  },
};

export const getMediaPlayInfo = {
  url: process.env.REACT_APP_API_URL + '/Media/GetMediaPlayInfo',
  preparePayload: (mediaId: number, streamType: string): RequestInit => {
    return {
      method: 'POST',
      headers: oAuthHeaders(),
      body: JSON.stringify({
        MediaId: mediaId,
        StreamType: streamType,
      }),
    };
  },
};

//getmedialist response

export class GetMediaListResponse {
  CacheDataValidTo: string;
  SourceType: string;
  Entities: Array<MediaEntity>;
  PageSize: number;
  PageNumber: number;
  TotalCount: number;
}

// getmediaplayinfo
export class GetMediaPlayInfoResponse {
  MediaId: number;
  Title: string;
  Description: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  StreamId: number;
  Provider: string;
  ContentUrl: string;
}
