import { Injectable } from '@nestjs/common';
import { CreateNinjaDto } from './dto/create-ninja.dto';
import { UpdateNinjaDto } from './dto/update-ninja.dto';

@Injectable()
export class NinjasService {
  private ninjas = [
    {
      id: 1,
      name: 'Ninja A',
      weapon: 'stars',
    },
    {
      id: 2,
      name: 'Ninja B',
      weapon: 'nunjucks',
    },
  ];

  getNinjas(weapon?: 'stars' | 'nunjucks') {
    if (weapon) {
      return this.ninjas.filter((ninja) => ninja.weapon === weapon);
    }

    return this.ninjas;
  }

  getNinjaById(id: number) {
    const ninja = this.ninjas.find((ninja) => ninja.id === id);

    if (!ninja) {
      throw new Error('Ninja not found');
    }

    return ninja;
  }

  createNinja(createNinjaDto: CreateNinjaDto) {
    this.ninjas.push({ ...createNinjaDto, id: Date.now() });
  }

  updateNinja(id: number, updateNinjaDto: UpdateNinjaDto) {
    const index = this.ninjas.findIndex((ninja) => ninja.id === id);

    if (index === -1) {
      throw new Error('Ninja not found');
    }

    this.ninjas[index] = {
      ...this.ninjas[index],
      ...updateNinjaDto,
    };
  }

  deleteNinja(id: number) {
    const index = this.ninjas.findIndex((ninja) => ninja.id === id);

    if (index === -1) {
      throw new Error('Ninja not found');
    }

    this.ninjas.splice(index, 1);
  }

  getRandomNinjas() {
    return this.ninjas[Math.floor(Math.random() * this.ninjas.length)];
  }
}
