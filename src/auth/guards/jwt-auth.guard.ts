import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// TODO
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') { }
