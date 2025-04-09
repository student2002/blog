
import router from '@/router/index.js'
export default {
    get(){
        return {...router}
    },
    query(){
        return router.currentRoute.value.query
    }
 }