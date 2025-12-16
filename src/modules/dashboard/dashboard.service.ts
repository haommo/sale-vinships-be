import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { DashboardStatsDto } from './dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(): Promise<DashboardStatsDto> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [
      totalLeads,
      newLeadsToday,
      closedLeads,
      activeEmployees,
      leadsByStatus,
      leadsBySource,
      leadsByPlatform,
      topPerformers,
    ] = await Promise.all([
      // Total leads
      this.prisma.lead.count(),

      // New leads today
      this.prisma.lead.count({
        where: { createdAt: { gte: today } },
      }),

      // Closed leads (for conversion rate)
      this.prisma.lead.count({
        where: { status: 'CLOSED' },
      }),

      // Active employees
      this.prisma.user.count({
        where: { status: 'ACTIVE' },
      }),

      // Leads by status
      this.prisma.lead.groupBy({
        by: ['status'],
        _count: { status: true },
      }),

      // Leads by source
      this.prisma.lead.groupBy({
        by: ['source'],
        _count: { source: true },
      }),

      // Leads by platform
      this.prisma.lead.groupBy({
        by: ['platform'],
        _count: { platform: true },
      }),

      // Top performers
      this.prisma.user.findMany({
        where: {
          status: 'ACTIVE',
          role: 'SALES',
        },
        orderBy: { leadsProcessed: 'desc' },
        take: 5,
        select: {
          id: true,
          name: true,
          email: true,
          leadsProcessed: true,
        },
      }),
    ]);

    const conversionRate =
      totalLeads > 0
        ? Math.round((closedLeads / totalLeads) * 100 * 10) / 10
        : 0;

    return {
      totalLeads,
      newLeadsToday,
      conversionRate,
      activeEmployees,
      leadsByStatus: leadsByStatus.map((item) => ({
        status: item.status,
        count: item._count.status,
      })),
      leadsBySource: leadsBySource.map((item) => ({
        source: item.source,
        count: item._count.source,
      })),
      leadsByPlatform: leadsByPlatform.map((item) => ({
        platform: item.platform,
        count: item._count.platform,
      })),
      topPerformers,
    };
  }

  // Get leads trend data (last 30 days)
  async getLeadsTrend() {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const leads = await this.prisma.lead.findMany({
      where: {
        createdAt: { gte: thirtyDaysAgo },
      },
      select: {
        createdAt: true,
        status: true,
      },
    });

    // Group by date
    const trendMap = new Map<string, { total: number; closed: number }>();

    leads.forEach((lead) => {
      const dateKey = lead.createdAt.toISOString().split('T')[0];
      const existing = trendMap.get(dateKey) || { total: 0, closed: 0 };
      existing.total += 1;
      if (lead.status === 'CLOSED') {
        existing.closed += 1;
      }
      trendMap.set(dateKey, existing);
    });

    const trend = Array.from(trendMap.entries())
      .map(([date, data]) => ({
        date,
        total: data.total,
        closed: data.closed,
      }))
      .sort((a, b) => a.date.localeCompare(b.date));

    return trend;
  }

  // Get user performance stats
  async getUserPerformance(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        leadsProcessed: true,
        _count: {
          select: {
            leads: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    const leadsByStatus = await this.prisma.lead.groupBy({
      by: ['status'],
      where: { userId },
      _count: { status: true },
    });

    return {
      ...user,
      totalLeads: user._count.leads,
      leadsByStatus: leadsByStatus.map((item) => ({
        status: item.status,
        count: item._count.status,
      })),
    };
  }
}
