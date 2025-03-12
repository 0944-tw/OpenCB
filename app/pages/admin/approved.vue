

<script type="ts" setup>
const review_posts = [
  {
    title: "八年七班小特是傻逼，請各位避開",
    content: "八年七班小特是傻逼，請各位避開",
    id: 0,
  },
];</script>
<template>
  <v-container class="py-8 px-6">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list lines="two">
            <v-list-subheader>已審核</v-list-subheader>

            <template v-for="post in review_posts" :key="post.id">
              <v-list-item>
                <template v-slot:prepend>
                  <v-avatar></v-avatar>
                </template>

                <v-list-item-title> {{ post.title }}
                  <v-chip> #{{ post.id }}</v-chip>
                </v-list-item-title>

                <v-list-item-subtitle>{{
                    post.content
                  }}
                </v-list-item-subtitle>
              </v-list-item>
            </template>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
