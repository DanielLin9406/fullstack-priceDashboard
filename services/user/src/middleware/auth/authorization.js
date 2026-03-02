import ensureAuthenticated from '../../../shared/libs/auth/authorization';
import keys from '../../config/keys';

const authMiddleware = ensureAuthenticated(keys);

export default authMiddleware;
