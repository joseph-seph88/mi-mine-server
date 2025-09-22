import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { SharedUserService } from "../services/shared-user.service";

@Global()
@Module({
    imports: [TypeOrmModule.forFeature([
        User,
    ])],
    providers: [SharedUserService],
    exports: [TypeOrmModule, SharedUserService],
})
export class DatabaseModule { }