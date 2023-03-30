import React, { useEffect, useState } from 'react';
import { ENDPOINT } from '../../constants';
export default function LeaderBoard(){

    const [players, setPlayers] = useState([])

    const fetchPlayersAsyc = async ()  =>{
        try {
            const res = await fetch(ENDPOINT + "/leaderboard", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            }).then(r=>r.json());

            setPlayers(sortPlayers(res))
            
        } catch (error) {
            
        }
    }

    const sortPlayers = (_players) =>{
        
        //sort by questions solved so far
        _players.sort((a, b) =>{
            let alen = a.questions_solved.length;
            let blen = b.questions_solved.length;
            if(alen != blen) return blen - alen;
            let time_a = new Date(a.updatedAt).getTime()
            let time_b = new Date(b.updatedAt).getTime()
            return time_a - time_b

        })
        //sort by finishing
        // _players.sort((a, b) =>{ 
        //     let ftime_a = a.finished_at ? parseInt(a.finished_at): 0
        //     let ftime_b = b.finished_at ? parseInt(b.finished_at): 0


        //     return  ftime_b - ftime_a
        // })
        return _players

    }

    useEffect(()=>{
        fetchPlayersAsyc()
    },[])


    return <div className='w-full flex justify-center'>
        <div className='container'>
            <h1>LEADERBOARD</h1>
            <div className={`flex w-full justify-between p-4 my-2 bg-red-900 text-white` }>
                <div className='flex-1'>
                    <h1>
                        Rank
                    </h1>
                </div>
                <div className='flex-1'>
                    <h1>
                        Team id
                    </h1>
                </div>
                <div className='flex-1'>
                    <p>QUESTIONS SOLVED</p>
                </div>
                <div className='flex-1'>
                    FINISHED AT
                </div>
                <div className='flex-1'>
                    Won
                </div>
            </div>
            {players.map((player, index) => <div className={`flex w-full justify-between p-4 my-2 ` + (player.finished_at ? "bg-green-300": "bg-gray-50")}>
                <div className='flex-1'>
                    <h1>
                        {index + 1}
                    </h1>
                </div>
                <div className='flex-1'>
                    <h1>
                        {player.team_id}
                    </h1>
                </div>
                <div className='flex-1'>
                    <p>{player.questions_solved.length}</p>
                </div>
                <div className='flex-1'>
                {player.finished_at ?  <p>{new Date(parseInt(player.finished_at)).toLocaleString()}</p>: <p> ............ </p>}
                </div>
                <div className='flex-1'>
                    {player.finished_at ? <p><i className="fa-solid fa-check"></i></p>: <p> </p>}
                </div>
                
            </div>)}
        </div>
        

    </div>
    
}