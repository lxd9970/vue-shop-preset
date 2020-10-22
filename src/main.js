import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './assets/fonts/iconfont.css'
import ZkTable from 'vue-table-with-tree-grid'
//vue-table-with-tree-grid树形插件使用
Vue.component(ZkTable.name, ZkTable)

axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1/'
axios.interceptors.request.use(config => {
    // 为请求头对象，添加Token验证的Authorization字段
    // console.log(config);
    // console.log(window.sessionStorage.getItem('token'));
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
})

Vue.prototype.$http = axios

// 导入全局样式表
import './assets/css/globle.css'

import {
    Button,
    Select,
    Form,
    Input,
    FormItem,
    Message,
    Container,
    Header,
    Aside,
    Main,
    Menu,
    MenuItem,
    Submenu,
    Breadcrumb,
    BreadcrumbItem,
    Card,
    Row,
    Col,
    Table,
    TableColumn,
    Switch,
    Tooltip,
    Pagination,
    Dialog,
    MessageBox,
    Tag,
    Tree,
    Option,
    Cascader,
    Alert,
    Tabs,
    TabPane

} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Form.name, Form);
Vue.component(Input.name, Input);
Vue.component(FormItem.name, FormItem);
Vue.use(Container),
    Vue.use(Header),
    Vue.use(Aside),
    Vue.use(Main)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Row)
Vue.use(Col)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tag)
Vue.use(Tree)
Vue.use(Select)
Vue.use(Option)
Vue.use(Cascader)
Vue.use(Alert)
Vue.use(Tabs)
Vue.use(TabPane)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')