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

      <!-- Admin Info -->
      <div class="mb-6 p-4 bg-white shadow-md rounded-md">
        <h2 class="text-lg font-semibold mb-2">Admin Information</h2>
        <div v-if="users.length > 0">
          <div v-for="user in users" :key="user.id">
            <p class="text-gray-500">Name: {{ user.name }}</p>
            <p class="text-gray-500">Email: {{ user.email }}</p>
            <p class="text-gray-500">Role: {{ user.role }}</p>
            <hr class="my-4" />
          </div>
        </div>
        <div v-else>
          <p>Loading admin data...</p>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <button class="p-4 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700">
          Add User
        </button>
        <button class="p-4 bg-green-600 text-white rounded-md shadow-md hover:bg-green-700">
          Manage Content
        </button>
        <button class="p-4 bg-red-600 text-white rounded-md shadow-md hover:bg-red-700">
          View Reports
        </button>
      </div>

      <!-- Recent Activities -->
      <div class="bg-white p-4 shadow-md rounded-md">
        <h2 class="text-lg font-semibold mb-2">Recent Activities</h2>
        <ul class="list-disc list-inside">
          <li>Updated user permissions</li>
          <li>Approved a new post</li>
          <li>Reviewed monthly reports</li>
        </ul>
      </div>

      <div class="content mt-6">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from "vue";
import AdminSidebar from "@/views/admin/_components/AdminSidebar.vue";
import axiosBase from "@/services/axiosBase";
import Cookies from "js-cookie";

export default {
  name: "DashboardView",
  components: {
    AdminSidebar,
  },
  setup() {
    const users = ref([]); // Keep it an array for consistency
    const isCollapsed = ref(false);
    const token = Cookies.get("company_token") || "";

    const fetchUsers = async () => {
      try {
        const response = await axiosBase.get("/user", {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API Response:", response.data); // Debugging log

        // Since response is an object, wrap it in an array
        users.value = [response.data];

      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    onMounted(fetchUsers);

    return {
      users,
      isCollapsed,
      toggleSidebar: () => (isCollapsed.value = !isCollapsed.value),
    };
  },
};
</script>
