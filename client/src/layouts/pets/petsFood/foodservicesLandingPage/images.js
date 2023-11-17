import  fea1  from './fea1.jpg'
import  fea2  from './fea2.jpg'
import  fea3  from './fea3.png'
import dogFood6 from './dogFood6.jpg'
import catFood6 from './catFood6.jpg'
import fishFood5 from './fishFood5.jpg'
import birdFood5 from './birdFood5.jpg'

const images = {
    features: {
        fea1,
        fea2,
        fea3
    },
    categories: {
        dogFood6,
        catFood6,
        fishFood5,
        birdFood5
    },
    buttons: [
        {
            value: 'all',
            desc: 'All'
        },
        {
            value: 'dog',
            desc: 'Dog'
        },
        {
            value: 'cat',
            desc: 'Cat'
        },
        {
            value: 'fish',
            desc: 'Fish'
        },
        {
            value: 'bird',
            desc: 'Bird'
        },
    ]
}


export default images;