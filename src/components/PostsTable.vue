<script setup>
import { computed, ref } from "vue";

const posts = ref(null);
const pageSize = 10;
const sortOrder = ref("asc");
const pageNumber = ref(1);
const searchText = ref("");

async function fetchPost() {
  posts.value = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(
    (r) => r.json()
  );
}

fetchPost();

// Pagination logic
const postResults = computed(() => {
  const startIndex = (pageNumber.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  return posts?.value
    ?.filter((post) =>
      post.title.toLowerCase().includes(searchText.value.toLowerCase())
    )
    .slice(startIndex, endIndex);
});

const numberOfPage = computed(() => {
  return Math.ceil(postResults?.value.length / pageSize);
});

const totalPosts = computed(() => {
  return postResults?.value?.length;
});

const nextPage = () => {
  if (pageNumber.value < numberOfPage.value) {
    pageNumber.value++;
  }
};

// Previous page function
const prevPage = () => {
  if (pageNumber.value > 1) {
    pageNumber.value--;
  }
};

const sortPosts = () => {
  // Sort posts based on sortOrder
  postResults.value.sort((a, b) => {
    if (sortOrder.value === "asc") {
      return a.title.localeCompare(b.title);
    } else {
      return b.title.localeCompare(a.title);
    }
  });
};
</script>

<template>
  <div class="my-6 flex">
    <label for="table-search" class="sr-only">Search</label>

    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none"
      >
        <svg
          class="w-5 h-5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        v-model="searchText"
        id="table-search"
        class="searchInput"
        placeholder="Search for items"
      />
    </div>
    <button class="paginationButton rounded-full" @click="searchPost">
      search
    </button>
  </div>

  <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table
      class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
    >
      <thead
        class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
      >
        <tr>
          <th scope="col" class="tableData">Post No</th>
          <th scope="col" class="tableData">User Id</th>
          <th
            scope="col"
            class="tableData hover:bg-blue-200 cursor-pointer"
            @click="sortPosts"
          >
            Title
          </th>
          <th scope="col" class="tableData">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="post in postResults"
          :key="post.id"
          class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <td
            scope="row"
            class="tableData font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {{ post.id }}
          </td>
          <td class="tableData">{{ post.userId }}</td>
          <td class="tableData" @click="">{{ post.title }}</td>
          <td class="tableData">{{ post.body }}</td>
        </tr>
      </tbody>
    </table>
    <nav
      class="flex items-center flex-column flex-wrap md:flex-row justify-between p-3 bg-blue-100"
      aria-label="Table navigation"
    >
      <span
        class="text-sm font-normal text-gray-500 dark:text-gray-400 mb-4 md:mb-0 block w-full md:inline md:w-auto"
        >Showing
        <span class="font-semibold text-gray-900 dark:text-white">1-10</span> of
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ totalPosts }}
        </span>
      </span>
      <ul class="inline-flex -space-x-px rtl:space-x-reverse text-sm h-8">
        <li>
          <button @click="prevPage" class="rounded-s-lg paginationButton">
            Previous
          </button>
        </li>

        <li>
          <span class="paginationButton">
            {{ pageNumber }}
          </span>
          <span class="bg-red-400">
            {{ numberOfPage }}
          </span>
        </li>

        <li>
          <button @click="nextPage" class="rounded-e-lg paginationButton">
            Next
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
