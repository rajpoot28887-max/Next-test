module.exports = {
  apps: [{
    name: 'rajpoot-bot-md',
    script: './index.js',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    // FIX: prevent crash-loop from hammering the process; back off between restarts
    max_restarts: 15,
    min_uptime: '30s',
    restart_delay: 3000,
    exp_backoff_restart_delay: 100,
    env: {
      NODE_ENV: 'production'
    },
    log_file: './logs/combined.log',
    out_file: './logs/out.log',
    error_file: './logs/error.log',
    time: true
  }]
};
