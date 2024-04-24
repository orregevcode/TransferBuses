import { useMediaQuery } from '@material-ui/core';
import { resultItemStyle } from '../components/searchResult/style';

const useTravelInfo = (travelInfo) => {
  const style = useMediaQuery('(max-width:650px)')
    ? resultItemStyle.sm
    : resultItemStyle.lg;

  const lessThan480 = useMediaQuery('(max-width:480px)');

  return { style, lessThan480 };
};

export default useTravelInfo;
