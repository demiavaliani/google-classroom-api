import Vue from 'vue'
import App from './App.vue'
import Gapi from 'vue-googleapis'
import { BootstrapVue } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

Vue.use(Gapi, {
	apiKey: process.env.VUE_APP_API_KEY,
	clientId: process.env.VUE_APP_CLIENT_ID,
	discoveryDocs: ["https://classroom.googleapis.com/$discovery/rest"],
	scope: "https://www.googleapis.com/auth/classroom.courses.readonly https://www.googleapis.com/auth/classroom.rosters https://www.googleapis.com/auth/classroom.rosters.readonly https://www.googleapis.com/auth/classroom.profile.emails https://www.googleapis.com/auth/classroom.profile.photos",
})

new Vue({
	render: h => h(App),
}).$mount('#app')
