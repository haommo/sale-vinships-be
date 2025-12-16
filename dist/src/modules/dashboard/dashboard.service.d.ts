import { PrismaService } from '../../prisma/prisma.service';
import { DashboardStatsDto } from './dto';
export declare class DashboardService {
    private prisma;
    constructor(prisma: PrismaService);
    getStats(): Promise<DashboardStatsDto>;
    getLeadsTrend(): Promise<{
        date: string;
        total: number;
        closed: number;
    }[]>;
    getUserPerformance(userId: string): Promise<{
        totalLeads: number;
        leadsByStatus: {
            status: import(".prisma/client").$Enums.LeadStatus;
            count: number;
        }[];
        id: string;
        name: string;
        leadsProcessed: number;
        _count: {
            leads: number;
        };
    } | null>;
}
