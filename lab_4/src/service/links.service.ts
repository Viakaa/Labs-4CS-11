import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { LinksDto} from '../models';
import { LinksDoc, Links} from '../schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LinksService {
  constructor(
    @InjectModel(Links.name)
    private readonly linksModel: Model<LinksDoc>,
  ) {}
   
  async createLinksObject(apiKey: string,body: LinksDto) {
    const newLink = new this.linksModel({
        link: {
            original: body.originalLink,
            cut: body.shortLink,
        },
        expiredAt: body.expiredAt,
        apiKey: apiKey,
    });

    const createdLink = await newLink.save();
    return createdLink;
}

async getLinks(apiKey: string, gtExpiredAt?: Date, ltExpiredAt?: Date): Promise<LinksDoc[]> {
  let query: any = { apiKey };

  if (gtExpiredAt && ltExpiredAt) {
    query.expiredAt = {
      $gt: new Date(gtExpiredAt),
      $lt: new Date(ltExpiredAt),
    };
  } else if (gtExpiredAt) {
    query.expiredAt = { $gt: new Date(gtExpiredAt) };
  } else if (ltExpiredAt) {
    query.expiredAt = { $lt: new Date(ltExpiredAt) };
  }

  return this.linksModel.find(query).exec();
}

async getLinkByCut(cut: string): Promise<any> {
  const link = await this.linksModel.findOne({"link.cut": cut }).exec();
  return link
}


}