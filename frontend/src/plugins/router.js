import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Home from '@/views/Home'
import Login from '@/views/Authenticate/Login'
import Register from '@/views/Authenticate/Register'

import BrowseRecipes from '@/views/Recipes/BrowseRecipes'
import EditRecipe from '@/views/Recipes/EditRecipe'

import BrowseShoppingLists from '@/views/ShoppingLists/BrowseShoppingLists'
import EditShoppingList from '@/views/ShoppingLists/EditShoppingList'

import ShoppingCart from '@/views/ShoppingCart'
import Fridge from '@/views/Fridge'

import EditAccountInfo from '@/views/Account/EditAccountInfo'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { secured: false }
  },
  {
    path: '/inscription',
    name: 'Register',
    component: Register,
    meta: { secured: false }
  },
  {
    path: '/recettes',
    name: 'BrowseRecipes',
    component: BrowseRecipes
  },
  {
    path: '/recettes/:recipeUID/modifier',
    name: 'EditRecipe',
    component: EditRecipe
  },
  {
    path: '/shopping/listes',
    name: 'BrowseShoppingLists',
    component: BrowseShoppingLists
  },
  {
    path: '/shopping/liste/:shoppingListUID/modifier',
    name: 'EditShoppingList',
    component: EditShoppingList
  },
  {
    path: '/shopping/caddy',
    name: 'ShoppingCart',
    component: ShoppingCart
  },
  {
    path: '/mon-frigo',
    name: 'Fridge',
    component: Fridge
  },
  {
    path: '/mon-compte',
    name: 'EditAccountInfo',
    component: EditAccountInfo
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((nextRoute, _, next) => {
  // by default all routes are secured, except those with explicit secured = false
  const securedRoute = !(nextRoute.meta.secured === false);

  if (securedRoute) {
    console.log('accessing secured route');

    if (store.state.auth.authenticated) {
      console.log('already authenticated');
      next();
    } else {
      console.log('trying to authenticate');

      store.dispatch("auth/fromLocalStorage")
        .then(() => {
          console.log('authenticated');
          next()
        })
        .catch(() => {
          console.log('authentication failed')
          next({ name: 'Login' })
        });
    }
  } else {
    console.log('accessing non secured route');
    next();
  }

})

export default router
