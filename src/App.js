import React from 'react'
import db from './data.json'
import List from './List'

function App() {
  function getProps(db) {
    const dbTransform = db.map(e => {
      const arr = e.name.split(' in ')
      return toTransformArr(arr)
    })
    const props = dbTransform[0]
    props.child.push(...toReduceChild(dbTransform.slice(1)))

    function toTransformArr(arr) {
      if (arr.length === 1) {
        if (arr[0].slice(0, -2) === 'folder' || arr[0] === 'root') {
          return {
            type: 'folder',
            name: arr[0],
            child: []
          }
        } else {
          return {
            type: 'file',
            name: arr[0],
          }
        }
      } else {
        return {
          type: 'folder',
          name: arr.slice(-1).join(''),
          child: [
            toTransformArr(toTransformItemArrey(arr)) 
          ]
        }
      }
    }
  
    function toTransformItemArrey(arr) {
      return  arr.slice(0,-1)[0].split(' ').reduce((acc, e, i, a) => {
        return (!Number(e))? [...acc, `${e} ${a[i+1]}`] : [...acc]
      }, [])
    }
  
    function toReduceChild(arr) {
      const result = []
      const set = new Set(arr.map(e => e.name))
     
      arr.forEach(e => {
        (!set[e.name])? set[e.name] = [e] : set[e.name] = [...set[e.name], e]
      })
  
      for (let key in set) {
        set[key] = set[key].reduce((acc, e) => {
          (!acc.length)? acc = [...acc, e] : acc[0].child = [...acc[0].child, e.child]
          return acc
        }, [])
  
        set[key].forEach(elem => {
          if (elem.child) {
            elem.child = elem.child.map(e => e[0])
            elem.child = toReduceChild(elem.child)
          }
        })
  
        result.push(...set[key])
      }
      return result
    }

    return props
  }
  const props = getProps(db);

  function eventFolder(event) {
    event.preventDefault()
    const e = event.target
    if (e.classList.contains('folder__closed')) {
      e.classList.add('folder__opened')
      e.classList.remove('folder__closed')
      e.firstElementChild.classList.add('opened')
      e.firstElementChild.classList.remove('closed')
    } else {
      e.classList.add('folder__closed')
      e.classList.remove('folder__opened')
      e.firstElementChild.classList.add('closed')
      e.firstElementChild.classList.remove('opened')
    }

  }

  return (
    <div className="App">
      <div className="container">
        <h1>Folders</h1>
        <h3>(click on folders)</h3>
        <div onClick={(event => eventFolder(event))}>
          < List props={props}/>
        </div>
      </div>
    </div>
  );
}

export default App;
