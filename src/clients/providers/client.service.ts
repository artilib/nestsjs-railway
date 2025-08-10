import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Client } from '../client.entity';
import { Repository } from 'typeorm';
import { CreateClientDto } from '../dtos/create-client.dto';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private readonly clientRepository: Repository<Client>,
  ) {}

  public async getOrCreateClient(
    createClientDto: CreateClientDto,
  ): Promise<Client> {
    const client: Client | null = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });
    if (!client) {
      const newClient: Client = this.clientRepository.create(createClientDto);
      return await this.clientRepository.save(newClient);
    }
    return client;
  }

  public async getClient(createClientDto: CreateClientDto) {
    const client = await this.clientRepository.findOne({
      where: { email: createClientDto.email },
    });
    if (!client) {
      throw new NotFoundException(`Aucun compte n'est rattaché à cet email`);
    }
    return client;
  }
}
