import HTTP from '@/libs/http-common.js';

export default {
    install(Vue) {
        Vue.prototype.$http = HTTP;
    }
}