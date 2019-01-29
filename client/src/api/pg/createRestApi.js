import Request from '@shinin/request'
import host from './host'

export default uri => ({
  fetchList: token =>
    Request.get(`${host}/${uri}`)
      .bearer(token)
      .acceptJson(),
  create: (token, model) =>
    Request.post(`${host}/${uri}`)
      .bearer(token)
      .jsonBody(model)
      .acceptJson(),
  update: (token, id, body) =>
    Request.put(`${host}/${uri}/${id}`)
      .bearer(token)
      .jsonBody(body)
      .acceptJson(),
  remove: (token, id) =>
    Request.delete(`${host}/${uri}/${id}`)
      .bearer(token)
      .acceptJson()
})