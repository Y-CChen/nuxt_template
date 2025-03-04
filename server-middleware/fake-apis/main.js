import config from '../../.config';

const { auths } = config;

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => {
      chunks.push(chunk);
    });
    req.on('end', () => {
      resolve(Buffer.concat(chunks).toString());
    });
    req.on('error', (error) => {
      reject(error);
    });
    req.on('close', () => {
      reject(new Error('closed'));
    });
    req.on('aborted', () => {
      reject(new Error('aborted'));
    });
  });
}

function encodeBase64(data) {
  return Buffer.from(data).toString('base64');
}

function decodeBase64(data) {
  return Buffer.from(data, 'base64').toString();
}

function makeTokens(id, username) {
  const now = Date.now() / 1000;
  const accessTokenObject = {
    id,
    username,
    iat: now,
    exp: now + auths.local.maxAgeAccessToken,
  };
  const accessToken = encodeBase64(JSON.stringify(accessTokenObject));
  const refreshTokenObject = {
    id,
    username,
    iat: now,
    exp: now + auths.local.maxAgeRefreshToken,
  };
  const refreshToken = encodeBase64(JSON.stringify(refreshTokenObject));
  return { accessToken, refreshToken };
}

export default async function (req, res, next) {
  switch (req.url) {
    case '/auth/login': {
      try {
        const body = await readBody(req);
        const { username, password } = JSON.parse(body);
        if (!username || !password) {
          throw new Error('unauthorized');
        }
        const { accessToken, refreshToken } = makeTokens(username, username);
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ accessToken, refreshToken }));
      } catch (error) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: error.message }));
      }
      res.end();
      break;
    }
    case '/auth/user': {
      try {
        const authorization = req.headers.authorization;
        const accessToken = authorization.split(' ')[1];
        const { id, username, iat, exp } = JSON.parse(
          decodeBase64(accessToken),
        );
        const now = Date.now() / 1000;
        if (iat < exp && exp < now) {
          throw new Error('unauthorized');
        }
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ user: { id, username } }));
      } catch (error) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: error.message }));
      }
      res.end();
      break;
    }
    case '/auth/refresh': {
      try {
        const body = await readBody(req);
        const { refreshToken } = JSON.parse(body);
        const { id, username, iat, exp } = JSON.parse(
          decodeBase64(refreshToken),
        );
        const now = Date.now() / 1000;
        if (iat < exp && exp < now) {
          throw new Error('unauthorized');
        }
        const { accessToken, refreshToken: newRefreshToken } = makeTokens(
          id,
          username,
        );
        res.setHeader('Content-Type', 'application/json');
        res.write(
          JSON.stringify({ accessToken, refreshToken: newRefreshToken }),
        );
      } catch (error) {
        res.statusCode = 401;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: error.message }));
      }
      res.end();
      break;
    }
    default:
      res.statusCode = 404;
      res.end();
      break;
  }
}
