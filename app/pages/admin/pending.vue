<template>
  <v-dialog
      v-model="loading_modal"
      max-width="320"

  >
    <v-list
        class="py-2"
        color="green"
        elevation="12"
        rounded="lg"
    >
      <v-list-item
          title="已提出審核通過請求..."
      >
        <template v-slot:prepend>
          <div class="pe-4">
            <v-icon color="primary" size="x-large"></v-icon>
          </div>
        </template>

        <template v-slot:append>
          <v-progress-circular
              color="primary"
              indeterminate="disable-shrink"
              size="16"
              width="2"
          ></v-progress-circular>
        </template>
      </v-list-item>
    </v-list>
  </v-dialog>
  <v-dialog
      v-model="approve_modal"
      width="auto"
  >
    <v-card
        max-width="400"
        prepend-icon="mdi-help"
        text="是否確定通過"
        title="請確認是否通過此文章"
    >
      <template v-slot:actions>
        <v-btn
            class="ms-auto"
            text="通過"
            @click="approve_post(1)"
        ></v-btn>
      </template>
    </v-card>
  </v-dialog>
  <v-dialog v-model="error_modal">
    <v-card
        class="mx-auto"
        prepend-icon="mdi-alert-circle"
        width="400"
        color="red"
    >
      <template v-slot:title>
        <span class="font-weight-black">請求失敗</span>
      </template>

      <v-card-text class="bg-surface-light pt-4">
        <v-row align="center" no-gutters>
          <v-col
              class="text-h2"
              cols="6"
          >
            403
          </v-col>


        </v-row>
      </v-card-text>
 
    </v-card>
  </v-dialog>
  <v-container class="py-8 px-6">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list lines="two">
            <v-list-subheader>待審核</v-list-subheader>

            <v-data-table :items="review_posts" :headers="headers" item-key="title">
              <template v-slot:item.actions="{ item }">
                <v-btn
                    icon="mdi-check"
                    variant="text"
                    @click="approve_modal = true"
                />
                <v-btn
                    icon="mdi-delete"
                    variant="text"
                />

              </template>
            </v-data-table>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script type="ts" setup>
import {ref} from 'vue';

const approve_modal = ref(false)
const loading_modal = ref(false)
const error_modal = ref(false)
const approve_post = (id) => {
  approve_modal.value = false
  setTimeout(() => loading_modal.value = true, 250)
  setTimeout(() => {
    loading_modal.value = false
    setTimeout(() => error_modal.value = true, 250)
  }, 2000)
}
const headers = [
  {title: '標題', value: 'title'},

  {title: "內容", value: "content"},
  {title: 'IP位置', value: 'ip'},
  {title: '文章ID', value: 'id'},
  {title: "創建日期", value: "date"},
  {title: "動作", value: "actions"}
]
const review_posts = [
  {
    title: "八年七班小特是傻逼，請各位避開",
    content: "八年七班小特是傻逼，請各位避開",
    id: 0,
    ip: "127.0.0.1",
    date: "2024-03-12 00:00:00",
    actions: ""
  },
];</script>