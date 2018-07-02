import Vue from 'vue';
import Router from 'vue-router';

import HomePage from '../docs/HomePage';
import ProjectsPage from '../docs/ProjectsPage';
import ProjectsMapPage from '../docs/ProjectsMapPage';
import ProjectViewPage from '../docs/ProjectViewPage';
import ProjectEditPage from '../docs/ProjectEditPage';
import ProjectNewPage from '../docs/ProjectNewPage';
import PostsPage from '../docs/PostsPage';
import PostNewPage from '../docs/PostNewPage';
import MediaNewPage from '../docs/MediaNewPage';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomePage
    },
    {
      path: '/projects',
      name: 'Projects',
      component: ProjectsPage
    },
    {
      path: '/map',
      name: 'Map',
      component: ProjectsMapPage
    },
    {
      path: '/projects/view/:id',
      name: 'View Project',
      component: ProjectViewPage
    },
    {
      path: '/projects/edit/:id',
      name: 'Edit Project',
      component: ProjectEditPage
    },
    {
      path: '/projects/new',
      name: 'New Project',
      component: ProjectNewPage
    },
    {
      path: '/blog',
      name: 'Blog',
      component: PostsPage
    },
    {
      path: '/posts/new/:project',
      name: 'New Post',
      component: PostNewPage
    },
    {
      path: '/media/new/:project',
      name: 'New Media',
      component: MediaNewPage
    }
  ]
});
