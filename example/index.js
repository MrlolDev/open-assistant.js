import OpenAssistant from '../dist/index.js';
import 'dotenv/config';

(async () => {
  var user = {
    id: '530102778408861706',
    display_name: 'MrlolDev',
    auth_method: 'discord',
  };
  var c = new OpenAssistant(process.env.APIKEY, process.env.APIURL);
  var task = await c.getTask({
    type: 'random',
    user: user,
    collective: false,
    lang: 'es',
  });
  console.log(task);

  var availability = await c.getAvailability(user, 'es');
  console.log(availability);
  console.log(await c.getLeaderboard());
  /*
  var messageId = await c.acceptTask(task.id, user);
  var solveTask = await c.solveTask(task, user, 'es', { text: 'cuál es la capital de españa?' }, messageId);
  console.log(solveTask);*/
})();
