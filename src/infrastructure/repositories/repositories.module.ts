import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Location } from '../entities/location.entity';
import { LocationRepository } from './location.repository';
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';

@Module({
    imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([Location])],
    providers: [LocationRepository],
    exports: [LocationRepository],
})
export class RepositoriesModule {}
