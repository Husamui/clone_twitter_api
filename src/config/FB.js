import request from 'reqeust';
import { keys } from "lodash";


export default class FB {

    constructor() {
      this.version = 'v2.9';
      this.credentials = {
        appId: process.env.FACEBOOK_APP_ID || '218369492239285',
        secret: process.env.FACEBOOK_APP_SECRET || 'e046300fac4062b7e6de4c56f4f19fa7',
      };
    }
  
    call(method, params = {}) {
      return new Promise((resolve, reject) => {
        let url = `https://graph.facebook.com/${this.version}/${method}?client_id=${this.credentials.appId}&client_secret=${encodeURIComponent(this.credentials.secret)}`;
        keys(params).forEach(key => {
          url += `&${key}=${encodeURIComponent(params[key])}`;
        });
        request({url}, (error, response, body) => {
          if (response.statusCode !== 200) {
            reject(response);
          } else {
            resolve(body);
          }
        });
      });
    }
}