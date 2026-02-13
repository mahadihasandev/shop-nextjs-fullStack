import Container from "@/components/Container";
import { Title } from "@/components/ui/text";
import { getAllBlogs } from "@/sanity/lib"
import { urlFor } from "@/sanity/lib/image";
import dayjs from "dayjs";
import { Calendar1Icon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const BlogPage =  async() => {
    const blogs=await getAllBlogs(10)
    console.log(blogs);
    
  return (
    <Container>
      <Title className="text-center shadow-md py-5  shadow-shop_light_blue/20 rounded lg">All Blogs</Title>
      <div className="mb-10 md:mb-20">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5 rounded-lg">
        {blogs?.map((blog) => (
          <div key={blog?._id} className="hover:cursor-pointer rounded-lg hover:scale-105 overflow-hidden
          shadow-lg shadow-shop_light_blue/20 hover:shadow-shop_light_blue/50 hoverEffect ">
            {blog?.mainImage && (
              <Link href={`/blog/${blog?.slug?.current}`}>
                <Image
                  src={urlFor(blog?.mainImage).url()}
                  alt="BlogImage"
                  width={500}
                  height={500}
                  className="object-contain w-full mac-h-80 hover:scale-105 ease-in-out duration-300"
                />
              </Link>
            )}
            <div className="bg-shop_light_bg p-5">
              <div className="text-xs flex items-center gap-20">
                <div className="flex items-center relative group cursor-pointer">
                    {blog?.blogcategories?.map((category,index)=>(
                        <p className="font-semibold tracking-wider 
                        text-shop_dark_blue" key={index}>{category.title}</p>
                    ))}
                    <span className="absolute -bottom-1.5 left-0 w-full inline-block h-[2px] bg-lightColor/30
                    group-hover:bg-shop_dark_blue hover:cursor-pointer hoverEffect"></span>
                </div>
                <p className="flex items-center gap-1 text-lightColor relative 
                group hover:cursor-pointer hover:text-shop_dark_blue hoverEffect">
                    <Calendar1Icon size={16}/>{' '}
                    {dayjs(blog.publishedAt).format("DD/MM/YYYY")}
                    <span className="absolute -bottom-1.5 left-0 w-full inline-block h-[2px] bg-lightColor/30
                    group-hover:bg-shop_dark_blue hover:cursor-pointer hoverEffect"></span>
                </p>
              </div>
              <Link className="text-base font-semibold tracking-wider 
                hover:text-shop_dark_blue/80 mt-5 line-clamp-2 hoverEffect" href={`/blog/${blog?.slug?.current}`}>
                {blog?.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
    </Container>
  )
}

export default BlogPage