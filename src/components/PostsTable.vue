<script setup>
import { computed, ref } from "vue";

const posts = ref(null);
const pageSize = 10;
const sortOrder = ref("asc");
const pageNumber = ref(1);
const searchText = ref("");
const numberOfPage = ref(0);
const totalPosts = ref(0);

async function fetchPost() {
  posts.value = await fetch(`https://jsonplaceholder.typicode.com/posts`).then(
    (r) => r.json()
  );
}

fetchPost();

// Pagination logic
const postResults = computed(() => {
  let filtered = posts?.value;

  const startIndex = (pageNumber.value - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  filtered = filtered?.filter((post) =>
    post.title.toLowerCase().includes(searchText.value.toLowerCase())
  );

  if (sortOrder.value === "asc") {
    filtered?.sort((a, b) => a.title.localeCompare(b.title));
  } else {
    filtered?.sort((a, b) => b.title.localeCompare(a.title));
  }

  totalPosts.value = filtered?.length;
  numberOfPage.value = Math.ceil(filtered?.length / pageSize);

  return filtered?.slice(startIndex, endIndex);
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

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
};
</script>

<template>
  <div class="my-6 flex justify-between">
    <h3 class="text-3xl font-semibold text-gray-900">Post List</h3>

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
            @click="toggleSortOrder"
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
          <td class="tableData">{{ post.title }}</td>
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
        <span class="font-semibold text-gray-900 dark:text-white">
          {{ totalPosts }}
        </span>
      </span>
      <div>
        <span class="text-sm text-gray-500 dark:text-white">No of Pages:</span>
        {{ numberOfPage }}
      </div>
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
