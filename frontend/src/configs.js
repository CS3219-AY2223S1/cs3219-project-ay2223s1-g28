// Reverse proxy
const URI_SVC = process.env.URI_SVC || 'http://localhost:8080';

// User service
const PREFIX_USER_SVC = '/api/user-service';
const URL_USER_SVC = URI_SVC + PREFIX_USER_SVC;

const PREFIX_USER_SVC_SIGNIN = '/signin';
const PREFIX_USER_SVC_SIGNUP = '/signup';
// TODO: Change to NGINX URL to check for JWT validity in the future, using user service URL at the moment
const PREFIX_USER_SVC_JWT_VERIFICATION = '/verify-jwt';
const PREFIX_USER_SVC_LOGOUT = '/logout';
const PREFIX_USER_SVC_UPDATE = '/update';
const PREFIX_USER_SVC_DELETE = '/delete';

export const URL_USER_SVC_SIGNIN = URL_USER_SVC + PREFIX_USER_SVC_SIGNIN;
export const URL_USER_SVC_SIGNUP = URL_USER_SVC + PREFIX_USER_SVC_SIGNUP;
export const URL_USER_SVC_JWT_VERIFICATION = URL_USER_SVC + PREFIX_USER_SVC_JWT_VERIFICATION;
export const URL_USER_SVC_LOGOUT = URL_USER_SVC + PREFIX_USER_SVC_LOGOUT;
export const URL_USER_SVC_UPDATE = URL_USER_SVC + PREFIX_USER_SVC_UPDATE;
export const URL_USER_SVC_DELETE = URL_USER_SVC + PREFIX_USER_SVC_DELETE;

// Matching service
export const URL_MATCHING_SVC_CONNECT = URI_SVC; // Socket

// Communication service
const PREFIX_COMM_SVC = '/api/communication-service';
const URL_COMM_SVC = URI_SVC + PREFIX_COMM_SVC;
const PREFIX_COMM_SVC_READ_CHAT = '/read';
export const URL_COMM_SVC_READ_CHAT = URL_COMM_SVC + PREFIX_COMM_SVC_READ_CHAT;
export const URL_COMM_SVC_CONNECT = URI_SVC; // Socket

// Collaboration service
export const URL_COLLAB_SVC_CONNECT = URI_SVC; // Socket
