<!-- Post your post -->
<template>

    <v-container class="d-flex justify-center align-center" style="height: 100vh">
        <v-row class="w-100">
            <v-col cols="12" sm="8" md="6" lg="4">
                <v-card>
                    <template v-slot:title>
                        發表文章
                    </template>
                    <v-card-text>
                        <v-text-field label="標題" v-model="title" variant="outlined"></v-text-field>
                        <v-textarea label="內容" v-model="content" variant="outlined"></v-textarea>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :loading="loading" variant="elevated" @click="submit" color="blue">發表</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { ref } from "vue";

const title = ref("");
const content = ref("");
const loading = ref(false)
const submit = async () => {
    loading.value = true
    await $fetch("/api/all/create", {
        method: "POST",
        body: {
            title: title.value,
            content: content.value,
        },
    })
    loading.value = false
};
</script>