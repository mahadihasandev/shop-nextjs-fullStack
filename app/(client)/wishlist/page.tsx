import { currentUser } from '@clerk/nextjs/server'
import NoAccess from '@/components/NoAccess'
import WishListProducts from '@/components/WishListProducts'
const WishListPage = async() => {
    const user=await currentUser()
  return (
    <div>
        {user?(
            <>
                <WishListProducts/>
            </>
        ):(
            <NoAccess details='Log in to your account view your wishlist items.'/>
        )}
    </div>
  )
}

export default WishListPage