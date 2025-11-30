import DashboardBreadCrumb from "@/components/common/DashboardBreadcrumb";
import PostsCard from "@/components/common/PostsCard";
import { useGetPostsQuery } from "@/services/posts/postEndpoints";

const HomePage = () => {
  const { data } = useGetPostsQuery({});
  return (
    <div className="flex flex-col p-6">
      <DashboardBreadCrumb />
      <div className="w-full p-2 sm:p-6">
        <div className="flex flex-col gap-y-4">
          <h1 className="text-3xl font-bold">Posts List</h1>
          <hr className="border" />
        </div>

        {/* Blog Cards */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {data?.posts?.map((post) => (
            <div>
              <PostsCard
                key={post.id}
                {...post}
                blogIMG="https://images.unsplash.com/photo-1508830524289-0adcbe822b40?auto=format&fit=crop&w=800&q=80"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
