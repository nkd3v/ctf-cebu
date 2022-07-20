const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.disable('x-powered-by');
app.set('view engine', 'ejs');

app.use(cookieParser('qiC3sxdq68VyoqwSTbXd9o3fqDjnjmBnWKLLkNB9iYHhUurWSrwMYoG8ZxMq28QGYy5RNNcz7juLaVVWTBgzmSP85wSpXYTetxKQnuXcsZDXykppAno3Hf68i97dTU4d'));
app.use(express.static('public', { cacheControl: 'public', maxAge: '1d' }));

app.use((req, res, next) => {
  res.set('X-XSS-Protection', '1; mode=block');
  res.set('X-Frame-Options', 'SAMEORIGIN');
  res.set('X-Content-Type-Options', 'nosniff');
  res.set('Referrer-Policy', 'same-origin');
  res.set('Content-Security-Policy', "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;");
  res.set('Cache-Control', 'no-store');
  next();
});

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