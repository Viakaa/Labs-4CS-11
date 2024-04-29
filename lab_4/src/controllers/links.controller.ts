import { BadRequestException, Body, Controller, Post, Headers, UnauthorizedException, Get, Query, Redirect, Param, Res } from '@nestjs/common';
import { LinksService } from '../service';
import { LinksDto } from '../models';

@Controller({ path: '/links' })
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post('/')
  async CreateLinksObject(@Body() body: LinksDto, @Headers('authorization') apiKey: string) {
    if (!apiKey) {
      throw new UnauthorizedException('User is not authorized');
    }

    const shortLink = this.generateShortLink();
    const expiredAt = new Date();
    expiredAt.setDate(expiredAt.getDate() + 5);

    try {
      const createdLink = await this.linksService.createLinksObject(apiKey,{
        originalLink: body.originalLink,
        shortLink,
        expiredAt,
      });

      return { shortLink: createdLink.link.cut, expiredAt };
    } catch (error) {
      console.log(error)
      throw new BadRequestException('Failed to create link');
    }
  }

  private generateShortLink(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortLink = '';
    for (let i = 0; i < 15; i++) {
      shortLink += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortLink;
  }

  @Get('/')
async GetLinks(
  @Headers('authorization') apiKey: string,
  @Query('expiredAt[gt]') gtExpiredAt: Date,
  @Query('expiredAt[lt]') ltExpiredAt: Date,
): Promise<any> {
  if (!apiKey) {
    throw new UnauthorizedException('User is not authorized');
  }

  try {
    return await this.linksService.getLinks(apiKey, gtExpiredAt, ltExpiredAt);
  } catch (error) {
    throw new BadRequestException('Failed to retrieve links');
  }
}

  

@Get('/shortLink/:cut')
async redirect(@Res() res, @Param('cut') cut: string) {
  try {
    const link = await this.linksService.getLinkByCut(cut);

    if (!link) {
      throw new BadRequestException('Short link was not found.');
    }
    if (link.expiredAt && link.expiredAt < new Date()) {
      throw new BadRequestException('Link was expired.');
    }

    res.redirect(link.link.original);
  } catch (error) {
    console.log(error);
    throw new BadRequestException(error.message);
  }
}
}
