import { useQuasar } from "quasar"
import { api } from "src/boot/axios"

export default function useApp () {
  const { localStorage } = useQuasar()
  const preserveToken = (token) => {
    localStorage.set("token", token)
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  const removeToken = () => {
    localStorage.remove("token")
    api.defaults.headers.common['Authorization'] = undefined;
  }

  const vhPage = (offset, height) => {
    return {
      height: height - offset + "px",
    }
  };

  return {
    preserveToken,
    removeToken,
    vhPage
  }
}
