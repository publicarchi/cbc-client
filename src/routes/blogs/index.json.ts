export const get = async () => {
  // @todo use a global param for the path $xxx, csq on line 9
  const allPostFiles = import.meta.glob('../../posts/*.md')
  const iterablePostFiles = Object.entries(allPostFiles)

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(5,-3)

      return {
        meta: metadata,
        path: postPath,
      }
    })
  )


  const sortedPosts = allPosts.sort((a, b) =>  new Date(b.meta.date) - new Date(a.meta.date))

  // @todo add an error msg
  return {
    body: sortedPosts
  }
};