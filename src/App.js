import React, { useEffect } from 'react';
// import './App.css';
import { ThemeProvider } from '@material-ui/core/styles';
import { StylesProvider } from '@material-ui/core';
import Header from './new_achitecture/modules/Header/presentation/components/HeaderComponent';
import { AppRouter } from './new_achitecture/general/routes/AppRouter';
import { theme } from './new_achitecture/general/MUI/useStyles';
import useChangeLanguage from './new_achitecture/general/hooks/useChangeLanguage';
import { useLocation } from 'react-router';
import PlayStoreModal from './new_achitecture/general/components/PlayStoreModal/PlayStoreModal';
import usePlayStoreModal from './new_achitecture/general/hooks/usePlayStoreModal';
// import location from './new_achitecture/modules/trip_search/data/jsons/location.json' 
// import transport from './new_achitecture/modules/trip_search/data/jsons/cheapTripData/transport.json';
function App() {
  const { i18n, lang } = useChangeLanguage();
  const { open } = usePlayStoreModal();
  const { pathname } = useLocation();
  // console.log(
  //   'process.env.REACT_APP_BUILD_MODE = ',
  //   process.env.REACT_APP_BUILD_MODE
  // );
  useEffect(() => {
    // sessionStorage.setItem('locations', JSON.stringify(locations));
    // sessionStorage.setItem('transportationTypes', JSON.stringify(transport));
  }, []);

  // useEffect(() => {
  //   caches.open('fileCache').then((cache) => {
  //     cache.match('direct_routes').then((response) => {
  //       if (response) {
  //         console.log('Кэш найден!', response);
  //       } else {
  //         cache.put(
  //           'direct_routes',
  //           new Response(JSON.stringify(directRoutes))
  //         );
  //       }
  //     });
  //   });
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <StylesProvider>
        <Header />
        {open ? <PlayStoreModal open={open} /> : null}
        {/* 
          {
              (!pathname || PAGES_WITH_MUI_HEADER.includes(pathname))?
                  <MainHeader/>
                  :<CityHeaderComponent/>
          } */}
        <AppRouter />
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
