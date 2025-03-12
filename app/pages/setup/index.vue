<!-- Post your post -->
<template>
  <v-container class="d-flex justify-center align-center" style="height: 100vh">
    <v-row class="w-100">
      <v-col cols="12" sm="8" md="6" lg="4">
        <v-card>
          <v-stepper-vertical>
            <template v-slot:default="{ step }">
              <v-stepper-vertical-item
                :complete="step > 1"
                title="設定OpenCB"
                value="1"
              >
                歡迎設定你的OpenCB，接下來我們會引導你完成網站的設定。
                <v-text-field
                  label="網站名稱"
                  placeholder="壢中匿名"
                ></v-text-field>
                <template v-slot:next="{ next }">
                  <v-btn color="primary" @click="next">下一步</v-btn>
                </template>

                <template v-slot:prev></template>
              </v-stepper-vertical-item>

              <v-stepper-vertical-item
                :complete="step > 2"
                title="基本帳戶配置"
                value="2"
              >
                <v-form @submit.prevent ref="form">
                  <v-row>
                    <v-col>
                      <v-text-field
                        v-model="email"
                        label="電子郵件"
                        :rules="emailRules"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col>
                      <v-text-field
                        v-model="name"
                        label="名稱"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="password"
                    :rules="pwdRules"
                    label="密碼"
                    required
                  ></v-text-field>

                  <template v-slot:next="{ next }">
                    <v-btn
                      color="primary"
                      @click="
                        () => {
                          if (form.value.validate()) {
                            next();
                          }
                        }
                      "
                      >下一步</v-btn
                    >
                  </template>
                  <template v-slot:prev="{ prev }">
                    <v-btn variant="plain" @click="prev">返回</v-btn>
                  </template>
                </v-form>
              </v-stepper-vertical-item>
              <v-stepper-vertical-item
                :complete="step > 3"
                title="資料庫配置"
                value="3"
              >
                <v-select :items="['Redis']" label="資料庫" required>
                  <template v-slot:append-item>
                    <v-divider class="mb-2"></v-divider>

                    <v-list-item  subtitle="哈哈只支援Redis" title="Redis" >
                      <template v-slot:prepend>
                        <v-avatar
                          color="red"
                          icon="mdi-database"
                        >
                          
                      </v-avatar>
                      </template>
                    </v-list-item>
                  </template>
                </v-select>

                <v-text-field label="Redis URL" class="py-2"></v-text-field>
                <template v-slot:next="{ next }">
                  <v-btn color="primary" @click="next">下一步</v-btn>
                </template>

                <template v-slot:prev="{ prev }">
                  <v-btn variant="plain" @click="prev">上一步</v-btn>
                </template>
              </v-stepper-vertical-item>

              <v-stepper-vertical-item
                title="確定"
                value="4"
                @click:next="onClickFinish"
              >
                <template v-slot:next="{ next }">
                  <v-btn color="primary" text="Finish" @click="next"
                    >完成</v-btn
                  >
                </template>

                <template v-slot:prev="{ prev }">
                  <v-btn variant="plain" @click="prev">再看看</v-btn>
                </template>
              </v-stepper-vertical-item>
            </template>
          </v-stepper-vertical>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {
  VStepperVertical,
  VStepperVerticalItem,
  VStepperVerticalActions,
} from "vuetify/labs/components";
import { shallowRef } from "vue";

const finished = shallowRef(false);
// register info
const name = ref("");
const email = ref("");
const password = ref("");
const form = ref();
// Install DatabaseInfo
const db_type = ref("");
const db_url = ref("");
// Rules
const emailRules = [
  (value) => {
    if (value) return true;

    return "空白？請放點東西好嗎。";
  },
  (value) => {
    if (/.+@.+\..+/.test(value)) return true;

    return "請輸入點正常的電子郵件";
  },
];
const pwdRules = [
  (value) => {
    if (value) return true;

    return "空白？請放點東西好嗎。";
  },
  (value) => {
    if (value.length >= 8) return true;

    return "密碼長度至少8個字元";
  },
];
function onClickFinish() {
  finished.value = true;

  alert("Finished");
}
</script>
