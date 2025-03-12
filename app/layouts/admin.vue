<template>
    <v-navigation-drawer v-model="drawer" >
      <v-sheet class="pa-4">
        <v-avatar class="mb-4" size="64"></v-avatar>
  
        <div>歡迎回來</div>
      </v-sheet>
  
      <v-divider></v-divider>
  
      <v-list nav  density="compact" color="light-blue-darken-1">
        <div v-for="link in links" :key="link.icon" >
          <v-list-item

              v-if="!link.children"
              :prepend-icon="link.icon"
              :title="link.text"
              :to="link.to"
              link
          ></v-list-item>
          <v-list-group v-else>
            <template v-slot:activator="{ props }">
              <v-list-item
                  v-bind="props"
                  :title="link.text"
                  :prepend-icon="link.icon"
                   nav
              ></v-list-item>
            </template>
            <v-list-item v-for="sub_link in link.children"  :to="sub_link.to" :title="sub_link.text"  link>
            </v-list-item>
          </v-list-group>
        </div>

      </v-list>
    </v-navigation-drawer>
  
    <v-main>
       <slot />
     </v-main>
  </template>
  
  <script setup>
  import { ref } from "vue";
  
  
   
  const links = [
    {
      icon: "mdi-home",
      text: "主頁",
      to: "/admin/dashboard",
    },
    {
      icon: "mdi-gavel",
      text: "待審核",
      to: "/admin/pending",
    },
    {
      icon: "mdi-send",
      text: "已通過",
      to: "/admin/approved",
    },
    {
      icon: "mdi-delete",
      text: "垃圾桶",
      to: "/admin/trash",
    },
    {
      icon: "mdi-alert-octagon",
      text: "垃圾訊息",
      to: "/admin/spam",
    },
    {
      icon: "mdi-cog",
      text: "設定",
      children: [
        {
          text: "自動發文",
          to: "/admin/settings/auto"
        },
        {
          text: "資料庫配置",
          to: "/admin/settings/database"
        },
        {
          text: "帳號管理",
          to: "/admin/settings/user"
        }
      ]
    },
    {
      icon: "mdi-palette-swatch",
      text: "個人化",
      children: [
        {
          text: "投稿頁面"
        }
      ]
    }
  ];
  
  const drawer = ref(null);
  </script>
  