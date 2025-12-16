import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddNoteDto {
  @ApiProperty({ example: 'Followed up via email' })
  @IsNotEmpty()
  @IsString()
  content: string;
}
