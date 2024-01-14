import { onMounted, ref, watch } from "vue";
import { api } from "src/boot/axios"
import { useQuasar } from "quasar";

export default function usePagination ({ url, params = { per_page: 10 }, append = false }) {
  const pagination = ref(null);
  const totalAmount = ref(0)
  const currentPage = ref(1);
  const fetching = ref(false)
  let filters = { ...params }

  const { notify } = useQuasar()

  const fetcher = (query) => {
    filters = { ...filters, ...query }
    return new Promise((resolve, reject) => {
      api({
        method: "GET",
        url,
        params: filters,
      }).then(response => {
        resolve(response)
      }).catch(error => {
        reject(error)
      });
    })
  };

  const fetch = (query, replace = false) => {
    fetching.value = true
    fetcher(query).then(({ data }) => {
      if (append && pagination.value && !replace) {
        const oldData = JSON.parse(JSON.stringify(pagination.value.data))
        data.data.data = [...oldData, ...data.data.data]
      }
      pagination.value = data.data;
      totalAmount.value = data.total_amount
    }).catch(e => {
      notify({
        message: e.response?.data?.message || e.message,
        type: "negative",
      });
    })
      .finally(() => {
        fetching.value = false
      });
  }

  const updateQueryAndFetch = (newQuery) => {
    const filters = { ...filters, ...newQuery }
    if (currentPage.value == 1) fetch(filters)
    else currentPage.value = 1
  };

  onMounted(() => {
    fetch(filters)
  })

  watch(currentPage, () => {
    filters = { ...filters, page: currentPage.value }
    fetch(filters)
  });

  return {
    pagination,
    currentPage,
    totalAmount,
    updateQueryAndFetch,
    fetching
  }
}
