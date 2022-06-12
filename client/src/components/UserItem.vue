<template>
  <figcaption class="mt-6 flex items-center justify-center space-x-4 text-left">
    <img
      :src="user.avatar"
      alt=""
      class="w-14 h-14 rounded-full"
      loading="lazy"
    />
    <div>
      <div class="text-slate-900 font-semibold dark:text-white">
        {{ user.name }}
      </div>
      <div class="mt-0.5 text-sm leading-6">{{ user.mail }}</div>
    </div>
  </figcaption>
</template>

<script></script>

<style></style>
