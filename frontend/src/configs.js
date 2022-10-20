const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000';
const URI_MATCHING_SVC = process.env.URI_MATCHING_SVC || 'http://localhost:8001';
const URI_COMM_SVC = process.env.URI_COMM_SVC || 'http://localhost:8002';
const URI_COLLAB_SVC = process.env.URI_COLLAB_SVC || 'http://localhost:8003';

const PREFIX_USER_SVC = '/api/user';
const PREFIX_COMM_SVC = '/api/chat';

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC;
export const URL_MATCHING_SVC = URI_MATCHING_SVC;
export const URL_COMM_SVC = URI_COMM_SVC + PREFIX_COMM_SVC;
export const URL_COLLAB_SVC = URI_COLLAB_SVC;

const PREFIX_COMM_SVC_CREATE_CHAT = '/create';

export const URL_COMM_SVC_CONNECT = URI_COMM_SVC;
export const URL_COMM_SVC_CREATE_CHAT = URL_COMM_SVC + PREFIX_COMM_SVC_CREATE_CHAT;
