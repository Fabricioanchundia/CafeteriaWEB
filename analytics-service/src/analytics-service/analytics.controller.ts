import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics-service.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('summary')
  getSummary() {
    return this.analyticsService.getSummary();
  }

  @Get('daily-sales')
  getDailySales() {
    return this.analyticsService.getDailySales();
  }

  @Get('top-items')
  getTopItems(@Query('limit') limit?: string) {
    return this.analyticsService.getTopItems(Number(limit) || 5);
  }

  @Post('new-order')
  handleNewOrder(@Body() order: any) {
    return this.analyticsService.registerOrder(order);
  }
}
