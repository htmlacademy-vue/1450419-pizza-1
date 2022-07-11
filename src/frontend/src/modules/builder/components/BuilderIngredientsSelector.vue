<template>
  <AppSheet>
    <template #header-title>Выберите ингредиенты</template>
    <template #content>
      <div class="ingredients">
        <BuilderSauceSelector />
        <BuilderIngredientList />
      </div>
    </template>
  </AppSheet>
</template>

<script>
import BuilderSauceSelector from "@/modules/builder/components/BuilderSauceSelector";
import BuilderIngredientList from "@/modules/builder/components/BuilderIngredientList";
import AppSheet from "@/common/components/AppSheet";

export default {
  name: "BuilderIngredientsSelector",

  components: { AppSheet, BuilderSauceSelector, BuilderIngredientList },
};
</script>

<style scoped></style>
