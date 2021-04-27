import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import Hello from '@/components/Hello';
import HelloChild from '@/components/HelloChild';
import HelloChildChild from '@/components/HelloChildChild';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/Hello',
      name: 'Hello',
      component: Hello,
      children: [
        {
          path: '/',
          component: Hello,
        },
        {
          path: '/helloChild',
          component: HelloChild,
          children: [
            {
              path: '/helloChildChild',
              component: HelloChildChild,
            },
          ],
        },
      ],
    },
  ],
});
