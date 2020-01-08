import { ActionTree } from 'vuex'
import StoreData from '@/store/state'
import axios from '@/axios'
import { NIM } from '@/utils/sdk'
import http from '@/store/actions/http'
import sdk from '@/store/actions/sdk'
const actions: ActionTree<StoreData, StoreData> = Object.assign({}, http, sdk)
export default actions
