<template>
  <div class="input-list">
    <input-item v-for="input in inputs.inputGroup1" :key="input.id" :input="input" ref="inputItem"></input-item>
    <span class="input-list__field-title">Тип уведомления</span>
    <div class="input-list__row">
      <input-item
        v-for="input in inputs.inputGroup2"
        :key="input.id"
        :input="input"
        :row="true"
        ref="inputItem"
        @data-id="$emit('data-id', $event)"
      ></input-item>
    </div>
    <input-item v-for="input in inputs.inputGroup3" :key="input.id" :input="input" ref="inputItem"></input-item>
  </div>
</template>

<script>
import inputItem from "../inputs/inputItem.vue";
export default {
  props: {
    inputs: {
      type: Object,
      default: () => {}
    }
  },
  components: {
    inputItem
  },
  methods: {
    validate() {
      const requiredFields = this.$refs.inputItem;
      requiredFields.forEach(el => el.validate());
    }
  }
};
</script>

<style lang="scss">
.input-list {
  display: flex;
  flex-direction: column;

  &__field-title {
    padding: 0.5rem 0 0 1rem;
    text-align: start;
    color: $secondary-text-color;
  }
  &__row {
    display: flex;
    padding: 0.5rem;
  }
}
</style>