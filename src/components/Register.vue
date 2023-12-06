<template>
  <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
  />
  <div id="backend-view">
    <div class="button-back">
      <router-link to="/">
        <el-button type="primary">
          <el-icon style="margin-top: -5px"><ArrowLeftBold /></el-icon>Previous Page
        </el-button>
      </router-link>
    </div>
    <form @submit.prevent="submit" v-if="!isSubmitting">
      <h3>Sign Up Here</h3>
      <label for="username">Name</label>
      <input type="text" id="username" v-model="fields.username" />
      <span v-if="errors.username" class="error">{{ errors.username }}</span>

      <label for="email">Email</label>
      <input type="text" id="email" v-model="fields.email" />
      <span v-if="errors.email" class="error">{{ errors.email }}</span>

      <label for="password">Password</label>
      <div class="password-input">
        <input :type="showPassword ? 'text' : 'password'" id="password" v-model="fields.password" />
        <i
          @click="togglePasswordVisibility"
          :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
        ></i>
      </div>
      <span v-if="errors.password" class="error">{{ errors.password }}</span>

      <label for="password_confirmation">Confirm password</label>
      <div class="password_confirmation-input">
        <input :type="showPassword ? 'text': 'password'" id="password_confirmation" v-model="fields.password_confirmation" />
        <i
          @click="togglePasswordVisibility"
          :class="showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'"
        ></i> 
      </div>
      <span v-if="errors.password_confirmation" class="error">{{
        errors.password_confirmation
      }}</span>

      <button type="submit">Sign Up</button>
      <span>Have an account? <router-link to="/login" ><a> Log in</a></router-link></span>
    </form>
    <p v-if="isSubmitting">Submitting...</p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      fields: {},
      errors: {},
      nameRegex: /^[0-9a-zA-Z-_]{3,20}$/u,
      emailRegex: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      passwordRegex: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      isSubmitting: false,
      showPassword: false
    }
  },
  methods: {
    async submit() {
      if (this.isSubmitting) {
        console.log(this.isSubmitting)
        return // Nếu đã submit rồi thì thoát
      }

      this.isSubmitting = true // Bắt đầu quá trình submit

      try {
        if (this.validateForm()) {
          console.log('truoc khi gui')
          await axios.post('http://127.0.0.1:8000/api/auth/register', this.fields)
          console.log('sau khi gui')
          this.$router.push({ name: 'Home' })
        }
      } catch (error) {
        this.errors = error.response.data.errors
        console.log(this.errors)
      } finally {
        this.isSubmitting = false // Kết thúc quá trình submit
      }
    },

    validateForm() {
      this.errors.username = ''
      this.errors.email = ''
      this.errors.password = ''
      this.errors.password_confirmation = ''

      if (!this.fields.username) {
        this.errors.username = 'Name is required'
      } else if (!this.nameRegex.test(this.fields.username)) {
        this.errors.username =
          'Your username must contain numbers, uppercase letters, lowercase letters, unicode characters and 3 <= characters <= 20.'
      } else if (!this.fields.email) {
        this.errors.email = 'Email is required'
      } else if (!this.emailRegex.test(this.fields.email)) {
        this.errors.email = 'The email you enter must be in the correct format.'
      } else if (!this.fields.password) {
        this.errors.password = 'Password is required'
      } else if (!this.passwordRegex.test(this.fields.password)) {
        this.errors.password =
          'Begins with a capital letter, has at least 1 number, 1 special character and is at least 6 characters'
      } else if (this.fields.password != this.fields.password_confirmation) {
        this.errors.password_confirmation = 'You have entered the wrong confirmation password'
      }
      return Object.keys(this.errors).every((key) => !this.errors[key])
    },

    togglePasswordVisibility() {
      this.showPassword = !this.showPassword
    }
  }
}
</script>

<style scoped>
#backend-view {
  height: 100vh;
  background-color: #f3f4f6;
  display: grid;
  align-items: center;
}
form {
  width: 400px;
  background-color: #ffffff;
  margin: 0 auto;
  border-radius: 10px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  padding: 50px 35px;
}
form * {
  letter-spacing: 0.5px;
  outline: none;
}

label {
  display: block;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
}
input {
  display: block;
  height: 50px;
  width: 100%;
  border-radius: 3px;
  padding: 0 10px;
  margin-top: 8px;
  font-size: 16px;
  font-weight: 300;
}
.error {
  color: red;
}

button {
  margin-top: 50px;
  width: 100%;
  background-color: rgba(0, 46, 173, 0.7);
  color: #ffffff;
  padding: 15px 0;
  font-size: 18px;
  font-weight: 600;
  border-radius: 5px;
  cursor: pointer;
}

.button-back {
  width: 10%;
  margin: -100px 20px;
}

form span {
  display: block;
  margin-top: 20px;
}
a {
  color: rgba(0, 46, 173, 0.8);
}

.loader {
  text-align: center;
  margin-bottom: 15px;
}

.password-input {
  position: relative;
}
.password-input i {
  position: absolute;
  top: 55%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
}

.password_confirmation-input {
  position: relative;
}
.password_confirmation-input i {
  position: absolute;
  top: 55%;
  right: 8px;
  transform: translateY(-50%);
  cursor: pointer;
}

</style>
