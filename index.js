const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.disable('x-powered-by');
app.set('view engine', 'ejs');

app.use(cookieParser('secret'));
app.use(express.static('public'));

app.get('/lonely-doge', (req, res) => {

  const visit = parseInt(req.cookies['v']) + 1 || 1;
  res.cookie('v', visit, { httpOnly: true, secure: true });

  const happy = visit >= 10000000;

  let image, message;

  if (happy) {
    image = 'images/happy-doge.jpg';
    message = 'Thank you! I\'m happy now, take this flag{dogE_b3st_FrieND_}';
  } else {
    image = 'images/crying-doge.jpg';
    message = `I'm so lonely. Can you visit me ${ 10000000 - visit } more times?`;
  }

  res.render('lonely-doge', { message, image });

});

app.use((req, res) => {
  res.sendStatus(404);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));