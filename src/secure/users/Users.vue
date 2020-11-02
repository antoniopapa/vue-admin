<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0" v-if="authenticatedUser.canEdit('users')">
      <router-link to="/users/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th>#</th>
        <th>Name</th>
        <th>Email</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.id }}</td>
        <td>{{ user.first_name }} {{ user.last_name }}</td>
        <td>{{ user.email }}</td>
        <td>
          <div class="btn-group mr-2" v-if="authenticatedUser.canEdit('users')">
            <router-link :to="`/users/${user.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit
            </router-link>
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(user.id)">Delete</a>
          </div>
        </td>
      </tr>
      </tbody>
    </table>
  </div>

  <Paginator :last-page="lastPage" @page-changed="load($event)"/>
</template>

<script lang="ts">
import {ref, onMounted, computed} from 'vue';
import axios from 'axios';
import {Entity} from "@/interfaces/entity";
import {useStore} from "vuex";
import Paginator from "@/secure/components/Paginator.vue";

export default {
  name: "Users",
  components: {
    Paginator
  },
  setup() {
    const users = ref([]);
    const lastPage = ref(0);
    const store = useStore();

    const authenticatedUser = computed(() => store.state.User.user);

    const load = async (page = 1) => {
      const response = await axios.get(`users?page=${page}`);

      users.value = response.data.data;
      lastPage.value = response.data.meta.last_page;
    }

    const del = async (id: number) => {
      if (confirm('Are you sure you want to delete this record?')) {
        await axios.delete(`users/${id}`);

        users.value = users.value.filter((e: Entity) => e.id !== id);
      }
    }

    onMounted(load);

    return {
      users,
      lastPage,
      authenticatedUser,
      del,
      load
    }
  }
}
</script>
