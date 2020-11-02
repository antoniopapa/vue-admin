<template>
  <nav>
    <ul class="pagination">
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="prev">Previous</a>
      </li>
      <li class="page-item">
        <a class="page-link" href="javascript:void(0)" @click="next">Next</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import {ref} from 'vue';

export default {
  name: "Paginator",
  emits: ['page-changed'],
  props: {
    lastPage: Number
  },
  setup(props, {emit}) {
    const page = ref(1);

    const next = async () => {
      if (page.value === props.lastPage) return;

      page.value++;
      emit('page-changed', page.value);
    }

    const prev = async () => {
      if (page.value === 1) return;

      page.value--;
      emit('page-changed', page.value);
    }

    return {
      next,
      prev
    }
  }
}
</script>

