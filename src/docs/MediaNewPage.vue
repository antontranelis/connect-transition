<template>
<container class="mt-5">
  <h2>New Media</h2>
  <br>
  <form>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="inputEmail4">Titel</label>
        <input type="text" class="form-control" id="inputTitel" placeholder="Post Titel" v-model="title">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <md-input size="md" label="Image URL" v-model="mediaUrl" />
      </div>
      <div class="form-group col-md-6">
        <label for="imgFile">or upload image file</label>
        <input type="file" accept="image/*" class="form-control-file" id="imgFile" @change="onFileChanged">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="text">Text</label>
        <wysiwyg v-model="text" class="editor" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="project">Project</label>
        <p>{{project}}</p>
      </div>
    </div>
    <hr>
    <h3>Tags</h3>
    <!-- Checkbox -->
    <div v-for="tag in tags" :key="tag._id" class="form-check mb-2 mr-sm-2">
      <input class="form-check-input" type="checkbox" :id="tag._id" :value="tag._id" v-model="post_tags">
      <label class="form-check-label" :for="tag._id">
            {{tag.title_en}}
        </label>
    </div>
    <button class="btn btn-primary btn-md" @click="addPost">Create</button>
  </form>
  <br/>
</container>
</template>


<script>
import {
  MdInput,
  MdTextarea,
  Container
} from "mdbvue";
import PostsService from '@/services/PostsService';
import TagsService from '@/services/TagsService';
import ImagesService from '@/services/ImagesService';

export default {
  name: "PostNewPage",
  components: {
    MdInput,
    MdTextarea,
    Container
  },
  data() {
    return {
      title: '',
      text: '',
      mediaUrl: '',
      thumbnailUrl: '',
      type: 'image',
      project: '',
      tags: [],
      post_tags: [],
      editorOption: {
        modules: {
          toolbar: [
            [{
              'size': ['small', false, 'large']
            }],
            ['bold', 'italic'],
            [{
              'list': 'ordered'
            }, {
              'list': 'bullet'
            }],
            ['link', 'image']
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          }
        }
      }
    };
  },
  methods: {
    async addPost() {
      await PostsService.addPost({
        title: this.title,
        text: this.text,
        mediaUrl: this.mediaUrl,
        thumbnailUrl: this.thumbnailUrl,
        type: this.type,
        project: this.project,
        tags: this.post_tags
      });
      this.$router.push({
        path: '/projects/view/' + this.project
      });
    },
    async getTags() {
      const response = await TagsService.fetchTags();
      this.tags = response.data.tags;
    },
    onFileChanged(event) {
      this.imgFile = event.target.files[0];
      this.imageUpload();
    },
    async imageUpload() {
      var x = await ImagesService.uploadImage(this.imgFile);
      console.log(x);
      this.mediaUrl = x.data;
    }
  },
  mounted() {
    this.project = this.$route.params.project;
    this.getTags();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.editor {
  background-color: #fff;
  height: 30rem;
}
</style>
