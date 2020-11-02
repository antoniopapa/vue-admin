<template>
  <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
    <div class="btn-toolbar mb-2 mb-md-0" v-if="user.canEdit('products')">
      <router-link to="/products/create" class="btn btn-sm btn-outline-secondary">Add</router-link>
    </div>
  </div>

  <div class="table-responsive">
    <table class="table table-striped table-sm">
      <thead>
      <tr>
        <th>#</th>
        <th>Image</th>
        <th>Title</th>
        <th>Description</th>
        <th>Price</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.id }}</td>
        <td><img :src="product.image" height="50"/></td>
        <td>{{ product.title }}</td>
        <td>{{ product.description }}</td>
        <td>{{ product.price }}</td>
        <td>
          <div class="btn-group mr-2" v-if="user.canEdit('products')">
            <router-link :to="`/products/${product.id}/edit`" class="btn btn-sm btn-outline-secondary">Edit
            </router-link>
            <a href="javascript:void(0)" class="btn btn-sm btn-outline-secondary" @click="del(product.id)">Delete</a>
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
import Paginator from "@/secure/components/Paginator.vue";
import {useStore} from "vuex";

export default {
  name: "Products",
  components: {Paginator},
  setup() {
    const products = ref([]);
    const lastPage = ref(0);
    const store = useStore();

    const user = computed(() => store.state.User.user);

    const load = async (page = 1) => {
      const response = await axios.get(`products?page=${page}`);

      products.value = response.data.data;
      lastPage.value = response.data.meta.last_page;
    }

    onMounted(load);

    const del = async (id: number) => {
      if (confirm('Are you sure you want to delete this record?')) {
        await axios.delete(`products/${id}`);

        products.value = products.value.filter((e: Entity) => e.id !== id);
      }
    }

    return {
      products,
      lastPage,
      user,
      del,
      load
    }
  }
}
</script>
