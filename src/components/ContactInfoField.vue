<template>
  <div>
    <label>{{ fieldName }} : </label>
    <input type='text' :value='fieldValue' :disabled='!editMode' />
  </div>
</template>

<script>
export default {
  data() {
    return {
      fieldValue: 'PlaceHolder',
    };
  },
  props: [
    'fieldName',
    'editMode',
  ],
};
</script>

<style lang='scss' scoped>
</style>
