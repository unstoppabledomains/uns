
import { Sandbox } from '.';

Sandbox.start({ verbose: true, extract: true }).then((data) => {
  console.log('Sandbox has been started!', data);
}).catch((error) => {
  console.error('Error trying to start Sandbox', error);
});
