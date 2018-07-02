<template>
    <l-map class="map" :zoom="zoom" :center="center">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker v-for="m in marker" :key="m" :lat-lng="m"></l-marker>
    </l-map>
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
  Fa
} from 'mdbvue';
import ProjectsService from '@/services/ProjectsService';

import { LMap, LTileLayer, LMarker } from 'vue2-leaflet';
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

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
    LMap,
    LTileLayer,
    LMarker,
    L
  },
  data() {
    return {
      projects: [],
      zoom:5,
      center: L.latLng(0.413220, -70.219482),
      url:'https://api.tiles.mapbox.com/v4/mapbox.streets/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmV4dHF1ZXN0IiwiYSI6ImNqM2x1dzNkbDAxajUyd3F0bmc3b3E0dHQifQ.V4hEw7CC3e_76sNhMxwE3Q',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      marker: [
        L.latLng(0.413220, -74.219482),
        L.latLng(0.433220, -70.219482),
        L.latLng(2.463220, -70.219482),
        L.latLng(4.413220, -72.219482)
      ]
    };
  },
  mounted() {
    this.getProjects();
    setTimeout(function() {
      window.dispatchEvent(new Event('resize'));
    }, 250);
  },
  methods: {
    async getProjects() {
      const response = await ProjectsService.fetchProjects();
      this.projects = response.data.projects;
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
.map
{
  position: absolute;
  top: 56px;
  bottom: 0px;
  height: auto !important;
  z-index: 0;
}

.leaflet-control
{
  margin-top: 70px;
}
</style>
