<template>

  <v-dialog v-model="approve_modal" width="auto">
    <v-card max-width="400">
      <template v-slot:title>通過此文章</template>
      <template v-slot:subtitle>將文章狀態設成通過</template>
      <template v-slot:text>
        您確定要將這篇文章的狀態更改為通過嗎?
      </template>
      <template v-slot:actions>
        <v-btn text="取消" @click="approve_modal = false"></v-btn>
        <v-btn text="確定" @click="approvePost(current_uuid)"></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-container class="py-8 px-6">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list lines="two">
            <v-list-subheader>待審核</v-list-subheader>

            <v-data-table :items="articles" :headers="headers" item-key="title" :loading="is_loading">
              <template v-slot:loading>
                <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-check" variant="text" @click="showApproveModal(item.id)" />
                <v-btn icon="mdi-delete" variant="text" />

              </template>
            </v-data-table>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { Article } from '@/types';

const approve_modal = ref(false)
const is_loading = ref(false)
const loading_modal = ref(false)
const current_uuid = ref("")

const articles = ref<Article[]>([])


const headers = [
  { title: "內容", value: "content" },
  { title: 'IP位置', value: 'ip' },
  { title: "創建日期", value: "createdAt" },
  { title: '文章ID', value: 'id' },
  { title: "動作", value: "actions" }
];

const loadArticles = async () => {
  try {
    is_loading.value = true;
    const lists: Article[] = await $fetch("/api/admin/articles/list?type=pending");
    articles.value = lists || [];
    is_loading.value = false;
  } catch (error) {
    console.error("Error loading articles:", error);
  }
}
const approvePost = async (uuid: string) => {
  const approve = await $fetch(`/api/admin/articles/${uuid}/approve`, {
    method: "POST"
  })
  approve_modal.value = false
  articles.value = []
  loadArticles()

}

const showApproveModal = async (uuid: string) => {
  approve_modal.value = true
  current_uuid.value = uuid
}
onMounted(async () => {
  loadArticles()
})

</script>