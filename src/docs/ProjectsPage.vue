<template>
<div>
  <div class="container-fluid">
    <div class="row">
      <div class="col-xl-2 col-lg-2 col-md-3 d-none d-lg-block  margin-top">
        <div class="card  filter-box ">
          <div v-for="tag in tags" :key="tag._id" class="form-check form-check-inline">
            <input class="form-check-input" type="checkbox" :id="tag._id" :value="tag._id" v-model="selected_tags">
            <label class="form-check-label" :for="tag._id">{{tag.title_en}}</label>
          </div>
        </div>
      </div>
      <div class="col-md-12 col-sm-12 col-xs-12 d-lg-none container-fluid shadow filter-box ">
        <div v-for="tag in tags" :key="tag._id" class="form-check form-check-inline">
          <input class="form-check-input" type="checkbox" :id="tag._id" :value="tag._id" v-model="selected_tags">
          <label class="form-check-label" :for="tag._id">{{tag.title_en}}</label>
        </div>
      </div>
      <div class="col-lg-10 col-md-12 margin-top">
        <div class="card-columns">
          <div v-for="project in filteredProjects" :key="project._id" class="card text-center shadow margin-bottom">
            <a :href="'/#/projects/view/'+project._id">
              <card-img v-show="project.imgUrl" :src="project.imgUrl" alt="Card image cap" waves></card-img>
            </a>
            <a :href="'/#/projects/view/'+project._id">
              <card-body>
                <card-title>{{project.title}}</card-title>
                <card-text>{{project.description}}</card-text>
                <span v-for="tag in project.tags" :key="tag._id">
              <badge class="hov" color="stylish-color">{{tag.title_en}}</badge>&nbsp;
            </span>
                <hr/>
                <div class="text-center">
                  <a v-show="project.website" :href="project.website" target="_blank" class="icons-sm wb-ic">
                    <fa icon="globe" />
                  </a>
                  <a v-show="project.facebook" :href="project.facebook" class="icons-sm fb-ic">
                    <fa icon="facebook" />
                  </a>
                  <a v-show="project.email" :href="'mailto:'+project.email" class="icons-sm email-ic">
                    <fa icon="envelope" />
                  </a>
                  <a color="red" :href="'/#/projects/edit/'+project._id" class="icons-sm email-ic">
                    <fa icon="pencil" />
                  </a>
                </div>
              </card-body>
            </a>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <btn tag="a" class="align-right shadow" size="lg" color="green" href="#/projects/new"><b>Add Project</b></btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {
  Container,
  Row,
  Column,
  Card,
  CardImg,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  Btn,
  Fa,
  Badge
} from 'mdbvue';
import ProjectsService from '@/services/ProjectsService';
import TagsService from '@/services/TagsService';

export default {
  name: 'ProjectsPage',
  components: {
    Container,
    Row,
    Column,
    Card,
    CardImg,
    CardHeader,
    CardBody,
    CardTitle,
    CardText,
    Btn,
    Fa,
    Badge
  },
  data() {
    return {
      projects: [],
      tags: [],
      selected_tags: []
    };
  },
  computed: {
    filteredProjects() {
      var self = this;
      return this.projects.filter(function(project) {
        var projectTagIds = [];
        for (let tag of project.tags) projectTagIds.push(tag._id);
        for (let selection of self.selected_tags)
          if (projectTagIds.includes(selection)) return true;
      });
    }
  },
  mounted() {
    this.getProjects();
    this.getTags();
  },
  methods: {
    async getProjects() {
      const response = await ProjectsService.fetchProjects();
      this.projects = response.data.projects;
    },
    async getTags() {
      const response = await TagsService.fetchTags();
      this.tags = response.data.tags;
      for (let tag of this.tags) this.selected_tags.push(tag._id);
    },
    async deleteProject(id) {
      await ProjectsService.deleteProject(id);
      this.$router.push({
        name: 'Projects'
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-columns {
  column-count: auto;
  column-width: 18rem;
}

.icons-sm {
  padding: 1rem;
}

.margin-bottom {
  margin-bottom: 2rem;
}

a {
  color: #4b515d;
}

a:hover {
  color: #388e3c;
}

.hov:hover {
  background-color: #388e3c !important;
  cursor: pointer;
}

.filter-box {
  background-color: #5d4037;
  color: #fff;
  padding: 1rem;
}

.shadowUrl {
  box-shadow: 5px 5px 18px #888888;
}

.margin-top {
  margin-top: 1rem;
}
</style>
