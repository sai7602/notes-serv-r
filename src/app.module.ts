import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesModule } from './notes/notes.module';

@Module({
  imports: [
    NotesModule,
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.dbdipmb.mongodb.net/notes',
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
