import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { api } from "src/boot/axios"

export default function usePagination ({ url, params = { per_page: 10 } }) {
  const route = useRoute();
  const router = useRouter();
  const pagination = ref(null);
  const totalAmount = ref(0)
  const currentPage = ref(1);

  const fetcher = (query) => {
    query = { ...params, ...query }
    return new Promise((resolve, reject) => {
      api({
        method: "GET",
        url,
        params: query,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      });
    })
  };

  const fetch = (query, updateCurrentPage = false) => {
    fetcher(query).then(({ data }) => {
      pagination.value = data.data;
      if (updateCurrentPage) currentPage.value = data.data.current_page;
      totalAmount.value = data.total_amount
    });
  }

  const updateQueryAndFetch = (newQuery) => {
    const options = {
      name: route.name,
      query: JSON.parse(JSON.stringify(route.query)),
    };
    options.query = { ...options.query, ...newQuery };
    Object.keys(options.query).forEach(key => {
      if (!options.query[key]) delete options.query[key]
    })
    router.replace(options).then(() => {
      if (currentPage.value == 1) fetch(options.query)
      else currentPage.value = 1
    });
  };

  onMounted(() => {
    let query = JSON.parse(JSON.stringify(route.query))
    if (params) query = { ...query, ...params }
    router.replace({
      name: route.name,
      query: query
    }).then(() => {
      fetch(query)
    })
  })

  watch(currentPage, () => {
    const query = { ...route.query, page: currentPage.value }
    router
      .replace({
        name: route.name,
        query,
      })
      .then(() => {
        fetch(query)
      });
  });

  return {
    pagination,
    currentPage,
    totalAmount,
    updateQueryAndFetch,
  }
}
