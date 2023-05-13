import { createApp } from 'vue'
import App from './App.vue'

import Button from 'x-ui-vue3/esm/button'
import Form from 'x-ui-vue3/esm/form'
import Input from 'x-ui-vue3/esm/input'
import Select from 'x-ui-vue3/esm/select'
import Slider from 'x-ui-vue3/esm/slider'

import 'x-ui-vue3/theme/light.css'

createApp(App).use(Button).use(Form).use(Input).use(Select).use(Slider).mount('#app')
