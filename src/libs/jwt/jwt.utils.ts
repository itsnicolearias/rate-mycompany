import * as jwt from 'jsonwebtoken';
import moment from 'moment';
import 'dotenv/config';
import boom from '@hapi/boom';
import type { JwtPayload } from 'jsonwebtoken';
import { User } from '@prisma/client';

import { config } from '../../config/environment.config';

export const getToken = (user: Partial<User>) => {
  try {
    const payload = {
      sub: user.user_id,
      role: user.role,
      verified: user.verified,
      deleted: user.deleted,
      iat: moment().unix(),
      exp: moment().add(7, 'days').unix(),
    };
    return jwt.sign(payload, config.jwtSecret);
  } catch (e) {
    throw boom.badRequest(e);
  }
};


export function decodeToken(bearerHeader: string, secret: string) {
  try {
    const bearer = bearerHeader.split(' ');
    const token = bearer[1];

    if (!token) {
      throw boom.forbidden('Token is not valid');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    return decoded;
  } catch (error) {
    throw boom.unauthorized(error);
  }
}