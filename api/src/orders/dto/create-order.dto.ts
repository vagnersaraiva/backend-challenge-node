import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: '61f56817f4c04b8e37cf6a69' })
  customerId: string;

  @ApiProperty({ example: '61f56c17d9c1cac75184c5bc' })
  productId: string;

  @ApiProperty({ example: 7.11 })
  purchaseAmount: number;

  @ApiProperty({ example: 10 })
  purchaseQuantity: number;

  @ApiProperty({ example: 71.1 })
  purchaseTotalAmount: number;

  @ApiProperty({ example: '2022-01-29T00:00:00.000Z' })
  orderDate: Date;
}
