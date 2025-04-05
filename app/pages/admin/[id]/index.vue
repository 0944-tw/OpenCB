<template>


<v-container class="py-8 px-6">
        <v-row>
            <v-col cols="12">
           

            </v-col>
        </v-row>
    </v-container>
</template>

<script setup>
import { onMounted } from 'vue';

import { useRoute } from 'vue-router';

const route = useRoute();
const id = route.params.id;
onMounted(() => {
    const postinfo = $fetch(`/api/admin/articles/${id}`)
})
</script>