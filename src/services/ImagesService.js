import Api from '@/services/Api';

export default {
  uploadImage(file) {
    const formData = new FormData();
    formData.append("file", file);
    return Api().post('/images', formData);
  }
};
