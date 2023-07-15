<script setup>
import { MENU } from '../../utils/constants'
import { RouterLink } from 'vue-router'

defineProps({
  menu: {
    type: Array,
    default: () => MENU
  },
  cartItemsCount: {
    type: String,
    default: '0'
  }
})
</script>

<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-8 offset-lg-2">
        <nav class="navbar navbar-expand" role="navigation">
          <ul class="navbar-nav lg-menu">
            <li v-for="menuItem in menu" :key="menuItem.key" class="nav-item">
              <template v-if="menuItem.children">
                <a
                  href="/"
                  class="nav-link dropdown-toggle"
                  :id="`${menuItem.key}MenuLink`"
                  data-toggle="dropdown"
                >
                  {{ menuItem.name }}
                </a>
                <div class="dropdown-menu">
                  <router-link
                    v-for="subMenu in menuItem.children"
                    :key="subMenu.key"
                    :to="subMenu.path"
                    class="list-group-item"
                  >
                    {{ subMenu.name }}
                  </router-link>
                </div>
              </template>
              <router-link v-else :to="menuItem.path" class="nav-link">
                {{ menuItem.name }}
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-lg-2">
        <div class="search-right text-right">
          <div class="cart box_1">
            <router-link to="/cart">
              <i class="fa fa fa-shopping-basket"></i>
              <span class="cart-badge">{{ cartItemsCount }}</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
