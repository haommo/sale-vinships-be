import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AssignLeadDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  userId: string;
}
