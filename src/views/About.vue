<template>
  <section class="min-h-screen bg-gradient-to-br from-amber-50 via-cream-50 to-sage-50 py-16 px-6 relative overflow-hidden">
    <!-- Background decorative elements -->
    <div class="absolute top-20 left-10 w-16 h-16 rounded-full bg-amber-200/30 animate-float"></div>
    <div class="absolute bottom-40 right-16 w-12 h-12 rounded-full bg-terracotta-200/30 animate-float" style="animation-delay: 2s;"></div>
    <div class="absolute top-1/3 right-1/4 w-10 h-10 rounded-full bg-sage-200/30 animate-float" style="animation-delay: 4s;"></div>

    <!-- Background pattern -->
    <div class="absolute inset-0 opacity-20 bg-[radial-gradient(circle,rgba(251,191,36,0.1)_2px,transparent_2px)] bg-[length:30px_30px]"></div>

    <div class="max-w-3xl mx-auto relative z-10">
      <!-- ✅ Back to Home Button -->
      <div class="mb-10 flex justify-start">
        <router-link
          to="/"
          class="inline-flex items-center gap-2 bg-green backdrop-blur-sm border border-amber-200 text-amber-600 hover:bg-amber-100 font-lg px-4 py-2 rounded-full shadow-sm transition-all duration-300 hover:shadow-md hover:scale-105"
        >
          <i class="fas fa-arrow-left text-sm"></i>
          Back to Home
        </router-link>
      </div>

      <!-- Header Section -->
      <div class="text-center mb-12">
        <div class="inline-block mb-4">
          <div class="w-24 h-1 bg-gradient-to-r from-amber-400 to-terracotta-500 rounded-full mx-auto mb-4"></div>
          <h2 class="text-4xl md:text-5xl font-bold text-green-800 mb-2">
            About <span class="text-amber-500 italic">Nafii Talks</span>
          </h2>
          <div class="w-16 h-1 bg-gradient-to-r from-sage-400 to-sage-300 rounded-full mx-auto mt-4"></div>
        </div>
      </div>

      <!-- Main Content Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 mb-10 border border-amber-100 transform transition-all duration-500 hover:shadow-xl">
        <div class="flex justify-center mb-6">
          <div class="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-500 flex items-center justify-center shadow-md">
            <i class="fas fa-heart text-white text-xl"></i>
          </div>
        </div>

        <div class="space-y-6">
          <p class="text-gray-700 leading-relaxed text-lg font-light">
            Welcome to <strong class="text-amber-500 font-semibold">Nafii Talks</strong> — a cozy space where stories, lifestyle, and inspiration meet. 
            Here, Nafii shares heartfelt reflections, motivational thoughts, and everyday experiences that 
            remind us to live with purpose, love deeply, and grow fearlessly.
          </p>
          
          <p class="text-gray-700 leading-relaxed text-lg font-light">
            Whether you're here for encouragement, lifestyle insights, or just a little spark of joy, 
            there's always something new to discover. Let's walk this journey together — one post, one thought, one smile at a time.
          </p>
        </div>
      </div>

      <!-- Features Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div 
          v-for="(feature, index) in features" 
          :key="index"
          class="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-sage-100 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-md"
        >
          <div class="w-12 h-12 rounded-full bg-gradient-to-br from-sage-400 to-sage-500 flex items-center justify-center mx-auto mb-4">
            <i :class="feature.icon" class="text-white text-sm"></i>
          </div>
          <h3 class="font-semibold text-gray-800 mb-2 text-center">{{ feature.title }}</h3>
          <p class="text-gray-600 text-sm text-center">{{ feature.description }}</p>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="text-center">
        <router-link
          to="/register"
          class="inline-flex items-center bg-gradient-to-r from-amber-500 to-terracotta-500 hover:from-amber-400 hover:to-amber-500 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Join the Nafii Community
          <i class="fas fa-arrow-right ml-2"></i>
        </router-link>
      </div>

      <!-- Signature -->
      <div class="mt-12 pt-8 border-t border-amber-200 text-center">
        <p class="text-gray-600 italic mb-3">With warmth and inspiration,</p>
        <p class="text-green-700 font-bold text-3xl">Nafii.....</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "AboutPage",
  data() {
    return {
      features: [
        {
          icon: "fas fa-feather",
          title: "Authentic Stories",
          description: "Real reflections from everyday life and heartfelt thoughts that inspire growth."
        },
        {
          icon: "fas fa-leaf",
          title: "Peaceful Living",
          description: "Encouraging simplicity, balance, and mindfulness in a busy world."
        },
        {
          icon: "fas fa-users",
          title: "Community",
          description: "Join like-minded readers who love positivity and inspiration."
        }
      ]
    };
  }
};
</script>
