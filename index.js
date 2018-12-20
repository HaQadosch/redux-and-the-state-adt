import { decLeft, incMoves } from './data/model/answer'

const state = {
    'left': 8,
    'moves': 0
}

console.log(
    decLeft()
        .chain(incMoves)
        .execWith(state)
)
