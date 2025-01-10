import React from 'react';
import { Box, Typography } from '@material-ui/core';
import useRouteCard from '../../../presentation/hooks/useRouteCard';

function TravelInfo({ travelInfo, price, timeTravel }) {
  const { selectTransportIcon, style } = useRouteCard();

  // Validate travelInfo
  if (!travelInfo || !travelInfo.route) {
    console.error('Invalid travel info:', travelInfo);
    return null;
  }

  const { route } = travelInfo;
  
  return (
    <Box style={style.travelInfoContainer}>
      <Box style={style.transportIconContainer}>
        {route.transportation_type && selectTransportIcon(
          route.transportation_type.name,
          style.transportIcon
        )}
      </Box>
      <Box style={style.travelDetails}>
        <Typography variant="body1">
          {route.from?.name || 'Unknown'} → {route.to?.name || 'Unknown'}
        </Typography>
        <Box style={style.travelMetrics}>
          <Typography variant="body2">
            {timeTravel ? timeTravel() : 'Duration not available'}
          </Typography>
          <Typography variant="body2">
            {price || 'Price not available'}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default TravelInfo;
