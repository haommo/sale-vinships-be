import { PartialType, OmitType } from '@nestjs/swagger';
import { IsOptional, MinLength } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(
  OmitType(CreateUserDto, ['password'] as const),
) {
  @IsOptional()
  @MinLength(6)
  password?: string;
}
