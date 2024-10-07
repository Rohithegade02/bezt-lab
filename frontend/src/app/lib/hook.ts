import { useSelector, useStore } from 'react-redux'
import type { AppStore, RootState } from './store'

export const useAppSelector = useSelector.withTypes<RootState>()
export const useAppStore = useStore.withTypes<AppStore>()
