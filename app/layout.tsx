import { Toaster } from "react-hot-toast";

const RootLayout=(
    {
  children,
}:{
  children: React.ReactNode;
}
)=>{
return(
    <html lang="en">
        <body className="font-poppins antialiased">
          <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  containerClassName=""
  
  toastOptions={{
    className: '',
    duration: 3000,
    removeDelay: 1000,
    style: {
      background: '#363636',
      color: '#fff',
    },
  }}
/>
            {children}
        </body>
    </html>
)
}

export default RootLayout