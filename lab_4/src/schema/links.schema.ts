import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types, Document } from 'mongoose';

interface Link {
    original: string;
    cut: string;
  }

@Schema({ collection: 'Links' })
export class Links {
  @Prop({ type: Object, required: true })
  link: Link;
  
  @Prop({ type: Date})
  expiredAt: Date;

  @Prop({ required: true })
  apiKey: string;
}

export const LinkSchema = SchemaFactory.createForClass(Links);

export type LinkLeanDoc = Links & { _id: Types.ObjectId };
export type LinksDoc = Links & Document;
