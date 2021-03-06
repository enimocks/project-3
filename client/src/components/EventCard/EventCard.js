import React from 'react';
import './EventCard.css';
import API from "../../utils/API";
import moment from 'moment';
import {getUserData} from "../../libs/authenticate"

const EventCard = props => {
  const user=getUserData();
  const disabled=(Object.keys(user).length === 0 ? "disabled" : "" )
  const ridesData = {
    name: props.venue_name,
    street: props.venue_street,
    city: props.venue_city,
    state: props.venue_state,
    time: moment.unix(props.time),
    image: props.image,
    link: props.link
  }

return (
  <div className="card m-3">
    <div className="card-body">
      <div className="row">
        <div className="col-md-9 px-3">
          <p className="card-text text-muted">{moment.unix(props.time).format("LLLL")}</p>
          <h4 className="card-title">
            {props.name}
          </h4>
          <p className="card-text desc">
            {/* Cutoff description if too long to keep card heights manageable */}
            {
              props.children.length < 1700
                ? props.children
                : props.children.substring(0, 1700) + '...'
            }
          </p>
        </div>
        <div className="col-md-3 d-flex flex-column">
          <img className="mb-3 rounded" src={props.image} alt="meetup" />
          <h5 className="card-text"> {props.venue_name}</h5>
          {/* Two ternary operations to parse inconsistent location info */}
          {props.venue_street === ""
            ? <p className="card-text"><i className="fa fa-map-marker" aria-hidden="true"></i> Event needs a location...</p>
            : props.venue_street.includes(',')
              ? <p className="card-text"><i className="fa fa-map-marker fa-lg" aria-hidden="true"></i> {props.venue_street}</p>
              : <p className="card-text"><i className="fa fa-map-marker fa-lg" aria-hidden="true"></i> {props.venue_street} • {props.venue_city}, {props.venue_state} {props.venue_zip}</p>
          }
          <p className="card-text">{props.rsvpcount} people are going to this event!</p>
          <a href={props.link} role="button" target="_blank" className="mt-auto btn btn-block btn-info">Visit this event page</a>
          <a onClick={() => { API.saveEvent(ridesData,user._id) }} role="button" className={`mt-3 btn btn-block btn-outline-secondary ${disabled}`}>Save Event</a>
        </div>
      </div>
    </div>
  </div>
);
};

export default EventCard;