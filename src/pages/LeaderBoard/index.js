import React, { useEffect, useState } from 'react';
import { ENDPOINT } from '../../constants';
export default function LeaderBoard(){

    const [players, setPlayers] = useState([])
    const [searchQ, setSearchQ] = useState("")

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
        
        

        //sort by finishing
        _players.sort((a, b) =>{ 
            let ftime_a = a.finished_at ? parseInt(a.finished_at): 0
            let ftime_b = b.finished_at ? parseInt(b.finished_at): 0

            return   ftime_a - ftime_b
        })
        console.log(_players, ",,")


        const win_index = [..._players].findIndex((a)=> a.finished_at != null)
        console.log(win_index, 'wi')

        //sort by questions solved so far
        let not_win_players = _players.slice(0, win_index)
        not_win_players.sort((a, b) =>{
            let alen = a.questions_solved.length;
            let blen = b.questions_solved.length;
            let time_a = new Date(a.updatedAt).getTime()
            let time_b = new Date(b.updatedAt).getTime()
            if(alen != blen) return alen - blen;
            return time_b - time_a
        })
        // console.log(not_win_players)
        _players = [..._players.slice(win_index, _players.length),...not_win_players.reverse()]
        console.log(_players, "players")

        return _players

    }

    useEffect(()=>{
        fetchPlayersAsyc()
    },[])

   


    return <div className='w-full flex justify-center text-sm'>
        <div className='container'>
            <h1>LEADERBOARD ({players.length} teams)</h1>
            {/* <div className='w-full flex justify-end py-2'>
                <input placeholder='search by team id' className='border-2 border-gray-500 p-2' value={searchQ} onChange={onChangeSearch}/>
            </div> */}
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
                    <p>Questions solved</p>
                </div>
                <div className='flex-1'>
                    Finished
                </div>
                <div className='flex-1'>
                    Finished at
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
                    {player.finished_at ? <p><i className="fa-solid fa-check"></i></p>: <p> </p>}
                </div>
                <div className='flex-1'>
                {player.finished_at ?  <p>{new Date(parseInt(player.finished_at)).toLocaleString()}</p>: <p> ............ </p>}
                </div>
                
            </div>)}
        </div>
        

    </div>
    
}