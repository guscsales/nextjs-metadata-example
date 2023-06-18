import { Metadata } from 'next';
import BlogService from '@/services/blog-service';
import Link from 'next/link';

export const metadata: Metadata = {
  description:
    'Bem vindo ao meu site, aqui tem uma descrição de até 160 caracteres!',
  openGraph: {
    description: 'Quero por uma descrição diferente, ai sim pode usar',
    images: ['https://placehold.co/1280x768?text=Meus+posts'],
    authors: ['Gustavo Sales'],
  },
  twitter: {
    description: 'Quero por uma descrição diferente, ai sim pode usar',
    images: ['https://placehold.co/1280x768?text=Meus+posts'],
  },
};

export default async function Home() {
  const posts = await BlogService.fetchPosts();

  return (
    <main className="p-24">
      <h1 className="text-3xl text-white font-bold mb-4">Meus posts</h1>

      <ul className="grid gap-2 list-disc list-inside pl-4">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="hover:underline text-gray-400 hover:text-white"
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
