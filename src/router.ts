import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Word from './views/Word.vue';
import Topics from './views/Topics.vue';
import Topic from './views/Topic.vue';
import TopicStart from './views/TopicStart.vue';
import TopicEnd from './views/TopicEnd.vue';
import Player from './views/Player.vue';



Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/topics',
      name: 'topic-list',
      component: Topics,
    },
    {
      path: '/topic/:tslug',
      name: 'topic',
      component: Topic,
      children: [
        {
          path: 'word',
          name: 'player',
          component: Player,
          children: [
            {
              path: ':wslug',
              name: 'word-detail',
              component: Word,
            },
          ],
        },
        {
          path: 'start',
          name: 'topic-start',
          component: TopicStart,
        },
        {
          path: 'end',
          name: 'topic-end',
          component: TopicEnd,
        },
        { path: '/', redirect: 'start' },
        { path: '', redirect: 'start' },
        { path: '**', redirect: 'start' },
      ],
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
    },
    { path: 'index.html', redirect: '/' },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
