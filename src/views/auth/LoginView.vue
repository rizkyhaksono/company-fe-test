<template>
  <div class="relative flex items-center justify-center min-h-screen bg-gray-100">
    <!-- Container for overall centering -->
    <div class="absolute inset-0 bg-gradient-to-r from-[#060926] to-[#131e56]"></div>

    <div class="relative z-10 w-full max-w-5xl mx-auto overflow-hidden rounded-md shadow-lg">
      <div class="flex">
        <!-- Background Section -->
        <div class="relative w-1/2">
          <!-- <img src="/login-bg.jpg" alt="Background" class="absolute inset-0 w-full h-full object-cover" /> -->
          <div class="absolute inset-0 bg-gradient-to-r from-black to-transparent opacity-50"></div>
          <div class="absolute top-6 left-6">
            <a href="/">
              <img src="/logo.png" alt="Haventwined" class="h-8" />
            </a>
            <p class="text-white mt-4 text-sm">Jadilah Tenant pada Event Pilihanmu dengan Mudah, Cepat, dan Terpercaya.
            </p>
          </div>
        </div>

        <!-- Login Form -->
        <div class="w-1/2 bg-white p-8">
          <h2 class="text-2xl font-semibold text-gray-800 mb-6">Selamat Datang!</h2>

          <form @submit.prevent="handleLogin">


            <div class="mb-4">
              <label for="email" class="block text-gray-700 text-sm font-bold mb-2">Email *</label>
              <input id="email" v-model="email" type="email" placeholder="Masukkan Email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>

            <div class="mb-4">
              <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password *</label>
              <input id="password" v-model="password" type="password" placeholder="Masukkan Password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
            </div>

            <button type="submit"
              class="bg-[#00cba9] hover:bg-[#00a083] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">
              Masuk Sebagai Tenant
            </button>
          </form>

          <p class="mt-6 text-center text-gray-700 text-sm">
            Tidak punya akun? <a href="/register" class="text-[#00cba9]">Registrasi disini</a>
          </p>
          <p v-if="errorMessage" class="mt-4 text-red-500 text-sm text-center">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axiosBase from "@/services/axiosBase";
import Cookies from "js-cookie";

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axiosBase.post("/login", {
          email: this.email,
          password: this.password,
        });
        if (response.data) {
          Cookies.set("company_token", response.data.token);
          this.$router.push("/");
        }
      } catch (error) {
        const err = error as Error;
        this.errorMessage =
          err.message || "Login gagal. Coba lagi.";
      }
    }
  },
};
</script>