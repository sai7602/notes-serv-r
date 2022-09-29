import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return `POST /notes | DELETE /notes/:id | PATCH /notes/:id | GET /notes/:id |  GET /notes |  GET /notes/stats`;
  }
}
