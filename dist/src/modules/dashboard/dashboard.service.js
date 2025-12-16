"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DashboardService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DashboardService = class DashboardService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getStats() {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const [totalLeads, newLeadsToday, closedLeads, activeEmployees, leadsByStatus, leadsBySource, leadsByPlatform, topPerformers,] = await Promise.all([
            this.prisma.lead.count(),
            this.prisma.lead.count({
                where: { createdAt: { gte: today } },
            }),
            this.prisma.lead.count({
                where: { status: 'CLOSED' },
            }),
            this.prisma.user.count({
                where: { status: 'ACTIVE' },
            }),
            this.prisma.lead.groupBy({
                by: ['status'],
                _count: { status: true },
            }),
            this.prisma.lead.groupBy({
                by: ['source'],
                _count: { source: true },
            }),
            this.prisma.lead.groupBy({
                by: ['platform'],
                _count: { platform: true },
            }),
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
        const conversionRate = totalLeads > 0
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
        const trendMap = new Map();
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
    async getUserPerformance(userId) {
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
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DashboardService);
//# sourceMappingURL=dashboard.service.js.map