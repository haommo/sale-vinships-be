import {
  IsNotEmpty,
  IsOptional,
  IsEmail,
  IsEnum,
  IsArray,
  IsString,
  IsDateString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { LeadStatus } from '@prisma/client';

export class CreateLeadDto {
  @ApiProperty({ example: 'Tech Startup Inc' })
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ example: 'Tech Startup Inc' })
  @IsOptional()
  company?: string;

  @ApiPropertyOptional({ example: 'https://techstartup.com' })
  @IsOptional()
  website?: string;

  @ApiPropertyOptional({ example: 'CA', description: 'US State code' })
  @IsOptional()
  region?: string;

  @ApiPropertyOptional({ example: 'Technology' })
  @IsOptional()
  industry?: string;

  @ApiPropertyOptional({
    example: 'facebook',
    description: 'Platform (facebook, google, zalo, etc.)',
  })
  @IsOptional()
  @IsString()
  platform?: string;

  @ApiPropertyOptional({
    example: 'search',
    description: 'Source (search, ads, referral, etc.)',
  })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiPropertyOptional({ enum: LeadStatus, default: LeadStatus.NEW })
  @IsOptional()
  @IsEnum(LeadStatus)
  status?: LeadStatus;

  @ApiPropertyOptional({ example: '2024-12-31' })
  @IsOptional()
  @IsDateString()
  nextActionDate?: string;

  @ApiPropertyOptional({
    type: [String],
    example: ['email1@example.com', 'email2@example.com'],
  })
  @IsOptional()
  @IsArray()
  @IsEmail({}, { each: true })
  emails?: string[];

  @ApiPropertyOptional({ type: [String], example: ['+1234567890'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  phones?: string[];

  @ApiPropertyOptional({ type: [String], example: ['keyword1', 'keyword2'] })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  keywords?: string[];

  @ApiPropertyOptional({ type: [String], description: 'Initial notes' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  notes?: string[];
}
