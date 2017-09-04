// import { loginByEmail, logout, getInfo } from 'api/login';
import Cookies from 'js-cookie';

//import {global} from 'src/global/global';
//import {api} from 'src/global/api';
// import store from '../../store';
//import { Message } from 'element-ui';
import {login} from '../../common/js/config'

const user = {
  state: {
    id: Cookies.get('userId'),
    token: Cookies.get('userToken'),
    userInfo:Cookies.get('userinfo'),
 },

  mutations: {
    SET_UID: (state,id) => {
      state.id = id;
    },
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo;
    },
  
		LOGIN_SUCCESS: () => {
      console.log('login success')
    },
    // LOGOUT_USER: state => {
    //   state.user = '';
    // }
  },

  actions: {
  // 邮箱登录
    Login({ commit }, userInfo) {
      //const email = userInfo.email.trim();

      //
      return new Promise((resolve, reject) => {
      	login(userInfo).then((res) => {
      if(res.data.error == 0){
        			let info = res.data.obj
        			 // 按一天8小时工作制设置过期时间
                Cookies.set('userToken', info.token,{ expires: 1/3}); //设置token
                Cookies.set('userId', info.id,{ expires: 1/3}); //设置用户id，
                Cookies.set('userinfo', info,{ expires: 1/3}); //设置用户id，
                
               //设置userInfo
                commit('SET_USERINFO',info); //此处也可省略，放在getUserInfo中统一处理
                commit('SET_TOKEN', info.token);
                resolve();
        	}else{
        		this.$message.error(res.data.message)
        	}
        })

        return false;

      });
    },
	}
}
export default user
