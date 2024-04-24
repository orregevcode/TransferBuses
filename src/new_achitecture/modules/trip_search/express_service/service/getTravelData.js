const FlyingRoutes = require('./flying_routes') ;
const GroundRoutes = require('./ground_routes') ;
const MixedRoutes = require('./mixed_routes');

const {JsonDB, Config} = require("node-json-db");

const directRoutes = (new JsonDB(new Config(
    `./data/direct_routes.json`,
    true,
    false,
    '/'))).getData("/");
const locationsJSON = (new JsonDB(new Config(
    `./data/locations.json`,
    true,
    false,
    '/'))).getData("/");
const transport = (new JsonDB(new Config(
    `./data/transport.json`,
    true,
    false,
    '/'))).getData("/");

console.log(`in getTravelData: ${process.cwd()}`);

function isDirectRoutesData(obj) {
    return (
        typeof obj === 'object' &&
        Object.keys(obj).every((key) => {
            const route = obj[key];
            return (
                typeof route === 'object' &&
                typeof route.from === 'number' &&
                typeof route.to === 'number' &&
                typeof route.transport === 'number' &&
                typeof route.price === 'number' &&
                typeof route.duration === 'number'
            );
        })
    );
}

class DataService {
    flyingData = new FlyingRoutes();
    groundData = new GroundRoutes();
    mixedData = new MixedRoutes();

    constructor() {
    }

    async getFilterJson(
        startPoint,
        endPoint
    ) {
        try {
            const data = isDirectRoutesData(directRoutes)
                ? directRoutes
                : {};
            const objArray = Object.values(data);
            const filterData = objArray.filter(
                (el) => el.from === +startPoint && el.to === +endPoint
            );
            return filterData;
        } catch (error) {
            console.error('Error fetching data:', error);
            return [];
        }
    }

    async getTravelData({startPoint, endPoint}) {
        try {
            const transportType = transport;
            const locations = locationsJSON;

            const data = await this.getFilterJson(startPoint, endPoint).then(
                (data) => data
            );
            if (data.length > 0) {
                const result = data.map((item) => {
                    const fromLocation = locations[item.from];
                    const toLocation = locations[item.to];

                    if (!fromLocation || !toLocation) {
                        console.warn(`From location for ID ${item.from} not found.`);
                        console.warn(`To location for ID ${item.to} not found.`);
                    }

                    const fromName = fromLocation ? fromLocation.name : 'Unknown';
                    const toName = toLocation ? toLocation.name : 'Unknown';
                    const transportTypeName =
                        transportType[item.transport]?.name || 'Unknown';

                    return {
                        duration_minutes: item.duration,
                        euro_price: item.price,
                        route_type: 'direct_routes',
                        direct_paths: [
                            {
                                duration_minutes: item.duration,
                                euro_price: +item.price,
                                from: fromName,
                                to: toName,
                                transportation_type: transportTypeName,
                            },
                        ],
                    };
                });
                return result;
            }
            return [];
        } catch (error) {
            console.error('Error fetching travel data:', error);
            return [];
        }
    };

    getPathMap = async (startPoint, endPoint) => {
        try {
            const
                travelData = await this.getTravelData({startPoint, endPoint,})
                    .then((travelData) => travelData);
            const
                flyingData = await this.flyingData.getTravelData(startPoint, endPoint)
                    .then((travelData) => travelData);
            const
                groundData = await this.groundData
                    .getTravelData(startPoint, endPoint)
                    .then((travelData) => travelData);
            const
                mixedData = await this.mixedData
                    .getTravelData(startPoint, endPoint)
                    .then((travelData) => travelData);

            const
                pathMap = [
                    ...travelData,
                    ...flyingData,
                    ...groundData,
                    ...mixedData,
                ];

            console.log('Result: ')
            console.log(pathMap)
            return pathMap;
        } catch
            (error) {
            console.error('Error in getPathMap:', error);
            return [];
        }
    };
}

module.exports = DataService;
