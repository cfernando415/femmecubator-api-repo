const JWT = require('jsonwebtoken');
const logger = require('simple-node-logger').createSimpleLogger();
const { setLogDetails, HttpStatusCodes } = require('../../utils/constants');

const authMiddleware = {
  validateCookie: (req, res, next) => {
    logger.info(
      setLogDetails(
        'authMiddleware.validateCookie',
        'Validating Cookie',
        req.cookies
      )
    );
    const token = req.cookies.TOKEN;
    if (token) {
      try {
        const { userId, userName, role_id } = JWT.verify(
          token,
          process.env.SECRET_KEY
        );
        res.locals.user = { userId, userName, role_id };
        logger.info(
          setLogDetails(
            'authMiddleware.validateCookie',
            'SUCCESS',
            res.locals.user
          )
        );
        next();
      } catch (err) {
        next(err);
      }
    } else {
      next({ err: 'Token Not Found' });
    }
  },
  errorHandler: (err, req, res, next) => {
    if (err) {
      logger.error(
        setLogDetails('authMiddleware.errorHandler', 'FAILURE', err)
      );
      res.setHeader('Content-Type', 'application/json');
      return res
        .status(HttpStatusCodes.StatusCodes.FORBIDDEN)
        .end(JSON.stringify(err));
    }
    next();
  },
};

module.exports = authMiddleware;
