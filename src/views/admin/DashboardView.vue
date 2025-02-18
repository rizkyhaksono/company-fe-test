<template>
  <div class="dashboard-container">
    <!-- Sidebar -->
    <div class="sidebar" :class="{ 'sidebar-collapsed': isCollapsed }">
      <div class="sidebar-header">
        <h2 v-if="!isCollapsed">Admin Dashboard</h2>
        <button @click="toggleSidebar">
          <i class="fas fa-bars"></i>
        </button>
      </div>
      <nav class="sidebar-nav">
        <router-link to="/dashboard" class="nav-item">
          <i class="fas fa-home"></i>
          <span v-if="!isCollapsed">Dashboard</span>
        </router-link>
        <router-link to="/users" class="nav-item">
          <i class="fas fa-users"></i>
          <span v-if="!isCollapsed">Users</span>
        </router-link>
        <router-link to="/settings" class="nav-item">
          <i class="fas fa-cog"></i>
          <span v-if="!isCollapsed">Settings</span>
        </router-link>
      </nav>
    </div>

    <!-- Main Content -->
    <div class="main-content">
      <header class="dashboard-header">
        <h1>Welcome, Admin</h1>
      </header>
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'DashboardView',
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

<style scoped>
.dashboard-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #2c3e50;
  color: white;
  transition: width 0.3s;
}

.sidebar-collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.sidebar-nav {
  padding: 1rem 0;
}

.nav-item {
  display: flex;
  align-items: center;
  padding: 0.8rem 1rem;
  color: white;
  text-decoration: none;
  gap: 1rem;
}

.nav-item:hover {
  background-color: #34495e;
}

.main-content {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f5f6fa;
}

.dashboard-header {
  margin-bottom: 2rem;
}

button {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}
</style>