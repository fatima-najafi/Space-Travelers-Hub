import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import PropTypes from 'prop-types';
import '../styles/rockets.css';
import { getAPI, reservation } from '../redux/rocketsSlice';

const RocketList = () => {
  const dispatch = useDispatch();
  const { RocketList, isLoading, error } = useSelector(
    (store) => store.rockets,
  );

  useEffect(() => {
    if (RocketList.length === 0) {
      dispatch(getAPI());
    }
  }, [dispatch, RocketList.length]);
  if (isLoading === true) {
    return <div>Loading</div>;
  }
  if (isLoading === false) {
    return (
      <div data-testid="RocketList">
        {RocketList.map((item) => (
          <Rocket
            key={item.id}
            name={item.name}
            disc={
              item.reserved ? (
                <div>
                  <span className="reserved">Reserved </span>
                  {item.disc}
                </div>
              ) : (
                item.disc
              )
            }
            image={item.images}
            Reservation={item.id}
            reservationState={
              item.reserved ? (
                <button type="button" className="Cancel-Reservation">
                  Cancel Reservation
                </button>
              ) : (
                <button type="button" className="Reservation">
                  Reserve rocket
                </button>
              )
            }
          />
        ))}
      </div>
    );
  }
  return <div>{error}</div>;
};

const Rocket = (props) => {
  const dispatch = useDispatch();

  const
    {
      id, name, disc, image, Reservation, reservationState,
    } = props;
  const handleReservationClick = () => {
    dispatch(reservation(Reservation));
  };

  return (
    <div className="rocketC" key={id}>
      <img className="rocketImg" src={image} alt={name} />
      <div className="contentC">
        <h4 className="rocektName">{name}</h4>
        <div className="rocketDesc">{disc}</div>
        <div
          role="button"
          tabIndex="0"
          onClick={handleReservationClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleReservationClick();
            }
          }}
        >
          {reservationState}
        </div>
      </div>
    </div>
  );
};

Rocket.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disc: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  Reservation: PropTypes.number.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  reservationState: PropTypes.object.isRequired,
};

export default RocketList;
