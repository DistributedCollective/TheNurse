module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  migrations: {
    directory: './db/migrations',
  },
  'pool': {
    'min': 2,
    'max': 6,
    'createTimeoutMillis': 3000,
    'acquireTimeoutMillis': 30000,
    'idleTimeoutMillis': 30000,
    'reapIntervalMillis': 1000,
    'createRetryIntervalMillis': 100,
    'propagateCreateError': false, // <- default is true, set to false
  },

  //custom stuff
  onUpdateTrigger: (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON ${table}
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,
  
};
