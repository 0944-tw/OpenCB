<template>
  <v-dialog v-model="reject_modal" width="auto">
    <v-card max-width="400">
      <template v-slot:title>是否將狀態設成拒絕</template>
      <template v-slot:subtitle>更改文章狀態為拒絕</template>
      <template v-slot:text>
        您確定要將這篇文章的狀態更改為拒絕嗎？
      </template>
      <template v-slot:actions>
        <v-btn text="取消" @click="reject_modal = false"></v-btn>
        <v-btn text="確定" @click="rejectPost(current_uuid)"></v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-container class="py-8 px-6">
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-list lines="two">
            <v-list-subheader>已經通過</v-list-subheader>

            <v-data-table :items="articles" :headers="headers" item-key="id" :loading="is_loading">
              <template v-slot:loading>
                <v-skeleton-loader type="table-row@5"></v-skeleton-loader>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-btn icon="mdi-gavel" variant="text" @click="showRejectModal(item.id)" />
                <v-btn icon="mdi-delete" variant="text" />
              </template>
            </v-data-table>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Article } from '@/types';
import { fa } from 'vuetify/locale';
const is_loading = ref(false);
const reject_modal = ref(false);
const current_uuid = ref("");

const articles = ref<Article[]>([]);

const headers = [
  { title: '文章ID', value: 'id' },
  { title: "內容", value: "content" },
  { title: 'IP位置', value: 'ip' },
  { title: "創建日期", value: "createdAt" },
  { title: "動作", value: "actions" },
  { title: "狀態", value: "status"}
];

const loadArticles = async () => {
  try {
    is_loading.value = true;
    const lists: Article[] = await $fetch("/api/admin/articles/list?type=approved");
    articles.value = lists || [];
    is_loading.value = false;
  } catch (error) {
    console.error("Error loading articles:", error);
  }
};

const rejectPost = async (uuid: string) => {
  try {
    await $fetch(`/api/admin/articles/${uuid}/reject`, { method: "POST" });
    reject_modal.value = false;
    loadArticles();
  } catch (error) {
    console.error("Error rejecting post:", error);
  }
};

const showRejectModal = (uuid: string) => {
  reject_modal.value = true;
  current_uuid.value = uuid;
};

onMounted(loadArticles);
</script>
