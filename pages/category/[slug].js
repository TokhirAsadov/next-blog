import React from 'react';
import {getCategories, getCategoryPost, getPosts} from "../../services";
import {Categories, Loader, PostCard} from "../../components";
import {useRouter} from "next/router";

const Category = ({posts}) => {
  const router = useRouter();

  if (router.isFallback){
    return <Loader />
  }

  return (
    <div className="container mx-auto mb-8 px-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="col-span-1 lg:col-span-4">
          <div className="relative lg:sticky top-8">
            <Categories />
          </div>
        </div>
        <div className="col-span-1 lg:col-span-8">
          {posts?.map((post,index)=>(
            <PostCard post={post?.node} key={index}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;

export async function getStaticProps({params}) {
  const posts = await getCategoryPost(params?.slug);

  return {
    props: {posts}
  }
}

//todo----------------------- blaknotingga yozishing kk ----------------------
export async function getStaticPaths() {
  const categories = await getCategories() || []

  return {
    paths: categories?.map(({slug}) => ({params: {slug}})),
    fallback: true
  }
}