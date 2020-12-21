import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TinderCard from 'react-tinder-card'

export default function Feed() {
    const [quote, setQuote] = useState(null)
    const [swipeCounter,setSwipeCounter] = useState(0);

    useEffect( async () => {
        const res = await axios.get('https://www.tronalddump.io/random/quote')
        console.log(res.data)
        setQuote(res.data)

    }, [swipeCounter]);

    const onSwipe = (direction) => {
        setSwipeCounter(counter => counter + 1)
    }
       
    const onCardLeftScreen = (myIdentifier) => {
        console.log(myIdentifier + ' left the screen')
    }

    return (
        <div className="container">
            <div className="cardbox">
                <TinderCard onSwipe={() => onSwipe('left')} onCardLeftScreen={() => onCardLeftScreen('fooBar')} preventSwipe={['right', 'left']}>
                    <div className="card">
                        { quote ? quote.value : "loading"}
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
