import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TinderCard from 'react-tinder-card'
import { Card, Row, Loading } from '@geist-ui/react'
import { useRecoilState } from 'recoil'
import { userAtom } from '../atoms'

export default function Feed() {
    const [quote, setQuote] = useState(null)
    const [swipeCounter, setSwipeCounter] = useState(0);
    const [user] = useRecoilState(userAtom);
    useEffect(async () => {
        const res = await axios.get('https://www.tronalddump.io/random/quote')
        console.log(res.data)
        setQuote(res.data)

    }, [swipeCounter]);

    const onSwipe = (direction) => {
        axios.post("http://localhost:5000/quotes/"+direction,{
            quote_id:quote.quote_id,
            quote_text:quote.value,
            userId:user.id
        }).catch(err=>{console.log(err)})
        setSwipeCounter(counter => counter + 1)
    }

    return (
        <div className="container">
            <div className="cardbox">
                <TinderCard onSwipe={() => onSwipe('left')} preventSwipe={['right', 'left','up','down']}>
                    <div className="card">
                        {quote ? <>
                            <Card shadow>
                                <h4>{quote.tags[0]}</h4>
                                <p>{quote.value}</p>
                            </Card>
                        </> : <>
                        <Row style={{ padding: '10px 0' }}>
                            <Loading>Loading</Loading>
                        </Row>
                        </>}
                    </div>
                </TinderCard>
                <div className='buttons'>
                    <button onClick={() => onSwipe('left')}>Swipe left!</button>
                    <button onClick={() => onSwipe('right')}>Swipe right!</button>
                </div>
            </div>
        </div>
    )
}
