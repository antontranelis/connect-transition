<template>
<container class="mt-5">
  <h2>Edit Project</h2>
  <br>
  <hr>

  <form>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="inputEmail4">Titel</label>
        <input type="text" class="form-control" id="inputTitel" placeholder="Project Titel" v-model="title">
      </div>
      <div class="form-group col-md-12">
        <label for="inputEmail4">Short Description</label>
        <input type="text" class="form-control" id="inputSubtitel" placeholder="Short Description" v-model="description">
      </div>
      <div class="form-group col-md-12">
        <label for="inputEmail4">Image</label>
        <input type="url" class="form-control" id="inputSubtitel" placeholder="Image URL" v-model="imgUrl">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-12">
        <label for="exampleFormControlTextarea1">Concept</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="5" v-model="concept"></textarea>
      </div>
    </div>
    <hr>
    <h3>Contact</h3>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputAddress">Website</label>
        <input type="text" class="form-control" id="inputAddress" placeholder="https://project-website.org" v-model="website">
      </div>
      <div class="form-group col-md-6">
        <label for="inputAddress2">Facebook URL</label>
        <input type="url" class="form-control" id="inputAddress2" placeholder="https://facebook.com/..." v-model="facebook">
      </div>
    </div>
    <div class="form-row">
      <div class="form-group col-md-6">
        <label for="inputCity">E-Mail</label>
        <input type="email" class="form-control" id="inputCity" placeholder="E-Mail" v-model="email">
      </div>
      <div class="form-group col-md-6">
        <label for="inputZip">Phone</label>
        <input type="phone" class="form-control" id="inputZip" placeholder="+57 320 6227 33" v-model="phone">
      </div>
      <div class="form-group col-md-6">
        <label for="inputZip">Whats App</label>
        <input type="phone" class="form-control" id="inputZip" placeholder="+57 320 6227 33" v-model="whatsapp">
      </div>
    </div>
    <hr>
    <h3>Tags</h3>
    <!-- Checkbox -->
    <div v-for="tag in tags" :key="tag._id" class="form-check mb-2 mr-sm-2">
        <input class="form-check-input" type="checkbox" :id="tag._id" :value="tag._id" v-model="project_tags">
        <label class="form-check-label" :for="tag._id">
            {{tag.title_en}}
        </label>
    </div>
    <button class="btn btn-primary btn-md" @click="updateProject">Update</button>
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
import ProjectsService from '@/services/ProjectsService';
import TagsService from '@/services/TagsService';

export default {
  name: "ProjectEditPage",
  components: {
    MdInput,
    MdTextarea,
    Container
  },
  data() {
    return {
      title: '',
      description: '',
      concept: '',
      imgUrl: '',
      website: '',
      facebook: '',
      email: '',
      phone: '',
      whatsapp: '',
      tags: [],
      project_tags: []
    };
  },
  mounted() {
    this.getProject();
    this.getTags();
  },
  methods: {
    async getProject() {
      const response = await ProjectsService.getProject({
        id: this.$route.params.id
      });
      this.title = response.data.title;
      this.description = response.data.description;
      this.concept = response.data.concept;
      this.imgUrl = response.data.imgUrl;
      this.email = response.data.email;
      this.website = response.data.website;
      this.facebook = response.data.facebook;
      this.phone = response.data.phone;
      this.whatsapp = response.data.whatsapp;
      for (let tag of response.data.tags)
        this.project_tags.push(tag._id);
    },
    async updateProject() {
      await ProjectsService.updateProject({
        id: this.$route.params.id,
        title: this.title,
        description: this.description,
        concept: this.concept,
        imgUrl: this.imgUrl,
        website: this.website,
        facebook: this.facebook,
        email: this.email,
        phone: this.phone,
        whatsapp: this.whatsapp,
        tags: this.project_tags
      });
      this.$router.push({
        name: 'Projects'
      });
    },
    async getTags () {
      const response = await TagsService.fetchTags();
      this.tags = response.data.tags;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
