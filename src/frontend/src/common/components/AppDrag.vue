<template>
  <div
    :draggable="draggable"
    @dragstart.self="onDrag"
    @dragover.prevent
    @dragenter.prevent
  >
    <slot />
  </div>
</template>

<script>
import { DATA_TRANSFER_PAYLOAD } from "@/common/constants";

export default {
  name: "AppDrag",

  props: {
    transferData: {
      type: Object,
      required: true,
    },

    draggable: {
      type: Boolean,
      default: true,
    },
  },

  methods: {
    onDrag({ dataTransfer }) {
      dataTransfer.setData(
        DATA_TRANSFER_PAYLOAD,
        JSON.stringify(this.transferData)
      );
    },
  },
};
</script>

<style scoped></style>
