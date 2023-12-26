import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';
import { NinjasService } from './ninjas.service';

@Controller('ninjas')
export class NinjasController {
  constructor(private readonly ninjasService: NinjasService) {}

  // GET /ninjas --> [{ ... }]
  @Get()
  getAllNinjas(@Query('weapon') weapon: 'stars' | 'nunjucks') {
    return this.ninjasService.getNinjas(weapon);
  }

  // GET /ninjas/:id --> { ... }
  @Get(':id')
  getNinjaById(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.ninjasService.getNinjaById(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  // POST /ninjas --> { ... }
  @Post()
  createNinja(@Body(new ValidationPipe()) createNinjaDto: CreateNinjaDto) {
    this.ninjasService.createNinja(createNinjaDto);

    return {
      message: 'Ninja created successfully',
    };
  }

  // PUT /ninjas/:id --> { ... }
  @Put(':id')
  updateNinja(@Param('id') id: string, @Body() updateNinjaDto: UpdateNinjaDto) {
    return this.ninjasService.updateNinja(+id, updateNinjaDto);
  }

  // DELETE /ninjas/:id --> { ... }
  @Delete(':id')
  deleteNinja(@Param('id') id: string) {
    return this.ninjasService.deleteNinja(+id);
  }

  // GET /ninjas/random --> { ... }
  @Get('random')
  getRandomNinja() {
    return this.ninjasService.getRandomNinjas();
  }
}
