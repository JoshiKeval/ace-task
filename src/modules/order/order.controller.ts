import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { UserAuthGuard } from '@core/guard';
import { TransformInterceptor } from '@core/interceptor';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { GetSession } from '@core/decorators';
import { User } from '@core/interfaces';
import { SuccessMessages } from '@core/utils';
import { PlaceOrderReqDto, GetOrderDetailsQuery } from './dto/req';

@ApiTags('Order Apis')
@UseInterceptors(TransformInterceptor)
@ApiBearerAuth()
@UseGuards(UserAuthGuard)
@Controller('order')
export class OrderController {
  constructor(private service: OrderService) {}

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Place order',
    description: ' Place order',
  })
  @ApiResponse({
    description: SuccessMessages.ORDER_PLACED,
  })
  async placeOrder(
    @Body() payload: PlaceOrderReqDto,
    @GetSession() user: User,
  ) {
    return {
      data: await this.service.placeOrder(user?.id, payload),
    };
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get order details Or All order',
    description: ' Get order details Or All order',
  })
  @ApiResponse({
    description: SuccessMessages.ORDER_DETAILS,
  })
  async getOrderDetails(
    @Query() payload: GetOrderDetailsQuery,
    @GetSession() user: User,
  ) {
    return {
      data: await this.service.getOrderDetails(user?.id, payload),
    };
  }
}
