import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Dashboard')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Get dashboard statistics' })
  async getStats() {
    return this.dashboardService.getStats();
  }

  @Get('trend')
  @ApiOperation({ summary: 'Get leads trend (last 30 days)' })
  async getLeadsTrend() {
    return this.dashboardService.getLeadsTrend();
  }

  @Get('user/:id')
  @ApiOperation({ summary: 'Get user performance stats' })
  async getUserPerformance(@Param('id') id: string) {
    return this.dashboardService.getUserPerformance(id);
  }
}
