
import { history } from 'umi'

// 本地环境检测 location.token是否存储
export const loginDetection = () => {

    localStorage.getItem('token') ?  '': history.push('/login')


}
const ResRetrieval = () => { }
