import { Hono } from 'hono'
import {cors} from 'hono/cors'
import { dbConnect } from './config/db.config';
import trackMailRoute from './api/track-mail'
import sendMailRoute from './api/send-mail'
import getMailStatusRoute from './api/get-mail-status'

const app = new Hono()

app.use(cors());
dbConnect();

app.route('/track', trackMailRoute);
app.route('/api', sendMailRoute);
app.route('/status', getMailStatusRoute);

export default app
