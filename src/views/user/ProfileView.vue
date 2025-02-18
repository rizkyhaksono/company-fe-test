<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 
    dark:bg-gray-800 dark:text-white p-4">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
      <h2 class="text-3xl font-bold text-gray-800 text-center">Profile</h2>

      <div class="mt-6 space-y-6">
        <div>
          <label class="block text-gray-700 font-medium">Nama</label>
          <input v-model="user.name" type="text" class="w-full p-3 border rounded-lg bg-gray-50" disabled />
        </div>
        <div>
          <label class="block text-gray-700 font-medium">Email</label>
          <input v-model="user.email" type="email" class="w-full p-3 border rounded-lg bg-gray-50" disabled />
        </div>
      </div>

      <div class="mt-8 flex justify-between">
        <button class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600" @click="goBack">
          Back
        </button>
        <button class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600" @click="logout">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import axiosBase from "@/services/axiosBase";
import Cookies from "js-cookie";
import { useRouter } from "vue-router";

const router = useRouter();
const user = ref<{ name: string; email: string }>({ name: "", email: "" });
const token = ref(Cookies.get("company_token") || "");

const fetchUserData = async () => {
  if (!token.value) return;
  try {
    const response = await axiosBase.get("/user", {
      headers: { Authorization: `Bearer ${token.value}` },
    });
    user.value = response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

const logout = async () => {
  Cookies.remove("company_token");
  await axiosBase.post("/logout", null, {
    headers: { Authorization: `Bearer ${token.value}` },
  });
  router.push("/login");
};

const goBack = () => {
  router.push("/");
};

onMounted(fetchUserData);
</script>