export declare class StatusCountDto {
    status: string;
    count: number;
}
export declare class SourceCountDto {
    source: string;
    count: number;
}
export declare class PlatformCountDto {
    platform: string;
    count: number;
}
export declare class RecentActivityDto {
    action: string;
    leadName: string;
    userName: string;
    timestamp: Date;
}
export declare class TopPerformerDto {
    id: string;
    name: string;
    email: string;
    leadsProcessed: number;
}
export declare class DashboardStatsDto {
    totalLeads: number;
    newLeadsToday: number;
    conversionRate: number;
    activeEmployees: number;
    leadsByStatus: StatusCountDto[];
    leadsBySource: SourceCountDto[];
    leadsByPlatform: PlatformCountDto[];
    topPerformers: TopPerformerDto[];
}
