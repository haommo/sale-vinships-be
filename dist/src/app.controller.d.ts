export declare class AppController {
    getRoot(): {
        message: string;
        status: string;
        version: string;
        docs: string;
    };
    healthCheck(): {
        status: string;
        timestamp: string;
        uptime: number;
    };
}
