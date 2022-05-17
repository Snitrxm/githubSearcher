import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { Key } from "react";

export default function Member({ user,repos }:any) {
  const { isFallback } = useRouter();

  if(isFallback){
    return <p>Loding...</p>
  }

  return (
    <div className="bg-zinc-800 w-full h-100vh flex flex-col items-center">
      <div className="flex w-2/5 justify-center items-center gap-10 mt-10">
        <img src={user.avatar_url} alt={user.login} className="w-28 rounded-full"/>
        <h1 className="text-white font-bold text-2xl hover:underline hover:underline-offset-2"><a href={user.html_url} target="__blank">{user.login}</a></h1>
      </div>
      <div className="w-3/5 flex flex-wrap gap-5 justify-center mt-10">
        {repos.map((repo: Key | any) => {
          return (
           <div key={repo} className="w-80 h-60 bg-white flex flex-col gap-5 justify-center items-center break-words rounded-md ">
             <h1 className="font-bold text-black text-xl">{repo.name}</h1>
             <div>
               <button className="relative border p-2 rounded border-green-600 cursor-pointer hover:bg-green-600 hover:text-white transition-colors w-40"><a href={repo.html_url}>Visit Repository</a></button>
              </div>
           </div>
          );
        })}
      </div>
    </div>
    
  );
}

export const getStaticPaths: GetStaticPaths = async () => {

  return {
    paths: [],
    fallback: true,
  }
}



export const getStaticProps: GetStaticProps = async (context: any) => {
  console.log(context.params.login)

  const response = await fetch(`https://api.github.com/users/${context.params.login}`);
  const data = await response.json();
  const repos = await fetch(`https://api.github.com/users/${context.params.login}/repos`)
  const reposData = await repos.json();
  console.log(data);
  return {
    props: {
      user: data,
      repos: reposData,
    }
  }
}