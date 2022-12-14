import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import axios from 'axios';

import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';

import logoImg from './assets/logo-nlw-esports.svg';
import './styles/main.css';

interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(()=>{
    axios('http://localhost:3333/games')
      .then(response => setGames(response.data))
  },[])

  return(
    <div className="max-w-[1244px] mx-auto flex flex-col items-center my-8">
      <img src={logoImg} alt="" className="h-28"/>

      <h1 className="text-4xl text-white font-black mt-10">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent"> duo </span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-10">
        {
          games.map((game:Game)=>(
            <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads}/>
          ))
        }
      </div>

        <Dialog.Root>
          <CreateAdBanner/>

          <CreateAdModal games={games}/>
        </Dialog.Root>

    </div>
  )
}

export default App
