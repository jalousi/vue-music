import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

function insertArray(arr, val, compare, maxLen) {
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  arr.unshift(val)
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}

function deleteFromArray(arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}

export function saveSearch(name) {
  let searchs = storage.get(SEARCH_KEY) || []
  insertArray(searchs, name, (item) => {
    return item === name
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

export function deleteSearch(name) {
  let searchs = storage.get(SEARCH_KEY) || []
  deleteFromArray(searchs, (item) => {
    return item === name
  })
  storage.set(SEARCH_KEY, searchs)
  return searchs
}

export function clearSearch() {
  storage.remove(SEARCH_KEY)
  return []
}

export function loadSearch() {
  return storage.get(SEARCH_KEY) || []
}
