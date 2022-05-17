import { NextPage } from 'next';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/router';

const Home: NextPage = ({ user }:any) => {
  const [text, setText] = useState<any>();
  const router = useRouter();

  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if(text){
      router.push(`/members/${text}`);
    }else {
      alert("Please enter a user!")
    }
  }

  return (
    <div className='bg-zinc-800 w-full h-screen flex flex-col items-center'>
      <h1 className='text-white text-4xl font-bold mt-10'>Search User in Github</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-8">
        <input className="border-b mt-10 text-2xl p-1 text-white bg-transparent placeholder:text-white focus:outline-none" placeholder='Type a user!!' type="text" value={text} onChange={e => setText(e.target.value)} />
        <button type='submit' className='border font-bold p-2 text-white rounded hover:bg-white hover:text-zinc-800 transition-colors'>Enviar</button>
      </form>
    </div>
  );
}

export async function getStaticProps(){
  const response = await fetch('https://api.github.com/users/Snitrxm');
  const data = await response.json();
  return {
    props:{
      user: data
    }
  }
}

export default Home;