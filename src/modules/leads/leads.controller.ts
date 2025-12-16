import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { LeadsService } from './leads.service';
import {
  CreateLeadDto,
  UpdateLeadDto,
  LeadQueryDto,
  UpdateStatusDto,
  AddNoteDto,
  BulkDeleteDto,
  AssignLeadDto,
} from './dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('Leads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('leads')
export class LeadsController {
  constructor(private leadsService: LeadsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all leads with filters and pagination' })
  async findAll(
    @Query() query: LeadQueryDto,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.leadsService.findAll(query, user);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lead by ID' })
  async findOne(
    @Param('id') id: string,
    @CurrentUser() user: { id: string; role: string },
  ) {
    return this.leadsService.findOne(id, user);
  }

  @Post()
  @ApiOperation({ summary: 'Create new lead' })
  async create(@Body() dto: CreateLeadDto, @CurrentUser('id') userId: string) {
    return this.leadsService.create(dto, userId);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update lead' })
  async update(@Param('id') id: string, @Body() dto: UpdateLeadDto) {
    return this.leadsService.update(id, dto);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update lead status' })
  async updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdateStatusDto,
    @CurrentUser('id') userId: string,
  ) {
    return this.leadsService.updateStatus(id, dto, userId);
  }

  @Post(':id/notes')
  @ApiOperation({ summary: 'Add note to lead' })
  async addNote(
    @Param('id') id: string,
    @Body() dto: AddNoteDto,
    @CurrentUser('id') userId: string,
  ): Promise<string[]> {
    return this.leadsService.addNote(id, dto, userId);
  }

  @Patch(':id/assign')
  @ApiOperation({ summary: 'Assign lead to user' })
  async assign(@Param('id') id: string, @Body() dto: AssignLeadDto) {
    return this.leadsService.assignTo(id, dto.userId);
  }

  @Delete('bulk')
  @ApiOperation({ summary: 'Bulk delete leads' })
  async bulkDelete(@Body() dto: BulkDeleteDto) {
    return this.leadsService.bulkDelete(dto.ids);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete lead' })
  async remove(@Param('id') id: string) {
    return this.leadsService.remove(id);
  }
}
