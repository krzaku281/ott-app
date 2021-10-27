import { Storage } from 'storage/localStorage';

export const baseHeaders: HeadersInit = {
  'Content-Type': 'application/json',
};

export const oAuthHeaders = (): HeadersInit => {
  return {
    Authorization: 'Bearer ' + Storage.get('token'),
    ...baseHeaders,
  };
};
