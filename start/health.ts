import { HealthChecks } from '@adonisjs/core/health'
import { DbCheck } from '@adonisjs/lucid/database'
import { RedisCheck } from '@adonisjs/redis'
import db from '@adonisjs/lucid/services/db'
import redis from '@adonisjs/redis/services/main'

// only the backing services the api cannot serve requests without; resource checks
// (heap, disk) are intentionally left out so a busy process is not reported as down
export const healthChecks = new HealthChecks().register([
  new DbCheck(db.connection()),
  new RedisCheck(redis.connection()),
])
