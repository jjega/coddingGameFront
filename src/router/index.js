import Vue from "vue";
import Router from "vue-router";

// Pages component
import Home from "../pages/home/Home";
import EmperorLogin from "../pages/home/emperor/EmperorLogin";
import LudusLogin from "../pages/home/ludus/LudusLogin";
import AdminEmperor from "../pages/home/emperor/admin/AdminEmperor";
import LudusEmperor from "../pages/home/ludus/admin/AdminLudus";

// Middlewear
import auth from "../middlewear/auth";

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
          props: true
        },
        {
          path: "/ludus",
          name: "Ludus",
          component: LudusLogin,
          props: true
        }
      ]
    },
    {
      path: "/emperor/admin",
      name: "AdminEmperor",
      component: AdminEmperor,
      props: true,
      meta: {
        middleware: auth,
      }
    },
    {
      path: "/ludus/admin",
      name: "AdminLudus",
      component: LudusEmperor,
      props: true,
      meta: {
        middleware: auth,
      }
    }
  ]
});

Vue.use(Router);

export default router;
