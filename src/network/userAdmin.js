

import request from './index'

export function uresLb() {
  return request({
    method: 'get',
    url: '/users'
  })
}