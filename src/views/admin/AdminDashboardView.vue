<template>
  <div class="flex min-h-screen">
    <!-- Sidebar -->
    <div
      :class="['bg-gray-800 text-white transition-width duration-300', { 'w-16': isCollapsed, 'w-64': !isCollapsed }]">
      <div class="flex items-center justify-between p-4">
        <h2 v-if="!isCollapsed" class="text-lg font-semibold">Admin Dashboard</h2>
        <button @click="toggleSidebar" class="text-white">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <AdminSidebar />
    </div>

    <!-- Main Content -->
    <div class="flex-1 p-8 bg-gray-100">
      <header class="mb-8">
        <h1 class="text-2xl font-semibold">Welcome, Admin</h1>
      </header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AdminSidebar from "@/views/admin/_components/AdminSidebar.vue";

export default {
  name: 'DashboardView',
  components: {
    AdminSidebar
  },
  data() {
    return {
      isCollapsed: false
    }
  },
  methods: {
    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed
    }
  }
}
</script>