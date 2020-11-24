import { PORT } from './config';
import app from './app';

function main() {
  app.listen(PORT);
  console.log(`Server on port ${PORT}`);
}

main();
