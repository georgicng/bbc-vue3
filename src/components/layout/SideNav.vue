<script setup>
import { MENU, SOCIALS } from '../../utils/constants'
import { RouterLink } from 'vue-router'

defineProps({
  showNav: { type: Boolean, default: false },
  socials: {
    type: Array,
    default: SOCIALS
  },
  menu: {
    type: Array,
    default: MENU
  },
  logo: {
    type: String,
    default: '/images/logo_icon.png'
  }
})
defineEmits(['toggle'])
</script>

<template>
  <div class="sidenav-content">
    <div id="mySidenav" :class="`sidenav ${showNav ? 'to-left-toggle' : ''} `">
      <div id="web-name">
        <div class="text-center">
          <img :src="logo" class="logo" height="100" alt="" />
        </div>
        <ul class="main-menu-social list-inline list-unstyled text-center">
          <li v-for="social in socials" :key="social.type" class="list-inline-item">
            <a :href="social.link" target="_blank" rel="noreferrer">
              <span>
                <i :class="`fab ${social.icon}`"></i>
              </span>
            </a>
          </li>
        </ul>
      </div>

      <div id="main-menu">
        <div class="sidenav-closebtn">
          <button class="btn btn-default" id="sidenav-close" @click="$emit('toggle')">
            &times;
          </button>
        </div>
        <div class="list-group panel">
          <template v-for="menuItem in menu" :key="menuItem.key">
            <template v-if="menuItem?.children">
              <a :href="`#menu-${menuItem.key}`" class="list-group-item" data-toggle="collapse">
                <span>
                  <i :class="`${menuItem.icon} sidebar-icon`"></i>
                </span>
                {{ menuItem.name }}
                <span>
                  <i class="fa fa-caret-down arrow"></i>
                </span>
              </a>
              <div class="sub-menu collapse" :id="`menu-${menuItem.key}`" data-parent="#main-menu">
                <router-link
                  v-for="subMenu in menuItem.children"
                  :key="subMenu.key"
                  :to="subMenu.path"
                  class="list-group-item"
                  @click="$emit('toggle')"
                >
                  {{ subMenu.name }}
                </router-link>
              </div>
            </template>
            <router-link
              v-else
              :to="menuItem.path"
              class="list-group-item"
              @click="$emit('toggle')"
            >
              <span>
                <i :class="`${menuItem.icon} sidebar-icon`"></i>
              </span>
              {{ menuItem.name }}
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
