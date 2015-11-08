'use strict';

import { Router } from 'express';
import controllers from './controllers';

let router = Router();

export default function routes() {
  router.get('/about', controllers.about);
  router.get('/faq', controllers.faq);
  router.get('/pricing', controllers.pricing);
  router.get('/api', controllers.api);
  router.get('*', controllers.dashboard);
  return router;
};
