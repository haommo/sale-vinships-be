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
exports.DashboardStatsDto = exports.TopPerformerDto = exports.RecentActivityDto = exports.PlatformCountDto = exports.SourceCountDto = exports.StatusCountDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class StatusCountDto {
    status;
    count;
}
exports.StatusCountDto = StatusCountDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], StatusCountDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], StatusCountDto.prototype, "count", void 0);
class SourceCountDto {
    source;
    count;
}
exports.SourceCountDto = SourceCountDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], SourceCountDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], SourceCountDto.prototype, "count", void 0);
class PlatformCountDto {
    platform;
    count;
}
exports.PlatformCountDto = PlatformCountDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], PlatformCountDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlatformCountDto.prototype, "count", void 0);
class RecentActivityDto {
    action;
    leadName;
    userName;
    timestamp;
}
exports.RecentActivityDto = RecentActivityDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentActivityDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentActivityDto.prototype, "leadName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], RecentActivityDto.prototype, "userName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RecentActivityDto.prototype, "timestamp", void 0);
class TopPerformerDto {
    id;
    name;
    email;
    leadsProcessed;
}
exports.TopPerformerDto = TopPerformerDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TopPerformerDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TopPerformerDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], TopPerformerDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], TopPerformerDto.prototype, "leadsProcessed", void 0);
class DashboardStatsDto {
    totalLeads;
    newLeadsToday;
    conversionRate;
    activeEmployees;
    leadsByStatus;
    leadsBySource;
    leadsByPlatform;
    topPerformers;
}
exports.DashboardStatsDto = DashboardStatsDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "totalLeads", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "newLeadsToday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "conversionRate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], DashboardStatsDto.prototype, "activeEmployees", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [StatusCountDto] }),
    __metadata("design:type", Array)
], DashboardStatsDto.prototype, "leadsByStatus", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [SourceCountDto] }),
    __metadata("design:type", Array)
], DashboardStatsDto.prototype, "leadsBySource", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [PlatformCountDto] }),
    __metadata("design:type", Array)
], DashboardStatsDto.prototype, "leadsByPlatform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [TopPerformerDto] }),
    __metadata("design:type", Array)
], DashboardStatsDto.prototype, "topPerformers", void 0);
//# sourceMappingURL=dashboard-stats.dto.js.map