export async function get(context, page) {
  const { slug } = context.params;
  console.log(slug)
  const postFile = import.meta.glob(`../../posts/${slug}.json`)
  const iterablePostFiles = Object.entries(postFile)

  const post = await Promise.all(
    iterablePostFiles.map(async ([path, resolver]) => {
      const { metadata } = await resolver()
      const postPath = path.slice(5,-3)

      return {
        meta: metadata,
        path: postPath,
      }
    })
  )

  // @todo add an error msg
  return {
    body: { 
      post }
  }
};