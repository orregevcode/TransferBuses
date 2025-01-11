import React from 'react';
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

  React.useEffect(() => {
    if (setIsSearchListIsOpen) {
      setIsSearchListIsOpen(true);
    }
  }, [setIsSearchListIsOpen]);

  return (
    <div style={style.routeCard}>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1a-content'
          id='panel1a-header'
        >
          <Box style={style.routeContainer}>
            {/* Transport Icons Section */}
            {route.direct_paths && route.direct_paths.length > 0 && (
              <Box style={style.transportIcons}>
                {route.direct_paths.map((path, index) => (
                  <Box style={style.airplaneBox} key={index}>
                    {selectTransportIcon(
                      path.transportation_type.name,
                      style.airplaneIcon
                    )}
                  </Box>
                ))}
              </Box>
            )}
            
            {/* Route Details Section */}
            <Box style={style.box}>
              <Typography>
                {route.direct_paths.map((path, index) => (
                  <React.Fragment key={index}>
                    <span style={style.italicFont}>{path.from.name}</span>
                    <ArrowForwardIcon fontSize='small' sx={style.arrowStyle} />
                    {index === route.direct_paths.length - 1 && (
                      <span style={style.italicFont}>{path.to.name}</span>
                    )}
                  </React.Fragment>
                ))}
              </Typography>
              
              {/* Price and Total Duration Section */}
              <Box style={style.bottomContainer}>
                <Box style={style.priceContainer}>
                  <Typography style={style.price}>{price}</Typography>
                </Box>
                <Typography style={style.time}>{timeTravel}</Typography>
              </Box>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <div>
            {route.direct_paths &&
              route.direct_paths.map((path, index) => (
                <TravelInfo
                  travelInfo={{ route: path }}
                  key={index}
                  price={price}
                  timeTravel={() => calculateTravelTime(path.duration_minutes)}
                />
              ))}
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default RouteCard;
