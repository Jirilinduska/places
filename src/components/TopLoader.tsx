import NextTopLoader from "nextjs-toploader"



export default function TopLoader() {
  return (
    <NextTopLoader
        color="#29d"       // barva čáry
        initialPosition={0.08}
        crawlSpeed={200}
        height={3}         // tloušťka čáry
        crawl={true}
        showSpinner={false} // jestli má být i kolečko
        easing="ease"
        speed={200}
    />
  )
}