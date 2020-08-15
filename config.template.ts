import Config from './shared/config';
import { defaultTheme } from './shared/theme/default';

const config: Config = {
  serverPort: 8000,
  serverHost: '127.0.0.1',
  theme: defaultTheme,
  secret: 'CyU6zlgmQIXDzr6n11lcwgnT7mxH7mI65WFZbXtWZtDVU3GejBFEnH9It7MNHDUirF4WTN1uBRowB0sjC0gcD4wMlwsEGdHvWLvOqePtTQbIrkhsg1HPAfgU6PsqSKTvKlLpTGvOQcXrt2Yf1WYgIKu6pYwKnQyEuSTWHoGmXBNy3lDUxIyC7wjvDKvf0Ia2POyKPGHoKfL52KaQoCZYSrV7OdlDt0PX2tdbEIWUJZS4DBTR7FOQsnAvWtpLDnJz',
  sessionPath: './var/sessions',
  databaseDir: './var/db',
}

export default config
