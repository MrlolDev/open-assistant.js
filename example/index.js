import OpenAssistant from '../dist/index.js';
import 'dotenv/config';

(async () => {
  var c = new OpenAssistant(process.env.APIKEY, process.env.APIURL);
  var task = await c.getTask({
    type: 'random',
    user: {
      id: '530102778408861706',
      display_name: 'MrlolDev',
      auth_method: 'discord',
    },
    collective: false,
    lang: 'es',
  });
  console.log(task);
  /*var availability = await c.getAvailability({
    id: '530102778408861706',
    display_name: 'MrlolDev',
    auth_method: 'discord',
  });
  console.log(availability);*/
  console.log(
    await c.acceptTask(task.id, {
      id: '530102778408861706',
      display_name: 'MrlolDev',
      auth_method: 'discord',
    }),
  );
})();
