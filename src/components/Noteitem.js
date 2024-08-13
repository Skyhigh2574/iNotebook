import React from 'react'

const Noteitem = (props) => {

  const {note} = props;

  return (
    <div>
      {note.title}
      {note.description}

      <div class="card">

        <div class="card-body">
            <h5 class = "card-title"> Card title </h5>
            <p class="card-text"> Some Quick ex,aple  </p>
            <a href="#" class="btn btn-primary"> Go Somwhere</a>
        </div>
      </div>
    </div>
  )
}

export default Noteitem
