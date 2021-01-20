import {Tag} from './tag';

export class GiftCertificate {
  id: number;
  name: string;
  description: string;
  price: number;
  createDate: Date;
  lastUpdateDate: Date;
  durationInDays: number;
  tags: Tag[] = [];
}
