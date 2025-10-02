<template>
  <div class="min-h-screen bg-slate-50">
    <Navbar />
    
    <!-- Main Content -->
    <main class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>

      <!-- Error State -->
      <div v-if="error" class="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center">
        <svg class="w-5 h-5 text-red-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        <span class="text-red-700">{{ error }}</span>
      </div>

      <!-- Post Content -->
      <div v-if="post" class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <!-- Post Header -->
        <div class="p-8 border-b border-slate-200">
          <!-- Title -->
          <h1 class="text-3xl lg:text-4xl font-bold text-slate-800 mb-6 leading-tight">
            {{ post.title }}
          </h1>

          <!-- Meta Information -->
          <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div class="flex items-center space-x-4">
              <!-- Author Avatar -->
              <div class="w-10 h-10 bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {{ post.author?.username ? post.author.username.charAt(0).toUpperCase() : 'U' }}
              </div>
              <div>
                <p class="text-slate-700 font-medium">
                  {{ post.author?.username || 'Unknown' }}
                </p>
                <p class="text-slate-500 text-sm">
                  {{ new Date(post.createdAt).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  }) }}
                </p>
              </div>
            </div>

            <!-- Actions -->
            <div v-if="isOwner(post)" class="flex items-center space-x-3">
              <router-link 
                :to="`/edit/${post._id}`"
                class="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-all duration-200 font-medium flex items-center text-sm"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                </svg>
                Edit
              </router-link>
              <button 
                @click="deletePost"
                class="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 font-medium flex items-center text-sm"
              >
                <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                </svg>
                Delete
              </button>
            </div>
          </div>
        </div>

        <!-- Post Image -->
        <div v-if="post.image" class="w-full">
          <img 
            :src="post.image" 
            :alt="post.title" 
            class="w-full h-auto max-h-96 object-cover"
          />
        </div>

        <!-- Post Content -->
        <div class="p-8">
          <div class="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
            <p class="whitespace-pre-wrap">{{ post.content }}</p>
          </div>
        </div>
      </div>

      <!-- Comments Section -->
      <div v-if="post" class="mt-8">
        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
          <!-- Comments Header -->
          <div class="flex items-center justify-between mb-8">
            <h3 class="text-2xl font-bold text-slate-800 flex items-center">
              <svg class="w-6 h-6 mr-3 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
              </svg>
              Comments ({{ comments.length }})
            </h3>
          </div>

          <!-- Comment Form -->
          <div v-if="isAuthenticated" class="mb-8">
            <form @submit.prevent="isEditingComment ? updateComment() : addComment()" class="space-y-4">
              <textarea 
                v-model="newComment" 
                :placeholder="isEditingComment ? 'Edit your comment...' : 'Share your thoughts...'" 
                required 
                class="w-full p-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 bg-white placeholder-slate-500 resize-none"
                rows="4"
              ></textarea>
              <div class="flex items-center space-x-3">
                <button 
                  type="submit" 
                  class="bg-gradient-to-r from-teal-600 to-emerald-500 hover:from-teal-700 hover:to-emerald-600 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center"
                >
                  <svg v-if="isEditingComment" class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <svg v-else class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  {{ isEditingComment ? 'Update Comment' : 'Post Comment' }}
                </button>
                <button 
                  v-if="isEditingComment" 
                  type="button" 
                  @click="cancelEdit" 
                  class="px-6 py-3 border border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
          <div v-else class="mb-6 p-4 bg-slate-50 rounded-xl text-center">
            <p class="text-slate-600 mb-2">Please log in to leave a comment</p>
            <router-link 
              to="/login" 
              class="text-teal-600 hover:text-teal-700 font-medium transition-colors duration-200"
            >
              Sign in to comment
            </router-link>
          </div>

          <!-- Comments List -->
          <div v-if="comments.length === 0" class="text-center py-8">
            <svg class="w-12 h-12 text-slate-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
            </svg>
            <p class="text-slate-500">No comments yet. Be the first to share your thoughts!</p>
          </div>

          <div v-else class="space-y-6">
            <div 
              v-for="comment in comments" 
              :key="comment._id" 
              class="p-6 bg-slate-50 rounded-xl border border-slate-200 transition-all duration-200 hover:border-slate-300"
            >
              <!-- Comment Content -->
              <p class="text-slate-700 mb-4 leading-relaxed">{{ comment.text }}</p>
              
              <!-- Comment Meta -->
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-8 h-8 bg-gradient-to-r from-coral-500 to-orange-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
                    {{ comment.user?.username ? comment.user.username.charAt(0).toUpperCase() : 'U' }}
                  </div>
                  <div>
                    <p class="text-slate-700 text-sm font-medium">
                      {{ comment.user?.username || 'Unknown' }}
                    </p>
                    <p class="text-slate-500 text-xs">
                      {{ new Date(comment.createdAt).toLocaleString() }}
                    </p>
                  </div>
                </div>

                <!-- Comment Actions -->
                <div v-if="isCommentOwner(comment)" class="flex items-center space-x-2">
                  <button 
                    @click="editComment(comment)"
                    class="text-slate-600 hover:text-teal-600 transition-colors duration-200 p-2 rounded-lg hover:bg-white"
                    title="Edit comment"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                    </svg>
                  </button>
                  <button 
                    @click="deleteComment(comment._id)"
                    class="text-slate-600 hover:text-coral-600 transition-colors duration-200 p-2 rounded-lg hover:bg-white"
                    title="Delete comment"
                  >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import Navbar from '../components/Navbar.vue';
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import api from '../service/api';

const route = useRoute();
const router = useRouter();
const post = ref(null);
const comments = ref([]);
const loading = ref(false);
const error = ref('');
const newComment = ref('');
const isEditingComment = ref(false);
const editingCommentId = ref(null);
const userId = ref('');
const isAuthenticated = !!localStorage.getItem('authToken');

const fetchProfile = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.get('/users/profile', {
      headers: { Authorization: `Bearer ${token}` }
    });
    userId.value = res.data._id;
  } catch (err) {
    userId.value = '';
  }
};

const fetchPost = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await api.get(`/posts/${route.params.id}`);
    post.value = res.data.data || res.data;
    comments.value = post.value.comments || [];
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to fetch post';
  } finally {
    loading.value = false;
  }
};

const isOwner = (p) => {
  if (p.author && typeof p.author === 'object') {
    return p.author._id === userId.value;
  }
  return p.author === userId.value;
};

const isCommentOwner = (comment) => {
  if (comment.user && typeof comment.user === 'object') {
    return comment.user._id === userId.value;
  }
  return comment.user === userId.value;
};

const addComment = async () => {
  if (!isAuthenticated) return router.push('/login');
  try {
    const token = localStorage.getItem('authToken');
    const res = await api.post('/comments', {
      postId: post.value._id,
      text: newComment.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Fetch post again to update comments with user info
    await fetchPost();
    newComment.value = '';
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to add comment';
  }
};

const editComment = (comment) => {
  isEditingComment.value = true;
  editingCommentId.value = comment._id;
  newComment.value = comment.text;
};

const updateComment = async () => {
  if (!editingCommentId.value) return;
  try {
    const token = localStorage.getItem('authToken');
    await api.put(`/comments/${editingCommentId.value}`, {
      text: newComment.value
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
    // Fetch post again to update comments with user info
    await fetchPost();
    cancelEdit();
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to edit comment';
  }
};

const cancelEdit = () => {
  isEditingComment.value = false;
  editingCommentId.value = null;
  newComment.value = '';
};

const deleteComment = async (commentId) => {
  if (!confirm('Are you sure you want to delete this comment?')) return;
  try {
    const token = localStorage.getItem('authToken');
    await api.delete(`/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    comments.value = comments.value.filter(c => c._id !== commentId);
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete comment';
  }
};

const deletePost = async () => {
  if (!confirm('Are you sure you want to delete this post?')) return;
  try {
    const token = localStorage.getItem('authToken');
    await api.delete(`/posts/${post.value._id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    router.push('/dashboard');
  } catch (err) {
    error.value = err.response?.data?.message || 'Failed to delete post';
  }
};

onMounted(async () => {
  await fetchProfile();
  await fetchPost();
});
</script>

<style scoped>
.prose {
  line-height: 1.75;
}

.prose p {
  margin-bottom: 1.25em;
}

.prose p:last-child {
  margin-bottom: 0;
}
</style>