export interface Post {
  slug: string;
  title: string;
  created_at: Date;
  parent_id?: string;
  body?: string;
}

async function fetchPosts() {
  const postsResponse = await fetch(
    'https://www.tabnews.com.br/api/v1/contents/guscsales',
    { next: { revalidate: 30 } }
  );
  let posts = (await postsResponse.json()) as Post[];

  posts = posts
    .filter((post) => !post['parent_id'])
    .map((post) => ({
      ...post,
      created_at: new Date(post.created_at),
    }));

  posts.sort(
    (a, b) =>
      (b.created_at as unknown as number) - (a.created_at as unknown as number)
  );

  return posts ? posts : [];
}

async function getPost(slug: string) {
  const postResponse = await fetch(
    `https://www.tabnews.com.br/api/v1/contents/guscsales/${slug}`,
    { next: { revalidate: 30 } }
  );
  const post = (await postResponse.json()) as Post;

  if (!post) {
    return null;
  }

  return post;
}

const BlogService = {
  fetchPosts,
  getPost,
};

export default BlogService;
