<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
  />
  <div id="wrapper">
    <!-- header -->
    <!-- sidebar -->
    <div class="sidebar">
      <span class="closeButton">&times;</span>
      <p class="brand-title"><a href="">Kiai Blog</a></p>

      <div class="side-links">
        <ul>
          <li @click="goToHome"><router-link to="/">Home</router-link></li>
          <li><router-link to="/blog">Blog</router-link></li>
          <li><router-link to="/about">About</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/login">Login</router-link></li>
          <li><router-link to="/register">Register</router-link></li>
        </ul>
      </div>

      <!-- sidebar footer -->
      <footer class="sidebar-footer">
        <div>
          <a href="https://www.facebook.com/profile.php?id=100019425493162"
            ><i class="fab fa-facebook-square" style="font-size: 40px; color: rgb(215 238 10)"></i
          ></a>
        </div>
        <div class="test-fb">fb.com/thieu.nguyen</div>
      </footer>
    </div>
    <!-- Menu Button -->
    <div class="menuButton">
      <div class="bar"></div>
      <div class="bar"></div>
      <div class="bar"></div>
    </div>
    <!-- main -->
    <main class="container">
      <h2 class="header-title">Kiai Blog Posts</h2>
      <div class="searchbar">
        <form @submit.prevent="searchPosts">
          <input v-model="search" type="text" placeholder="Search..." name="search" />

          <button type="submit">
            <i class="fa fa-search"></i>
          </button>
        </form>
      </div>
      <h2 class="header-title">Latest Blog Posts</h2>
      <section class="cards-blog latest-blog">
        <div v-for="post in posts" :key="post.id" class="card-blog-content">
          <div class="card-blog-content">
            <img :src="post.image" alt="" />
            <p>
              <span style="float: right">Written by {{ post.username }}</span>
            </p>
            <h4 style="font-weight: bolder">
              <a href="single-blog.html">{{ post.title }}</a>
            </h4>
          </div>
        </div>
      </section>
    </main>

    <footer class="main-footer"></footer>
    <paginate
      :totalPages="Math.ceil(totalPost / perPage)"
      :perPage="perPage"
      :currentPage="currentPage"
      @pagechanged="onPageChange"
    />
  </div>
</template>

<script>
import axios from 'axios'
import Paginate from './Paginate.vue'

export default {
  components: { Paginate },
  data() {
    return {
      posts: [],
      currentPage: 1,
      perPage: 4,
      totalPost: 0,
      search: ''
    }
  },

  created() {
    this.fetchPosts() // Gọi hàm fetchPosts khi component được tạo
  },

  methods: {
    onPageChange(page) {
      this.currentPage = page
      this.fetchPosts() // Gọi hàm fetchPosts khi trang thay đổi
    },

    searchPosts() {
      this.currentPage = 1
      this.fetchPosts()
    },

    goToHome() {
      window.location.reload();
    },

    fetchPosts() {
      axios
        .get('http://127.0.0.1:8000/api/view-all-post', {
          params: {
            page: this.currentPage,
            perPage: this.perPage,
            search: this.search
          }
        })
        .then((response) => {
          this.posts = response.data.posts
          this.totalPost = response.data.totalPost.length
        })
        .catch((error) => {
          console.error('Error fetching posts:', error)
        })
    }
  }
}
</script>

<style>
</style>
