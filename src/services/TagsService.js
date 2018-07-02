import Api from '@/services/Api';

export default {
  fetchTags () {
    return Api().get('tags');
  },
  addTag (params) {
    return Api().post('tags', params);
  },
  updateTag (params) {
    return Api().put('tags/' + params.id, params);
  },
  getTag (params) {
    return Api().get('tag/' + params.id);
  },
  deleteTag (id) {
    return Api().delete('tags/' + id);
  }
};
