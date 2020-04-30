module.exports = {
  apps : [{
    name: "eltex-api",
    script: "/var/www/eltexTest.ru/api/server.js",
	node_args:"--experimental-worker",
    
    out_file:"/var/www/eltexTest.ru/api/logs/out.log",
    error_file:"/var/www/eltexTest.ru/api/logs/error.log",
    log_date_format:"YYYY-MM-DD HH:mm",
	
	instances: "max",
	instance_var: 'INSTANCE_ID', //so you can get the number of node instance by this command in node.js - process.env.INSTANCE_ID
	exec_mode : "cluster",
	
	watch: ["/var/www/eltexTest.ruapi"],
	watch_delay: 5000,
	ignore_watch : ["/var/www/eltexTest.ru/api/node_modules", "/var/www/eltexTest.ru/api/logs"],
	
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}