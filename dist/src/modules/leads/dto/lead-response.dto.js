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
exports.PaginatedLeadsResponseDto = exports.PaginationMetaDto = exports.LeadResponseDto = exports.LeadAssignedToDto = exports.LeadNoteDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class LeadNoteDto {
    id;
    content;
    authorId;
    authorName;
    createdAt;
}
exports.LeadNoteDto = LeadNoteDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadNoteDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadNoteDto.prototype, "content", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], LeadNoteDto.prototype, "authorId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], LeadNoteDto.prototype, "authorName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadNoteDto.prototype, "createdAt", void 0);
class LeadAssignedToDto {
    id;
    name;
    email;
}
exports.LeadAssignedToDto = LeadAssignedToDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadAssignedToDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadAssignedToDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadAssignedToDto.prototype, "email", void 0);
class LeadResponseDto {
    id;
    name;
    company;
    website;
    region;
    industry;
    platform;
    source;
    status;
    nextActionDate;
    assignedTo;
    emails;
    phones;
    keywords;
    notes;
    createdAt;
    updatedAt;
}
exports.LeadResponseDto = LeadResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "company", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "website", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "region", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "industry", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "platform", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "source", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", String)
], LeadResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Date)
], LeadResponseDto.prototype, "nextActionDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: LeadAssignedToDto }),
    __metadata("design:type", LeadAssignedToDto)
], LeadResponseDto.prototype, "assignedTo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], LeadResponseDto.prototype, "emails", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], LeadResponseDto.prototype, "phones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [String] }),
    __metadata("design:type", Array)
], LeadResponseDto.prototype, "keywords", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LeadNoteDto] }),
    __metadata("design:type", Array)
], LeadResponseDto.prototype, "notes", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], LeadResponseDto.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], LeadResponseDto.prototype, "updatedAt", void 0);
class PaginationMetaDto {
    total;
    page;
    limit;
    totalPages;
}
exports.PaginationMetaDto = PaginationMetaDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "total", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "page", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "limit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PaginationMetaDto.prototype, "totalPages", void 0);
class PaginatedLeadsResponseDto {
    data;
    meta;
}
exports.PaginatedLeadsResponseDto = PaginatedLeadsResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ type: [LeadResponseDto] }),
    __metadata("design:type", Array)
], PaginatedLeadsResponseDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: PaginationMetaDto }),
    __metadata("design:type", PaginationMetaDto)
], PaginatedLeadsResponseDto.prototype, "meta", void 0);
//# sourceMappingURL=lead-response.dto.js.map