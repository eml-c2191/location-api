import { Module } from '@nestjs/common';
import { EnvironmentConfigService } from './environment-config.service';
import { ConfigModule } from '@nestjs/config';
import { config } from 'dotenv';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [config],
      envFilePath: './env/local.env',
      ignoreEnvFile: !(process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test'),
      isGlobal: true
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule {}
