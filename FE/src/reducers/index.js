import { combineReducers } from "redux";
import CinemaReducer from './CinemaReducer';
import DashboardReducer from './DashboardReducer';
import DetailFilmReducer from './DetailFilmReducer';
import HomeReducer from './HomeReducer';
import ListFilmReducer from './ListFilmReducer';
import NavBarReducer from './NavBarReducer';
import LoginReducer from './LoginReducer';
import ListCinemaReducer from "./ListCinemaReducer";
import AdHotFilmReducer from "./AdHotFilmReducer";
import AdNewFilmReducer from "./AdNewFilmReducer";
import CinemaClusterReducer from "./CinemaClusterReducer";
import SearchFilmReducer from "./SearchFilmReducer";
import SideMenuReducer from "./SideMenuReducer";

export default combineReducers({
    cinemaReducer: CinemaReducer,
    dashBoardReducer: DashboardReducer,
    detailFilmReducer: DetailFilmReducer,
    homeReducer: HomeReducer,
    listFilmReducer: ListFilmReducer,
    navBarReducer: NavBarReducer,
    loginReducer: LoginReducer,
    listCinemaReducer: ListCinemaReducer,
    hotFilm: AdHotFilmReducer,
    newFilm: AdNewFilmReducer,
    cinemaClusterReducer: CinemaClusterReducer,
    serchFilm: SearchFilmReducer,
    sideMenuReducer: SideMenuReducer
})