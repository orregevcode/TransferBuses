import React from 'react';
import locations from '../../../data/jsons/cheapTripData/locations.json';
import { Box, Button, Link, Typography } from '@material-ui/core';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import useTravelInfo from '../../../presentation/hooks/useTravelInfo';
import {
  BOOKING_AFFILIATE,
  BUY_TICKET_AFFILIATE,
  HOSTEL_WORLD_AFFILIATE,
} from '../utils/constants/links';

function TravelInfo({ travelInfo, timeTravel, price }) {
  const {
    style,
    lessThan480,
  } = useTravelInfo(travelInfo);


  return (
    <div>
      {locations ? (
        <>
          <Box style={style.itemContainer}>
            <Box style={style.directions}>
              <Typography style={{ ...style.boldText, ...style.directionText }}>
                {travelInfo.route.from && (
                  <span style={{ padding: '0 2px' }}>
                    {travelInfo.route.from}
                  </span>
                )}
                <ArrowForwardIcon fontSize='small' sx={style.arrowStyle} />
                {travelInfo.route.to && (
                  <span style={{ padding: '0 2px' }}>
                    {travelInfo.route.to}
                  </span>
                )}
              </Typography>
              <span>{travelInfo.route[`transportation_type`]}</span>
            </Box>
            <Box style={style.directions}>
              {!lessThan480 ? (
                <>
                  <Typography sx={{ color: 'rgb(119, 87, 80)' }}>
                    {timeTravel(travelInfo.duration)}
                  </Typography>
                  <Box style={style.btnByTicket}>
                    <Link
                      href={BOOKING_AFFILIATE}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Button
                        variant='outlined'
                        style={style.buyTicket}
                        type='button'
                      >
                        Booking.com
                      </Button>
                    </Link>
                    <Link
                      href={BUY_TICKET_AFFILIATE}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Button
                        variant='outlined'
                        style={{ ...style.buyTicket, fontWeight: 800 }}
                        type='button'
                      >
                        Buy ticket
                      </Button>
                    </Link>
                    <Link
                      href={HOSTEL_WORLD_AFFILIATE}
                      target='_blank'
                      rel='noreferrer'
                    >
                      <Button
                        variant='outlined'
                        style={style.buyTicket}
                        type='button'
                      >
                        Hostelworld
                      </Button>
                    </Link>
                  </Box>
                  <Typography style={style.price}>
                    {`€ ${travelInfo.route['euro_price']}.00`}
                  </Typography>
                </>
              ) : (
                <>
                  <Box style={{ width: '100%' }}>
                    <Box style={style.resultStyleBottom}>
                      <Typography sx={{ color: 'rgb(119, 87, 80)' }}>
                        {timeTravel(travelInfo.duration)}
                      </Typography>
                      <Typography style={style.price}>
                        {`€ ${travelInfo.route['euro_price']}.00`}
                      </Typography>
                    </Box>
                    <Box
                      style={{ ...style.resultStyleBottom, marginTop: '.5rem' }}
                    >
                      <Link
                        href={BOOKING_AFFILIATE}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <Button
                          variant='outlined'
                          style={style.buyTicket}
                          type='button'
                        >
                          Booking.com
                        </Button>
                      </Link>
                      <Link
                        href={BUY_TICKET_AFFILIATE}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <Button
                          variant='outlined'
                          style={{ ...style.buyTicket, fontWeight: 700 }}
                          type='button'
                        >
                          Buy ticket
                        </Button>
                      </Link>
                      <Link
                        href={HOSTEL_WORLD_AFFILIATE}
                        target='_blank'
                        rel='noreferrer'
                      >
                        <Button
                          variant='outlined'
                          style={style.buyTicket}
                          type='button'
                        >
                          Hostelworld
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </>
              )}
            </Box>
          </Box>

          {/* {additionalInformation && additionalInfoOpened && (
            <Modal
              open={additionalInfoOpened}
              onClose={handleOpenInfo}
              aria-labelledby='modal-modal-title'
              aria-describedby='modal-modal-description'
            >
              <div className={s.modal}>
                <h5>Additional information</h5>

                <h5>A test message</h5>

                <p>
                  <b>From: </b>
                </p>
                <p>Air code: {additionalInformation.from.air_code}</p>
                <p>Station: {additionalInformation.from.station}</p>
                <p>Latitude: {additionalInformation.from.coords.lat}</p>
                <p>Longtitude: {additionalInformation.from.coords.lon}</p>
                <p>
                  <b>To: </b>
                </p>
                <p>Air code: {additionalInformation.to.air_code}</p>
                <p>Station: {additionalInformation.to.station}</p>
                <p>Latitude: {additionalInformation.to.coords.lat}</p>
                <p>Longtitude: {additionalInformation.to.coords.lon}</p>
                <p>
                  <b>Info: </b>
                </p>
                <p>
                  Duration:{' '}
                  {Math.floor(additionalInformation.duration_min / 60)}h{' '}
                  {additionalInformation.duration_min % 60}m
                </p>
                <p>Distance: {additionalInformation.distance_km}km</p>
                {additionalInformation.frequency && (
                  <p>Frequency: {additionalInformation.frequency.info}</p>
                )}
              </div>
            </Modal>
          )} */}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
}

export default TravelInfo;
