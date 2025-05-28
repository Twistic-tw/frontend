<script setup lang="ts">
import { Logout } from '../../composable/Logout'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

Logout()
</script>

<template>
  <div style="padding: 2rem; text-align: center;">
    {{ t("logout_message") }}
  </div>
</template>
