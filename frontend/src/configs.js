// Reverse proxy
const URI_SVC = process.env.URI_SVC || 'http://localhost:8080';

// User service
const PREFIX_USER_SVC = '/api/user-service';
export const URL_USER_SVC = URI_SVC + PREFIX_USER_SVC;

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
