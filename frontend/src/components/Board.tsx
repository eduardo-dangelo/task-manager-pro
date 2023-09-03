import React from 'react'

type SquareType = 'empty' | 'pawn' | 'knight' | 'bishop' | 'rook' | 'queen' | 'king'

interface SquareProps {
  type: SquareType
  color: 'white' | 'black'
}

const Square: React.FC<SquareProps> = ({ type, color }) => {
  let piece
  switch (type) {
    case 'pawn':
      piece = '♟'
      break
    case 'knight':
      piece = '♞'
      break
    case 'bishop':
      piece = '♝'
      break
    case 'rook':
      piece = '♜'
      break
    case 'queen':
      piece = '♛'
      break
    case 'king':
      piece = '♚'
      break
    default:
      piece = ''
  }

  return (
    <div
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: color,
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {piece}
    </div>
  )
}

interface BoardProps {
  board: SquareType[][]
}

const Board: React.FC<BoardProps> = ({ board }) => {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {board.map((row, i) =>
        row.map((square, j) => (
          <Square
            key={`${i}-${j}`}
            type={square}
            color={(i + j) % 2 === 0 ? 'white' : 'gray'}
          />
        )),
      )}
    </div>
  )
}

export default Board
