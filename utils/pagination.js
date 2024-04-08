export const getFullPageList = (count, limit) =>
  [...Array(Math.ceil(count / limit))].map((v, i) => i + 1)

export const getPageList = (fullPageList, pageLimit, page) => {
  const pageList = [[]]

  fullPageList.forEach((n) => {
    pageList[pageList.length - 1].push(n)
    if (n % pageLimit === 0) pageList.push([])
  })

  const currentListIndex = pageList.findIndex((l) => l.includes(page))
  const currentList = pageList[currentListIndex]

  return { pageList, currentList, currentListIndex }
}
