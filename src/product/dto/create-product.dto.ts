import { IsString } from 'class-validator';

export class CreateProductDTO {

  @IsString()
  productName: string;

  @IsString()
  price: string;
}