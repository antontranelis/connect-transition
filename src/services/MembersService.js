import Api from '@/services/Api'

export default {
  fetchMembers () {
    return Api().get('members')
  },
  addMember (params) {
    return Api().post('members', params)
  },
  updateMember (params) {
    return Api().put('members/' + params.id, params)
  },
  getMember (params) {
    return Api().get('member/' + params.id)
  },
  deleteMember (id) {
    return Api().delete('members/' + id)
  }
}
