import { BadRequestException, Controller, Get } from '@nestjs/common';
import { PartsService } from '../service/parts.service';

@Controller('parts')
export class PartsController {
  constructor(private readonly partsService: PartsService) {}

  @Get('/')
  async getRandomPart(): Promise<any> {
    try {
      const randomPart = await this.partsService.getRandomPart();
      return randomPart;
    } catch (error) {
      console.error(`Error generating part: ${error.message}`);
      throw new BadRequestException('Failed to generate part');
    }
  }
}
