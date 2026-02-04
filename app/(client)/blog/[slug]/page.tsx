import Container from "@/components/Container";
import { Title } from "@/components/ui/text";


const SingleBlogPage = async ({params}:{params:Promise<{slug:string}>}) => {
    const {slug} = await params;
  return (
    <div>
         <Container>
            <Title className='text-center'>
                All Blogs
            </Title>
            <p>{slug}</p>
        </Container>
    </div>
  )
}

export default SingleBlogPage