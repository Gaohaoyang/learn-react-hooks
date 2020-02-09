import React, { useState } from 'react'

interface ItemType {
  id: number
  value: number
}

function UseStateWithArray() {
  const [items, setItems] = useState<ItemType[]>([])

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.ceil(Math.random() * 10)
      }
    ])
  }

  return (
    <div>

      <button onClick={addItem}>add a number</button>
      <ul>
        {
          items.length > 0 && items.map((item: ItemType) => (
            <li key={item.id}>{item.value}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default UseStateWithArray
