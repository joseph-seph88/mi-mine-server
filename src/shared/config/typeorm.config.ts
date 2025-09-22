import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { databaseConfigFactory } from './database.config';

export const typeOrmConfigFactory = (configService: ConfigService): TypeOrmModuleOptions => {
    const dbConfig = databaseConfigFactory(configService);

    return {
        type: 'postgres',
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password,
        database: dbConfig.database,
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: configService.get<string>('NODE_ENV') !== 'production',
        // logging: configService.get<string>('NODE_ENV') === 'development',
        autoLoadEntities: true,
    };
};
