import HomeView from "@/app/components/home-view"
import { getAllPosts } from "@/app/blog/lib/get-posts"

export default function Page() {
  const posts = getAllPosts()
  return <HomeView posts={posts} />
}
