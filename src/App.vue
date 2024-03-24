<template>
  <div class="w-full h-screen bg-slate-100">
    <!-- Navigation -->
    <nav class="flex items-center justify-between px-4 py-1">
      <h3>Jatri</h3>
      <ul class="flex items-center gap-2">
        <li><router-link to="/">Home</router-link></li>
        <!-- <li><router-link to="/about">About</router-link></li> -->
      </ul>
      <button class="bg-orange-500 text-white rounded-full px-5 py-1">
        Login
      </button>
    </nav>

    <!-- Main Content -->
    <main class="w-11/12 mx-auto">
      <!-- Your router view or main content goes here -->
      <router-view></router-view>
    </main>

    <!-- Footer -->
    <footer class="w-full text-center p-3">
      <p>&copy; 2024 @ Fah1m09</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>
