import env from '../config/env'
const origin = env === 'development' ? '//127.0.0.1:8000' : `//${location.host}`
export default origin
