import { Module } from '@nestjs/common';
import { LocationController } from './location/location.controller';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';

@Module({
    imports: [UsecasesProxyModule.register()],
    controllers: [LocationController]
})
export class ControllersModule {
}
