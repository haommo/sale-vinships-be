import { ApiProperty } from '@nestjs/swagger';

export class StatusCountDto {
  @ApiProperty()
  status: string;

  @ApiProperty()
  count: number;
}

export class SourceCountDto {
  @ApiProperty()
  source: string;

  @ApiProperty()
  count: number;
}

export class PlatformCountDto {
  @ApiProperty()
  platform: string;

  @ApiProperty()
  count: number;
}

export class RecentActivityDto {
  @ApiProperty()
  action: string;

  @ApiProperty()
  leadName: string;

  @ApiProperty()
  userName: string;

  @ApiProperty()
  timestamp: Date;
}

export class TopPerformerDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  leadsProcessed: number;
}

export class DashboardStatsDto {
  @ApiProperty()
  totalLeads: number;

  @ApiProperty()
  newLeadsToday: number;

  @ApiProperty()
  conversionRate: number;

  @ApiProperty()
  activeEmployees: number;

  @ApiProperty({ type: [StatusCountDto] })
  leadsByStatus: StatusCountDto[];

  @ApiProperty({ type: [SourceCountDto] })
  leadsBySource: SourceCountDto[];

  @ApiProperty({ type: [PlatformCountDto] })
  leadsByPlatform: PlatformCountDto[];

  @ApiProperty({ type: [TopPerformerDto] })
  topPerformers: TopPerformerDto[];
}
