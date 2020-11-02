<template>
  <h2>Account Information</h2>
  <hr>
  <form @submit.prevent="submitInfo">
    <div class="form-group">
      <label>First Name</label>
      <input type="text" class="form-control" name="first_name" v-model="firstName">
    </div>
    <div class="form-group">
      <label>Last Name</label>
      <input type="text" class="form-control" name="last_name" v-model="lastName">
    </div>
    <div class="form-group">
      <label>Email</label>
      <input type="text" class="form-control" name="email" v-model="email">
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>

  <h2 class="mt-4">Change Password</h2>
  <hr>
  <form @submit.prevent="submitPassword">
    <div class="form-group">
      <label>Password</label>
      <input type="password" class="form-control" name="password" v-model="password">
    </div>
    <div class="form-group">
      <label>Password Confirm</label>
      <input type="password" class="form-control" name="password_confirm" v-model="passwordConfirm">
    </div>

    <button class="btn btn-outline-secondary">Save</button>
  </form>
</template>

<script lang="ts">
import {ref, onMounted, computed} from 'vue';
import axios from 'axios';
import {User} from "@/classes/user";
import {useStore} from "vuex";

export default {
  name: "Profile",
  setup() {
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const password = ref('');
    const passwordConfirm = ref('');
    const store = useStore();

    onMounted(async () => {
      const user = computed(() => store.state.User.user);

      firstName.value = user.value.first_name;
      lastName.value = user.value.last_name;
      email.value = user.value.email;
    });

    const submitInfo = async () => {
      const response = await axios.put('users/info', {
        first_name: firstName.value,
        last_name: lastName.value,
        email: email.value
      });

      const u: User = response.data;

      await store.dispatch('User/setUser', new User(
          u.id,
          u.first_name,
          u.last_name,
          u.email,
          u.role,
          u.permissions
      ));
    }

    const submitPassword = async () => {
      await axios.put('users/password', {
        password: password.value,
        password_confirm: passwordConfirm.value
      });

      password.value = '';
      passwordConfirm.value = '';
    }

    return {
      firstName,
      lastName,
      email,
      password,
      passwordConfirm,
      submitInfo,
      submitPassword
    }
  }
}
</script>
