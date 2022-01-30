import { ApiProperty } from '@nestjs/swagger';

export class CreateCustomerDto {
  @ApiProperty({ example: 'Ideal' })
  name: string;

  @ApiProperty({ example: '31749596000150' })
  documentNumber: string;

  @ApiProperty({ example: '2018-10-11T00:00:00.000Z' })
  birthDate: Date;

  @ApiProperty({ example: true })
  active: boolean;
}
