import React from 'react'
import PropTypes from 'prop-types'

const TodoDeleteButton = ({onChange, id}) => (
    <div>
        <input
            type="checkbox"
            id={id}
            onChange={onChange}
        />
    </div>
)

TodoDeleteButton.prototype = {
    onChange: PropTypes.func.isRequired,
    id : PropTypes.number.isRequired
}

export default TodoDeleteButton