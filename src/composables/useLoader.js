import { watch } from 'vue'
import { useLayoutStore } from '../stores/layout'

export const useLoader = (loader) => {
    const { showLoader } = useLayoutStore()
    watch(loader, (newVal) => showLoader(newVal), { immediate: true})
}