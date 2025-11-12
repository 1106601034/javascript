import morgan from 'morgan';
import { logger } from '../utils/logger';

export default morgan(
  process.env.NODE_ENV === 'development' ? 'dev' : 'common',
  {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  }
);

// formatter
