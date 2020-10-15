import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      component: resolve => require(['../common/home'], resolve),
      meta: { title: 'news' },
      children:[
        {
          path: '/video',
          component: resolve => require(['../pages/video/gangju/index'], resolve)
        },
        {
          path: '/cartoon',
          component: resolve => require(['../pages/video/gangju/cartoon'], resolve)
        },
        {
          path: '/live',
          component: resolve => require(['../pages/video/gangju/live'], resolve)
        },
        {
          path: '/movie',
          component: resolve => require(['../pages/video/gangju/movie'], resolve)
        },
        {
          path: '/tv',
          component: resolve => require(['../pages/video/gangju/tv'], resolve)
        },
        {
          path: '/show',
          component: resolve => require(['../pages/video/gangju/show'], resolve)
        },
        {
          path: '/search',
          component: resolve => require(['../pages/video/gangju/search'], resolve)
        },
        {
          path: '/player',
          component: resolve => require(['../pages/video/gangju/player'], resolve)
        },
        {
          path: '/play/:url',
          component: resolve => require(['../pages/video/gangju/play'], resolve)
        },
        {
          path: '/',
          component: resolve => require(['../pages/news/index'], resolve)
        },
        {
          path: '/detail/:id',
          component: resolve => require(['../pages/news/detail'], resolve)
        },
        {
          path: '/news',
          component: resolve => require(['../pages/news/search'], resolve)
        },
        {
          path: '/membership',
          component: resolve => require(['../pages/membership/index'], resolve)
        },
        {
          path: '/member',
          component: resolve => require(['../pages/membership/detail'], resolve)
        },
        {
          path: '/ad',
          component: resolve => require(['../common/components/float-ad'], resolve)
        }
      ]
    }
  ]
});

export default router
