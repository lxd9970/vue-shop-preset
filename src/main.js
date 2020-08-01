import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
Vue.prototype.$http = axios

// 导入全局样式表
import './assets/css/globle.css'

import { Button, Select, Form, Input, FormItem, Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(FormItem.name, FormItem);
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')