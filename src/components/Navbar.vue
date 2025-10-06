<template>
  <nav class="bg-white shadow-lg border-b border-slate-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo/Brand -->
        <div class="flex-shrink-0 flex items-center">
          <router-link 
            to="/dashboard" 
            class="flex items-center space-x-2 text-xl font-bold bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent"
          >
            <div class="w-8 h-8 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-lg flex items-center justify-center">
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
            </div>
            <span>Nafii Talks</span>
          </router-link>
        </div>

        <!-- Navigation Links -->
        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-8">
            <router-link 
              to="/dashboard" 
              class="text-slate-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
              active-class="text-teal-600 bg-teal-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
              </svg>
              Dashboard
            </router-link>
            
            <router-link 
              to="/create" 
              class="text-slate-700 hover:text-teal-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
              active-class="text-teal-600 bg-teal-50"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Create Post
            </router-link>
            
            <button 
              @click="logout" 
              class="text-slate-700 hover:text-coral-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
            >
              <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    logout() {
      localStorage.removeItem('authToken');
      this.$router.push('/');
    }
  }
}
</script>
 