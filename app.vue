<template>
  <div class="w-full min-h-screen bg-gray-100">
    <section class="test-center pt-5">
      <h1 class="text-4xl text-gray-800">What are we doing today?</h1>
    </section>
    <section class="w-9/12 max-w-lg mx-auto flex items-center justify-center mt-7 bg-white shadow pt-5 rounded">
      <form @submit.prevent>
        <input type='text' class="py-2 px-4 border border-blue-500 focus:outline-blue-300 rounded" />
        <button class="transition-all duration-200 border border-blue-200 py-2 px-4 ml-3 hover:bg-blue-200 ">Add
          Todo</button>
      </form>
    </section>
  </div>
</template>
