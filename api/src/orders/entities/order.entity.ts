import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop()
  customerId: string;

  @Prop()
  productId: string;

  @Prop()
  purchaseAmount: number;

  @Prop()
  purchaseQuantity: number;

  @Prop()
  purchaseTotalAmount: number;

  @Prop()
  orderDate: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
