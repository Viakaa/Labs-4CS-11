import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional,IsUrl } from '@nestjs/class-validator';

export class LinksDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  @IsUrl()
  originalLink: string;

  @ApiProperty({ type: String })
  @IsOptional()
  @IsNotEmpty()
  @IsUrl()
  shortLink: string;

  @ApiProperty({ type: Date })
  @IsOptional()
  @IsNotEmpty()
  expiredAt: Date;
}
