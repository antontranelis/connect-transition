<template>
<container class="mt-5">
  <h2>New Project</h2>
  <br>
  <div class="row">
    <div class="col-12">
      <div class="card text-center margin-bottom">
        <div class="nav nav-justified nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a class="nav-link active" id="v-pills-info-tab" data-toggle="pill" href="#v-pills-info" role="tab" aria-controls="v-pills-info" aria-selected="false">Info</a>
          <a class="nav-link" id="v-pills-contact-tab" data-toggle="pill" href="#v-pills-contact" role="tab" aria-controls="v-pills-contact" aria-selected="true">Contact</a>
          <a class="nav-link" id="v-pills-tags-tab" data-toggle="pill" href="#v-pills-tags" role="tab" aria-controls="v-pills-tags" aria-selected="false">Tags</a>
          <a class="nav-link" id="v-pills-locations-tab" data-toggle="pill" href="#v-pills-locations" role="tab" aria-controls="v-pills-locations" aria-selected="false" v-on:click="fixMap">Location</a>
        </div>
      </div>
    </div>
  </div>
  <form enctype="multipart/form-data">
    <div class="tab-content" id="v-pills-tabContent">
      <div class="tab-pane fade show active margin-bottom" id="v-pills-info" role="tabpanel" aria-labelledby="v-pills-info-tab">
        <div class="card">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-12">
                <md-input size="md" label="Titel" v-model="title" />
              </div>
              <div class="form-group col-md-12">
                <md-input size="md" label="Short Description" v-model="description" />
              </div>
              <div class="form-group col-md-6">
                <md-input size="md" label="Image URL" v-model="imgUrl" />
              </div>
              <div class="form-group col-md-6">
                <label for="imgFile">or upload image file</label>
                <input type="file" accept="image/*" class="form-control-file" id="imgFile" @change="onFileChanged">
              </div>
            </div>
            <div class="form-row">
              <div class="form-group col-md-12">
                <md-textarea label="Concept" v-model="concept" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade margin-bottom" id="v-pills-contact" role="tabpanel" aria-labelledby="v-pills-contact-tab">
        <div class="card">
          <div class="card-body">
            <div class="form-row">
              <div class="form-group col-md-6">
                <md-input size="md" label="Website URL" v-model="website" />
              </div>
              <div class="form-group col-md-6">
                <md-input size="md" label="Facebook URL" v-model="facebook" />
              </div>
              <div class="form-group col-md-6">
                <md-input size="md" label="E-Mail" v-model="email" />
              </div>
              <div class="form-group col-md-6">
                <md-input size="md" label="Phone" v-model="phone" />
              </div>
              <div class="form-group col-md-6">
                <md-input size="md" label="Whatsapp" v-model="whatsapp" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade margin-bottom" id="v-pills-tags" role="tabpanel" aria-labelledby="v-pills-tags-tab">
        <div class="card">
          <div class="card-body">
            <!-- Checkbox -->
            <div v-for="tag in tags" :key="tag._id" class="form-check mb-2 mr-sm-2">
              <input class="form-check-input" type="checkbox" :id="tag._id" :value="tag._id" v-model="project_tags">
              <label class="form-check-label" :for="tag._id">
            {{tag.title_en}}
        </label>
            </div>
          </div>
        </div>
      </div>
      <div class="tab-pane fade margin-bottom" id="v-pills-locations" role="tabpanel" aria-labelledby="v-pills-locations-tab">
        <div class="card">
          <div class="card-body">
            <md-input size="md" label="Country" />
            <md-input size="md" label="City" />
            <l-map ref="map" class="map" :zoom="zoom" :center="center">
              <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              <l-marker v-for="m in marker" :key="m" :lat-lng="m"></l-marker>
            </l-map>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-md" @click="addProject">Create</button>
    </div>
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
import ImagesService from '@/services/ImagesService';

import {
  LMap,
  LTileLayer,
  LMarker
} from 'vue2-leaflet';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: "ProjectNewPage",
  components: {
    MdInput,
    MdTextarea,
    Container,
    LMap,
    LTileLayer,
    LMarker,
    L
  },
  data() {
    return {
      title: '',
      description: '',
      concept: '',
      imgUrl: '',
      imgFile: null,
      website: '',
      facebook: '',
      email: '',
      phone: '',
      whatsapp: '',
      tags: [],
      project_tags: [],
      zoom: 5,
      center: L.latLng(0.413220, -70.219482),
      url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmV4dHF1ZXN0IiwiYSI6ImNqM2x1dzNkbDAxajUyd3F0bmc3b3E0dHQifQ.V4hEw7CC3e_76sNhMxwE3Q',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: [
        L.latLng(0.413220, -74.219482),
        L.latLng(0.433220, -70.219482),
        L.latLng(2.463220, -70.219482),
        L.latLng(4.413220, -72.219482)
      ]
    };
  },
  mounted() {
    this.getTags();
  },
  methods: {
    async addProject() {
      await ProjectsService.addProject({
        title: this.title,
        description: this.description,
        concept: this.concept,
        imgUrl: this.imgUrl,
        imgFile: this.imgFile,
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
      this.imgUrl = x.data;
    },
    fixMap() {
      var _this = this;
      setTimeout(function() {
        _this.$refs.map.mapObject.invalidateSize();
      }, 200);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  height: 200px;
  width: 100%;
}
</style>
