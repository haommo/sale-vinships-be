import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private dashboardService;
    constructor(dashboardService: DashboardService);
    getStats(): Promise<import("./dto").DashboardStatsDto>;
    getLeadsTrend(): Promise<{
        date: string;
        total: number;
        closed: number;
    }[]>;
    getUserPerformance(id: string): Promise<{
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
