const codoAPI = require('./codoapi/CodoAPI');
const appRouter = require('@routers/appRouter');

codoAPI.defaultSettingsForAppRouter();
codoAPI.addAppRouter(appRouter);
codoAPI.init();
