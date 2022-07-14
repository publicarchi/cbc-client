export async function get() {
  // @todo use a global param for the path $xxx, csq on line 9
  const allPostFiles = import.meta.glob('../../posts/*.md')
  const iterablePostFiles = Object.entries(allPostFiles)

  const allPosts = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const fname = path.split('/').pop().split('.')[0]

      return {
        metadata,
        fname,
      }
    })
  )

  // const sortedPosts = allPosts.sort((a, b) => b.meta.date - a.meta.date)

  // @todo add an error msg
  return {
    body: { posts: allPosts }
  }
};