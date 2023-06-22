import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import { config } from '../config/config';

// Authorization middleware. When used, the Access Token must
// exist and be verified against the Auth0 JSON Web Key Set.
const checkJwt = auth({
    audience: config.auth.identifier,
    issuerBaseURL: `https://${config.auth.domain}/`,
});

export default checkJwt;
