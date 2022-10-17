import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// TODO
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
