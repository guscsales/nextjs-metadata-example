import BlogService from '@/services/blog-service';
import { Metadata } from 'next';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await BlogService.getPost(params.slug);

  return {
    title: post?.title,
    description: post?.body?.substring(0, 160),
    openGraph: {
      images: [`https://placehold.co/1280x768?text=${post?.title}`],
    },
    twitter: {
      images: [`https://placehold.co/1280x768?text=${post?.title}`],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await BlogService.getPost(params.slug);

  return (
    <main className="p-24">
      <h1 className="text-3xl text-white font-bold mb-4">{post?.title}</h1>

      <div className="text-gray-300">{post?.body}</div>
    </main>
  );
}
