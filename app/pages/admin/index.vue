<template>
  <v-navigation-drawer v-model="drawer">
    <v-sheet class="pa-4">
      <v-avatar class="mb-4" size="64"></v-avatar>

      <div>歡迎回來</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="[icon, text] in links"
        :key="icon"
        :prepend-icon="icon"
        :title="text"
        link
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>

  <v-main>
    <v-container class="py-8 px-6">
      <v-row>
        <v-col cols="12">
          <v-card>
            <v-list lines="two">
              <v-list-subheader>待審核</v-list-subheader>

              <template v-for="post in review_posts" :key="post.id">
                <v-list-item>
                  <template v-slot:prepend>
                    <v-avatar></v-avatar>
                  </template>

                  <v-list-item-title> {{ post.title }} <v-chip> #{{ post.id }} </v-chip></v-list-item-title>

                  <v-list-item-subtitle>{{
                    post.content
                  }}</v-list-item-subtitle>
                </v-list-item>
              </template>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from "vue";

const review_posts = [
  {
    title: "八年七班小特是傻逼，請各位避開",
    content: "八年七班小特是傻逼，請各位避開",
    id: 0,
  },
];
const links = [
  ["mdi-inbox-arrow-down", "待審核"],
  ["mdi-send", "已通過"],
  ["mdi-delete", "垃圾桶"],
  ["mdi-alert-octagon", "垃圾訊息"],
];

const drawer = ref(null);
</script>
