import fs from 'fs';
import path from 'path';

const loadEnv = (env) => {
  const envPath = path.resolve(`.env.${env}`);
  const envExists = fs.existsSync(envPath);

  if (envExists) {
    require('dotenv').config({ path: envPath });
    console.log(`Loaded ${env} environment variables from ${envPath}`);
  } else {
    console.log(`No ${env} environment variables found`);
  }
};

export default loadEnv;
