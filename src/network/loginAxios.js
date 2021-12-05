import { request } from "./request";
export function loginAxios(){
  return request({
    url:'/welcome',
  })
}