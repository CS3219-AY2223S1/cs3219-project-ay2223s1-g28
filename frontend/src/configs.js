const URI_USER_SVC = process.env.URI_USER_SVC || 'http://localhost:8000'
const URI_COMM_SVC = process.env.URI_COMM_SVC || 'http://localhost:8002'

const PREFIX_USER_SVC = '/api/user'

export const URL_USER_SVC = URI_USER_SVC + PREFIX_USER_SVC
export const URL_COMM_SVC = URI_COMM_SVC // Add PREFIX in the future if needed
