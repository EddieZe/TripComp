/**
 ==========TripComp==========
 * Author: Eddie Zeltser
 * Create Date : 26-May-2015
 */

/*=============================== Consts ===============================*/
const USA_ID = '0011';


module.exports = {
    USA_ID: USA_ID
};

/*=============================== Properties ===============================*/
const IS_BACKUP = false;
const IS_LOGGER_ON = true;

/*=============================== Paths ===============================*/
const SITE_IMAGES_PATH = 'resources/images/sitesFrontView/';
const PLACE_IMAGES_PATH = 'resources/images/places/';

/*=============================== Amdocs Proxy ===============================*/
const PROXY_HOST = "proxy";
const PROXY_PORT = 0000;
const IS_BEHIND_PROXY = false;

/*=============================== Google Properties ===============================*/
const KEY = "AIzaSyC5OiqUQQYgdW7UtyRugpEKHWQN5GknOQE";
const OUTPUT_FORMAT = "json";
const GOOGLE_HOST = "maps.googleapis.com";
const GOOGLE_TIMEOUT = 60000;
const GOOGLE_MAX_SOCKETS = 1024;
const GOOGLE_CONNECTION = "keep-alive";
const GOOGLE_APIS = {
    GET_PLACE_DETAILS: "/maps/api/place/details/",
    GET_NEARBY_PLACES_SUMMERY: "/maps/api/place/nearbysearch/",
    GET_NEARBY_PLACES: "/maps/api/place/radarsearch/",
    GET_GEOCODE_BY_ADDRESS: "/maps/api/geocode/",
    GET_PLACE_PHOTO: "/maps/api/place/photo/",
    GET_TIME_ZONE_BY_LOCATION: "/maps/api/timezone/"
};
const GOOGLE_STATUS = {
    OK: "OK",
    ZERO_RESULTS: "ZERO_RESULTS",
    OVER_QUERY_LIMIT: "OVER_QUERY_LIMIT",
    REQUEST_DENIED: "REQUEST_DENIED",
    INVALID_REQUEST: "INVALID_REQUEST",
    NOT_FOUND: "NOT_FOUND"
};
const MAX_RESULTS = 10;

module.exports = {
    IS_LOGGER_ON: IS_LOGGER_ON,
    IS_BACKUP: IS_BACKUP,
    SITE_IMAGES_PATH: SITE_IMAGES_PATH,
    PLACE_IMAGES_PATH: PLACE_IMAGES_PATH,
    PROXY_HOST: PROXY_HOST,
    PROXY_PORT: PROXY_PORT,
    KEY: KEY,
    OUTPUT_FORMAT: OUTPUT_FORMAT,
    GOOGLE_APIS: GOOGLE_APIS,
    GOOGLE_HOST: GOOGLE_HOST,
    GOOGLE_STATUS: GOOGLE_STATUS,
    MAX_RESULTS: MAX_RESULTS,
    IS_BEHIND_PROXY: IS_BEHIND_PROXY,
    GOOGLE_TIMEOUT: GOOGLE_TIMEOUT,
    GOOGLE_MAX_SOCKETS: GOOGLE_MAX_SOCKETS,
    GOOGLE_CONNECTION: GOOGLE_CONNECTION
};