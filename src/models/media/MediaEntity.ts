import { Image } from 'models/media/Image';
import { Product } from 'models/media/Product';

export class MediaEntity {
  Id: number;
  Guid: string;
  MediaTypeCode: string;
  MediaTypeDisplayName: string;
  MediaAgeRestrictionValueMin: number;
  MediaAgeRestrictionImageUrl: string;
  Title: string;
  Description: string;
  Year: number;
  Duration: number;
  IsTrialContentAvailable: boolean;
  AvailableFrom: string;
  Images: Array<Image>;
  Products: Array<Product>;
}
