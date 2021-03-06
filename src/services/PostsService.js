import Api from '@/services/Api';

export default {
  fetchPosts () {
    return Api().get('posts');
  },
  addPost (params) {
    return Api().post('posts', params);
  },
  updatePost (params) {
    return Api().put('posts/' + params.id, params);
  },
  getPost (params) {
    return Api().get('post/' + params.id);
  },
  getPostsById (params) {
    return Api().get('posts/project/' + params.id);
  },
  deletePost (id) {
    return Api().delete('posts/' + id);
  }
};
