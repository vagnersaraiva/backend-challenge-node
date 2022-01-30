import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ example: 'CPLE6' })
  name: string;

  @ApiProperty({ example: true })
  active: boolean;
}
