import { Open_Sans } from "next/font/google";
import dynamic from "next/dynamic";

const openSans = Open_Sans({
  variable: "--font-open-san",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"], 
  display: "swap", 
});


export default function Home() {
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>
  )

  const Header = dynamic(() => import('./Header'), {
    loading: () => <LoadingSpinner />
  })

  const Main = dynamic(() => import('./Main'), {
    loading: () => <LoadingSpinner />
  })

  const Footer = dynamic(() => import('./Footer'), {
    loading: () => <LoadingSpinner />
  })

  return (
    <div
      className={`${openSans.className} font-sans
                  w-full grid grid-rows-[70px_auto_30px]  min-h-screen
                  sm:grid-rows-[70px_auto_32px] 
                  md:grid-rows-[80px_auto_35px] 
                  lg:grid-rows-[90px_1fr_40px] 
                  xl:grid-rows-[100px_auto_45px] 
                  2xl:grid-rows-[110px_auto_50px]`}
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
}


