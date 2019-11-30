import Vue from "vue";
import Router from "vue-router";

// Pages component
import Home from '../pages/home/Home';
import EmperorLogin from '../pages/home/emperor/EmperorLogin';
import LudusLogin from '../pages/home/ludus/LudusLogin';
import AdminEmperor from '../pages/home/emperor/admin/AdminEmperor';
import LudusEmperor from '../pages/home/ludus/admin/AdminLudus';

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      children: [
        {
          path: "/emperor", 
          name: "Emperor", 
          component: EmperorLogin,
          props: true,
          children: [
            { path: "/emperor/admin", name: "AdminEmperor", component: AdminEmperor, props: true }
          ]
        },
        {
          path: "/ludus", 
          name: "Ludus", 
          component: LudusLogin,
          props: true,
          children: [
            { path: "/ludus/admin", name: "LudusEmperor", component: LudusEmperor, props: true }
          ]
        },
    ]
    }
  ]
});

Vue.use(Router);

export default router;