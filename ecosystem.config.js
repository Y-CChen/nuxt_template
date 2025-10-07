module.exports = {
  apps: [
    {
      name: 'nuxt_template',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: './node_modules/nuxt/bin/nuxt.js',
      args: 'start -H 0.0.0.0 -p 3000',
    },
  ],
};
