import { IsNotEmpty, IsString } from 'class-validator';

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phone: string;
}
