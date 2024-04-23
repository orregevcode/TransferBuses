import React, { useEffect } from 'react';
import locations from '../..//../data/jsons/cheapTripData/locations.json';
import TravelInfo from './TravelInfo';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Box } from '@material-ui/core';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import AccordionDetails from '@mui/material/AccordionDetails';
import useRouteCard from '../../../presentation/hooks/useRouteCard';

function RouteCard({ route, setIsSearchListIsOpen }) {
  const {
    style,
    timeTravel,
    priceTravel,
    travelInfo,
    calculateTravelTime,
    selectTransportIcon,
  } = useRouteCard(route);
  const price = priceTravel + '.00';

  useEffect(() => {
    if (setIsSearchListIsOpen) {
      setIsSearchListIsOpen(true);
    }
  }, []);

  return (
    <>
      {locations ? (
        <>
          <div style={style.routeCard}>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls='panel1a-content'
                id='panel1a-header'
              >
                {travelInfo && travelInfo.length !== 0 && (
                  <Box style={style.transportIcons}>
                    {travelInfo.map((item, index) => (
                      <Box style={style.airplaneBox} key={index}>
                        {selectTransportIcon(
                          item.route['transportation_type'].name,
                          style.airplaneIcon
                        )}
                      </Box>
                    ))}
                  </Box>
                )}
                <Box style={style.box}>
                  <Typography>
                    {travelInfo &&
                      travelInfo.length !== 0 &&
                      travelInfo.map((travelInformation, index) => (
                        <span key={index}>
                          <React.Fragment key={index}>
                            {index !== 0 && (
                              <ArrowForwardIcon
                                fontSize='small'
                                sx={style.arrowStyle}
                              />
                            )}
                            <span style={style.italicFont}>
                              {travelInformation.route.from.name}
                            </span>
                          </React.Fragment>
                        </span>
                      ))}
                    <ArrowForwardIcon fontSize='small' sx={style.arrowStyle} />
                    {route['direct_paths'] &&
                      route['direct_paths'].length > 0 && (
                        <span style={style.italicFont}>
                          {
                            route['direct_paths'][
                              route['direct_paths'].length - 1
                            ].to.name
                          }
                        </span>
                      )}{' '}
                  </Typography>
                  <Box style={style.bottomContainer}>
                    <Box style={style.priceContainer}>
                      <Typography style={style.price}>{price}</Typography>
                    </Box>
                    <Typography style={style.time}>{timeTravel}</Typography>
                  </Box>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <div>
                  {travelInfo &&
                    travelInfo.length !== 0 &&
                    travelInfo.map((travelInformation, index) => (
                      <TravelInfo
                        travelInfo={travelInformation}
                        key={index}
                        price={price}
                        timeTravel={() =>
                          calculateTravelTime(
                            travelInformation.route[`duration_minutes`]
                          )
                        }
                      />
                    ))}
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </>
      ) : (
        <h3>Loading...</h3>
      )}
    </>
  );
}

export default RouteCard;
