const { JsonDB, Config } = require('node-json-db');

const directRoutes = new JsonDB(
  new Config(`./data/direct_routes.json`, true, false, '/')
).getData('/');
const locationsJson = new JsonDB(
  new Config(`./data/locations.json`, true, false, '/')
).getData('/');
const transport = new JsonDB(
  new Config(`./data/transport.json`, true, false, '/')
).getData('/');

class MixedRoutes {
  async getFilterJson({ startPoint, endPoint }) {
    const pathData = [];

    try {
      if (!startPoint || !endPoint) {
        console.error('Invalid startPoint or endPoint');
        return [];
      }

      let mixedData;

      try {
        mixedData = await new JsonDB(
          new Config(`./partly/routes/${startPoint}.json`, true, false, '/')
        ).getData('/');
      } catch (e) {
        mixedData = null;
        console.log(`Error at catch while reading JSON: ${e}`);
      }

      var jsonData = mixedData ? mixedData : {};

      const filterData = jsonData[`${endPoint}`] ? jsonData[`${endPoint}`] : [];
      const path =
        filterData['direct_routes'] &&
        Array.isArray(filterData['direct_routes'])
          ? filterData['direct_routes']
          : typeof filterData['direct_routes'] === 'string'
          ? filterData['direct_routes'].split(',')
          : [];
      if (!filterData) {
        return [];
      }

      const data = await directRoutes.then((result) => result);

      path.forEach((id) => {
        const pathItem = data[id];
        if (!pathItem) {
          console.error(`Path item with ID ${id} not found. (Mixed)`);
          // return;
        } else {
          pathData.push(data[id]);
        }
      });

      filterData.travel_data = pathData;
      return filterData;
    } catch (error) {
      console.log(error.message);
      throw error;
    }
  }

  async getTravelData(startPoint, endPoint) {
    if (!startPoint || !endPoint) {
      console.error('Invalid startPoint or endPoint');
      return [];
    }

    const transportType = await transport.then(result => result);

    try {
      const data = await this.getFilterJson({ startPoint, endPoint }).then(
        (result) => result
      );
      const locations = await locationsJson.then(result => result);

      if (data.length !== 0) {
        const result = [];
        const directPaths = data.travel_data.map((el) => {
          const fromLocation = locations[el.from];
          const toLocation = locations[el.to];

          if (!fromLocation || !toLocation) {
            return null; // Add a check and return null if locations are not found
          }

          return {
            duration_minutes: el.duration,
            euro_price: el.price,
            from: fromLocation ? fromLocation : 'Unknown',
            to: toLocation ? toLocation : 'Unknown',
            transportation_type: transportType[el.transport],
          };
        });

        result.push({
          duration_minutes: data.duration,
          euro_price: data.price,
          route_type: 'mixed_routes',
          direct_paths: directPaths,
        });

        return result;
      } else {
        console.log('Empty data (mixed)');
        return [];
      }
    } catch (error) {
      console.error('Error in getTravelData:', error);
      return [];
    }
  }
}

module.exports = MixedRoutes;