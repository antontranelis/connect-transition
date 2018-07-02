<template>
<div class="container-fluid">
  <div class="row margin-top">
    <div class="col-lg-2 col-md-4">
      <img class="img-fluid margin-bottom" v-show="imgUrl" :src="imgUrl" alt="Card image cap" waves></img>
    </div>
    <div class="col-xl-8 col-lg-7 col-md-8 margin-bottom">
      <div class="card full-height">
        <div class="card-body">
          <h1>{{title}}</h1>
          <p>{{description}}</p>
          <span v-for="tag in tags" :key="tag._id">
              <badge class="hov" color="stylish-color">{{tag.title_en}}</badge>&nbsp;
            </span>
        </div>
      </div>
    </div>
    <div class="col-xl-2 col-lg-3 col-md-4 margin-bottom d-none d-lg-block">
      <div class="card full-height">
        <card-body>
          <div class="">
            <span v-show="website" :href="website" target="_blank" class="icons-sm wb-ic">
              <fa icon="globe" /><a :href="website"> Website</a><br>
            </span>
            <span v-show="facebook" :href="facebook" class="icons-sm fb-ic">
              <fa icon="facebook"/><a :href="facebook"> Facebook</a><br>
            </span>
            <span v-show="email" :href="'mailto:'+email" class="icons-sm email-ic">
              <fa icon="envelope" /><a :href="email"> E-Mail</a><br>
            </span>
            <span v-show="whatsapp"><fa icon="whatsapp"/> {{whatsapp}}<br></span>
            <span v-show="phone"><fa icon="phone" /> {{phone}}</span>
          </div>
        </card-body>
      </div>
    </div>
  </div>
  <br>
  <div class="row">
    <div class="col-xl-2 col-lg-2 col-md-3 d-none d-lg-block">
      <div class="card text-center margin-bottom">
        <div class="nav flex-column nav-pills nav-fill" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a class="nav-link active" id="v-pills-concept-tab" data-toggle="pill" href="#v-pills-concept" role="tab" aria-controls="v-pills-concept" aria-selected="true">Concept</a>
          <a class="nav-link" id="v-pills-blog-tab" data-toggle="pill" href="#v-pills-blog" role="tab" aria-controls="v-pills-blog" aria-selected="false">Blog</a>
          <a class="nav-link" id="v-pills-media-tab" data-toggle="pill" href="#v-pills-media" role="tab" aria-controls="v-pills-media" aria-selected="false">Media</a>
          <a class="nav-link" id="v-pills-crowdfundings-tab" data-toggle="pill" href="#v-pills-crowdfundings" role="tab" aria-controls="v-pills-crowdfundings" aria-selected="false">Crowdfundings</a>
          <a class="nav-link" id="v-pills-tasks-tab" data-toggle="pill" href="#v-pills-tasks" role="tab" aria-controls="v-pills-tasks" aria-selected="false">Tasks</a>
        </div>
      </div>
    </div>
    <div class="col-md-12 col-sm-12 col-xs-12 d-lg-none">
      <div class="card text-center  margin-bottom">
        <div class="nav nav-justified nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
          <a class="nav-link active" id="v-pills-concept-tab" data-toggle="pill" href="#v-pills-concept" role="tab" aria-controls="v-pills-concept" aria-selected="false">Concept</a>
          <a class="nav-link" id="v-pills-blog-tab" data-toggle="pill" href="#v-pills-blog" role="tab" aria-controls="v-pills-blog" aria-selected="true">Blog</a>
          <a class="nav-link" id="v-pills-media-tab" data-toggle="pill" href="#v-pills-media" role="tab" aria-controls="v-pills-media" aria-selected="false">Media</a>
          <a class="nav-link" id="v-pills-crowdfundings-tab" data-toggle="pill" href="#v-pills-crowdfundings" role="tab" aria-controls="v-pills-crowdfundings" aria-selected="false">Crowdfundings</a>
          <a class="nav-link" id="v-pills-tasks-tab" data-toggle="pill" href="#v-pills-tasks" role="tab" aria-controls="v-pills-tasks" aria-selected="false">Tasks</a>
        </div>
      </div>
    </div>
    <div class="col-xl-8 col-lg-7 col-md-12 col-sm-12 col-xs-12">
      <div class="tab-content" id="v-pills-tabContent">
        <div class="tab-pane fade show active margin-bottom" id="v-pills-concept" role="tabpanel" aria-labelledby="v-pills-concept-tab">
          <div class="card">
            <card-body>
              <div v-html="compiledConcept"></div>
            </card-body>
          </div>
        </div>
        <div class="tab-pane fade margin-bottom" id="v-pills-blog" role="tabpanel" aria-labelledby="v-pills-blog-tab">
          <div class="card margin-bottom" v-for="post in posts" :key="post._id">
            <div class="card-body">
              <h2>{{post.title}}</h2>
              <p>Posted on {{ post.date | moment("dddd, MMMM Do YYYY") }}</p>
              <span v-for="tag in post.tags" :key="tag._id">
                <badge class="hov" color="stylish-color">{{tag.title_en}}</badge>&nbsp;
              </span>
              <hr>
              <!-- Preview Image -->
              <div v-if="post.mediaUrl">
                <img class="img-fluid thumbnail" alt="Responsive image" :src="post.mediaUrl"></img>
                <hr>
              </div>
              <!-- Post Content -->
              <p v-html="post.text"></p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <btn tag="a" class="align-right shadow" size="lg" color="green" :href="'#/posts/new/'+id"><b>Add Post</b></btn>
            </div>
          </div>

        </div>
        <div class="tab-pane fade  margin-bottom" id="v-pills-media" role="tabpanel" aria-labelledby="v-pills-media-tab">
          <div class="card-columns">
            <div v-for="media in mediaPosts" :key="media._id" class="card more-margin-bottom">
              <img v-img="{src: media.mediaUrl, group : 'gallery', title: media.title, thumbnails: true}" class="card-img-top" :src="media.mediaUrl" :alt="media.title">
              <div class="card-body">
                <h5 class="card-title">{{media.title}}</h5>
                <p class="card-text" v-html="media.text"></p>
                <p class="card-text"><small class="text-muted">{{ media.date | moment("dddd, MMMM Do YYYY") }}</small></p>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <btn tag="a" class="align-right shadow" size="lg" color="green" :href="'#/media/new/'+id"><b>Add Media</b></btn>
            </div>
          </div>
        </div>
        <div class="tab-pane fade  margin-bottom" id="v-pills-crowdfundings" role="tabpanel" aria-labelledby="v-pills-crowdfundings-tab">
          <div class="card">
            <card-body>
              <card-title>
                Buying land
              </card-title>
              <p>This money will be used to buy 2ha of land near San Augustin</p>
              <p>Send ETH at <a href="https://etherscan.io/address/0x5310c1290886ced4b65ade3dcf2b5fdbc8cf2455">0x5310C1290886cEd4B65AdE3dCF2b5FdbC8CF2455</a></p>
              <progress-wrapper class="mt-2" :height="20">
                <progress-bar :value="80" color="success"></progress-bar>
              </progress-wrapper>
              <span>0€</span><span class="float-right">5.000€</span>
            </card-body>
          </div>
        </div>
        <div class="tab-pane fade  margin-bottom" id="v-pills-tasks" role="tabpanel" aria-labelledby="v-pills-tasks-tab">...</div>
      </div>

    </div>
    <div class="col-xl-2 col-lg-3 col-md-12 col-sm-12 col-xs-12">
      <div class="row">
        <div class="col-12 d-lg-none">
          <div class="card margin-bottom">
            <card-body>
              <div class="">
                <span v-show="website" :href="website" target="_blank" class="icons-sm wb-ic">
                  <fa icon="globe" /><a :href="website"> Website</a><br>
                </span>
                <span v-show="facebook" :href="facebook" class="icons-sm fb-ic">
                  <fa icon="facebook"/><a :href="facebook"> Facebook</a><br>
                </span>
                <span v-show="email" :href="'mailto:'+email" class="icons-sm email-ic">
                  <fa icon="envelope" /><a :href="email"> E-Mail</a><br>
                </span>
                <span v-show="whatsapp"><fa icon="whatsapp"/> {{whatsapp}}<br></span>
                <span v-show="phone"><fa icon="phone" /> {{phone}}</span>
              </div>
            </card-body>
          </div>
        </div>
        <div class="col-12">
          <div class="card margin-bottom">
            <card-body>
              <h5>Events</h5>
            </card-body>
          </div>
        </div>
        <div class="col-12">
          <div class="card">
            <card-body>
              <l-map class="map" :zoom="zoom" :center="center">
                <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
              </l-map>
            </card-body>
          </div>
        </div>
      </div>

    </div>
  </div>
</div>
</template>

<script>
import {
  MdInput,
  MdTextarea,
  Container,
  Badge,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Fa,
  Btn,
  ProgressWrapper,
  ProgressBar
} from "mdbvue";
import ProjectsService from '@/services/ProjectsService';
import PostsService from '@/services/PostsService';
import TagsService from '@/services/TagsService';
import marked from 'marked/marked.min.js';
import bootstrapjs from 'bootstrap/dist/js/bootstrap.js';

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
  name: "ProjectEditPage",
  components: {
    MdInput,
    MdTextarea,
    Container,
    Badge,
    Card,
    CardImg,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Fa,
    bootstrapjs,
    Btn,
    ProgressWrapper,
    ProgressBar,
    LMap,
    LTileLayer,
    LMarker,
    L
  },
  data() {
    return {
      id: null,
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
      project_tags: [],
      posts: [],
      zoom: 5,
      center: L.latLng(0.413220, -70.219482),
      url: 'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmV4dHF1ZXN0IiwiYSI6ImNqM2x1dzNkbDAxajUyd3F0bmc3b3E0dHQifQ.V4hEw7CC3e_76sNhMxwE3Q',
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      index: null
    };
  },
  computed: {
    compiledConcept() {
      if (this.concept) {
        return marked(this.concept, {
          sanitize: true
        });
      }
    },
    mediaPosts() {
      return this.posts.filter(function(post) {
        if (post.type === "image") {
          return true;
        }
      });
    }
  },
  mounted() {
    this.getProject();
    this.getTags();
    this.getPosts();
    this.id = this.$route.params.id;
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
      this.project_tags = response.data.tags;
    },
    async getPosts() {
      const response = await PostsService.getPostsById({
        id: this.$route.params.id
      });
      this.posts = response.data.posts;
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
    async getTags() {
      const response = await TagsService.fetchTags();
      this.tags = response.data.tags;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {}

.more-margin-bottom {
  margin-bottom: 1rem;
}

.margin-bottom {
  margin-bottom: 1rem;
}

.icons-sm {
  padding-right: 1rem;
}

.margin-top {
  margin-top: 1rem;
}

.nav-link.active {
  background-color: #3e2723 !important;
}

.project-header {
  padding: 1rem;
}

.img-fluid {
  border-radius: 0.25rem;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
}

.full-height {
  height: 100%;
}

.map {
  height: 200px;
}

.card-columns {
  column-count: auto;
  column-width:20rem;
}

.thumbnail
{
  height: 200px;
}
</style>
