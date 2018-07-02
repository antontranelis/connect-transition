import Api from '@/services/Api'

export default {
  fetchEvents () {
    return Api().get('events')
  },
  addEvent (params) {
    return Api().post('events', params)
  },
  updateEvent (params) {
    return Api().put('events/' + params.id, params)
  },
  getEvent (params) {
    return Api().get('event/' + params.id)
  },
  deleteEvent (id) {
    return Api().delete('events/' + id)
  }
}
