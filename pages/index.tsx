import type { NextPage } from 'next'
import Hero from './Hero'
import Head from 'next/head'
import JSONLD from '../components/JSONLD'

const jsonldData = {
  "@context": "https://schema.org",
  "@type": "Website",
  "name": "Brian Robinson's space",
  "creator": "Brian Robinson",
  "url": "https://brobinson.space",
  "description": "Portfolio of Brian Robinson, nerd king, front end mobile and web developer",
  "mainEntity": [
    {
      "@type": "Person",
      "name": "Brian Robinson",
      "jobTitle": "Front End developer",
      "url": "https://brobinson.space/About",
      "description": "I am a self taught and freelance developer.",
      "email": "bprobins1013@gmail.com"
    },
    {
      "@type": "ContactPoint",
      "email": "bprobins1013@gmail.com",
      "url": "https://brobinson.space/contact"
    }
  ],
  "hasPart" : {
    "@type": "WebPage",
    "name": "Brian Robinson's favorite projects",
    "url": "https://brobinson.space/Projects",
    "mainEntity": [
      {
        "@type": "CreativeWork",
        "name": "Soikkeli and Company website",
        "description": "Business site for Soikkeli and Company design and construction.",
        "url": "https://soikkeli.com/",
        "creator": "Brian Robinson"
      },
      {
        "@type": "CreativeWork",
        "name": "RPG sheet creator",
        "description": "Website tool to create custom rpg sheets out of images.",
        "url": "https://rpgsheetgenerator.web.app/",
        "image": "/assets/RPGSheetCreator_sample.png",
        "creator": "Brian Robinson"
      },
      {
        "@type": "CreativeWork",
        "name": "FFBE Sync",
        "description": "Mobile app to download user data for a Final Fantasy game.",
        "video": "/assets/ffbesync_preview.mp4"
      },
      {
        "@type": "CreativeWork",
        "name": "in-response",
        "description": "Mobile app to track Magic: The Gathering game state.",
        "url": "https://play.google.com/store/apps/details?id=com.beedazzle.mtg_counter&pli=1",
        "image": "/assets/in_response_sample.png",
        "creator": "Brian Robinson"
      },
      {
        "@type": "CreativeWork",
        "name": "Trovestar",
        "description": "Marketplace and database website for collectibles",
        "url": "https://www.trovestar.com/"
      },
      {
        "@type": "CreativeWork",
        "name": "Lady Luck website",
        "description": "Business site for Lady Luck MV.",
        "url": "https://ladyluckmv.com/",
        "creator": "Brian Robinson"
      }
    ]
  }
}

const Home: NextPage = () => {
  return (
    <>
      <div>
        <Head>
          <meta charSet="utf-8" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#000000" />
          <meta name="description" content="Portfolio of Brian Robinson, nerd king, front end mobile and web developer " />
          <meta name="title" content="Brian Robinson's Portfolio" />
          <meta property='og:title' key='title' content="Brian Robinson's Portfolio" />
          <meta name="robots" content="follow, nocache" />
          <meta name="author" content="Brian Robinson" />
          <link rel="icon" href="/admin_helm.ico" />
          <link rel="img_src" href="/admin_helm_og.png" />
          <link rel="shortcut icon" href="/admin_helm.ico" />
          {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin='true' />
          <link href="https://fonts.googleapis.com/css2?family=Oxygen:wght@300&display=swap" rel="stylesheet" />
          <title>Brian Robinson's Portfolio</title>
          <JSONLD data={jsonldData} />
        </Head>
      </div>
      <Hero />
    </>
  )
}

export default Home
