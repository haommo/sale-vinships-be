import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class LeadNoteDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  content: string;

  @ApiPropertyOptional()
  authorId?: string;

  @ApiPropertyOptional()
  authorName?: string;

  @ApiProperty()
  createdAt: string;
}

export class LeadAssignedToDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;
}

export class LeadResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  company?: string;

  @ApiPropertyOptional()
  website?: string;

  @ApiPropertyOptional()
  region?: string;

  @ApiPropertyOptional()
  industry?: string;

  @ApiProperty()
  platform: string;

  @ApiProperty()
  source: string;

  @ApiProperty()
  status: string;

  @ApiPropertyOptional()
  nextActionDate?: Date;

  @ApiPropertyOptional({ type: LeadAssignedToDto })
  assignedTo?: LeadAssignedToDto;

  @ApiProperty({ type: [String] })
  emails: string[];

  @ApiProperty({ type: [String] })
  phones: string[];

  @ApiProperty({ type: [String] })
  keywords: string[];

  @ApiProperty({ type: [LeadNoteDto] })
  notes: LeadNoteDto[];

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export class PaginationMetaDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  page: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  totalPages: number;
}

export class PaginatedLeadsResponseDto {
  @ApiProperty({ type: [LeadResponseDto] })
  data: LeadResponseDto[];

  @ApiProperty({ type: PaginationMetaDto })
  meta: PaginationMetaDto;
}
