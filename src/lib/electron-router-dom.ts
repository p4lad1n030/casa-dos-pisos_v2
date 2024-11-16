import { createElectronRouter, type Query } from 'electron-router-dom'

export const { Router, registerRoute, settings } = createElectronRouter({
  port: 5173,

  types: {
    ids: ['main'],
    queryKeys: ['name', 'version']
  }
})

declare global {
  interface URLSearchParams {
    get<T extends typeof settings>(name: Query.Keys<T>): Query.Return
  }
}
