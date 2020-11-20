import * as dotenv from 'dotenv';

const result = dotenv.config();
if (result.error) {
  throw result.error;
}
// const envs = result.parsed;
// console.log(envs);

export const PORT = process.env.PORT;
