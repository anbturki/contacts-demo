<template>
  <tr>
    <td>{{ data.firstName }} {{data.lastName}}</td>
    <td>{{ data.email }}</td>
    <td>{{ data.phone }}</td>
    <td>{{ data.company }}</td>
    <td>{{ data.jobTitle }}</td>
  </tr>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style lang="scss" scoped>
.root {
  background-color: #eee;
}
</style>