import React, { Component } from 'react'

const Beers = (props) => {
  const { names } = props
  return (
    <div class="row">
      {names.map(name =>
        <div class="col-md-4">
          <div class="card mb-2 mt-2 shadow bg-white rounded">
            <div class="card-body">
              <h5 class="card-title">{name.name}</h5>
              <p className="text-muted font-weight-bold">Likes: {name.likes}</p>
              <button className="btn btn-primary mr-3" onClick={() => props.updateLikes(name.id)}>Like</button>
              <button className="btn btn-danger" onClick={() => props.updateDislikes(name.id)}>Dislike</button>
            </div>
          </div>
        </div>)}
    </div>

  )
}

export default Beers;