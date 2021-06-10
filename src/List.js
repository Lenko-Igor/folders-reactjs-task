import React from 'react'
import PropTypes from 'prop-types'

function List({props}) {
  const classNames = {
    ul: (props.type === 'folder')?`${props.type}__closed` : props.type,
    li: (props.type === 'folder')? `${props.type}-li closed` : ''
  }

  return (
    <ul className={classNames.ul}>{props.name}
      <li className={classNames.li}>
        {props.child && props.child.map(e => <List props={e} key={Math.random()}/>)}
      </li>
    </ul>
  )
}

export default List

List.propTypes = {
  props: PropTypes.object
};