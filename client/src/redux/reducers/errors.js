import {
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
  EMPLOYEE_LOGIN_FAILURE,
  EMPLOYEE_LOGIN_SUCCESS,
  REGISTRATION_FAILURE,
  REGISTRATION_SUCCESS,
  PASSWORD_MATCH_ERROR,
  PASSWORD_MATCH_SUCCESS,
  CHANGE_PASSWORD_ERROR,
  CHANGE_PASSWORD_SUCCESS,
  EMPLOYEE_REGISTER_FAILURE,
  EMPLOYEE_REGISTER_SUCCESS
} from '../actions/auth';
import {
  LOADING_TABLES_ERROR,
  LOADING_TABLES_SUCCESS,
  ADDING_TABLE_ERROR,
  ADDING_TABLE_SUCCESS,
  SAVING_TABLES_ERROR,
  SAVING_TABLES_SUCCESS,
  DEACTIVATING_TABLE_ERROR,
  DEACTIVATING_TABLE_SUCCESS
} from '../actions/tables';
import {
  LOADING_PARTIES_ERROR,
  LOADING_PARTIES_SUCCESS,
  LOADING_PARTY_ERROR,
  LOADING_PARTY_SUCCESS,
  ADDING_PARTY_ERROR,
  ADDING_PARTY_SUCCESS,
  UPDATING_PARTY_ERROR,
  UPDATING_PARTY_SUCCESS,
  DELETING_PARTY_ERROR,
  DELETING_PARTY_SUCCESS
} from '../actions/party';
import {
  LOADING_ITEMS_ERROR,
  LOADING_ITEMS_SUCCESS,
  ADDING_ITEM_ERROR,
  ADDING_ITEM_SUCCESS
} from '../actions/items';
import {
  LOADING_RESTAURANT_ERROR,
  LOADING_RESTAURANT_SUCCESS,
  ADDING_RESTAURANT_ERROR,
  ADDING_RESTAURANT_SUCCESS
} from '../actions/restaurant';
import { LOADING_SERVERS_ERROR, LOADING_SERVERS_SUCCESS } from '../actions/servers';
import {
  PAYMENT_ERROR,
  PAYMENT_SUCCESS,
  SUBSCRIBING_ERROR,
  SUBSCRIBING_SUCCESS,
  UNSUBSCRIBING_ERROR,
  UNSUBSCRIBING_SUCCESS
} from '../actions/payments';

const initialState = {
  loginError: false,
  employeeLoginError: false,
  registrationError: false,
  passMatchError: false,
  changePasswordError: false,
  loadingTablesError: false,
  addingTablesError: false,
  savingTablesError: false,
  deactivatingTablesError: false,
  loadingPartiesError: false,
  loadingPartyError: false,
  addingPartyError: false,
  updatingPartyError: false,
  deletingPartyError: false,
  loadingItemsError: false,
  loadingRestaurantError: false,
  addingRestaurantError: false,
  loadingServersError: false,
  paymentsError: false,
  subscribingError: false,
  unsubscribingError: false,
};

const ErrorReducer = (errors = initialState, action) => {
  switch (action.type) {
    case LOGIN_FAILURE:
      return { ...errors, loginError: action.payload };
    case LOGIN_SUCCESS:
      return { ...errors, loginError: false };
    case EMPLOYEE_LOGIN_FAILURE:
      return { ...errors, employeeLoginError: action.payload };
    case EMPLOYEE_LOGIN_SUCCESS:
      return { ...errors, employeeLoginError: false };
    case REGISTRATION_FAILURE:
      return { ...errors, registrationError: action.payload };
    case REGISTRATION_SUCCESS:
      return { ...errors, registrationError: false };
    case PASSWORD_MATCH_ERROR:
      return { ...errors, passMatchError: action.payload };
    case PASSWORD_MATCH_SUCCESS:
      return { ...errors, passMatchError: false };
    case CHANGE_PASSWORD_ERROR:
      return { ...errors, changePasswordError: action.payload };
    case CHANGE_PASSWORD_SUCCESS:
      return { ...errors, changePasswordError: false };
    case EMPLOYEE_REGISTER_FAILURE:
      return { ...errors, employeeRegisterError: action.payload };
    case EMPLOYEE_REGISTER_SUCCESS:
      return { ...errors, employeeRegisterError: false };

    case LOADING_TABLES_ERROR:
      return { ...errors, loadingTablesError: action.payload };
    case LOADING_TABLES_SUCCESS:
      return { ...errors, loadingTablesError: false };
    case ADDING_TABLE_ERROR:
      return { ...errors, addingTableError: action.payload };
    case ADDING_TABLE_SUCCESS:
      return { ...errors, addingTableError: false };
    case SAVING_TABLES_ERROR:
      return { ...errors, savingTablesError: action.payload };
    case SAVING_TABLES_SUCCESS:
      return { ...errors, savingTablesError: false };
    case DEACTIVATING_TABLE_ERROR:
      return { ...errors, deactivatingTablesError: action.payload };
    case DEACTIVATING_TABLE_SUCCESS:
      return { ...errors, deactivatingTablesError: false };

    case LOADING_PARTIES_ERROR:
      return { ...errors, loadingPartiesError: action.payload };
    case LOADING_PARTIES_SUCCESS:
      return { ...errors, loadingPartiesError: false };
    case LOADING_PARTY_ERROR:
      return { ...errors, loadingPartyError: action.payload };
    case LOADING_PARTY_SUCCESS:
      return { ...errors, loadingPartyError: false };
    case ADDING_PARTY_ERROR:
      return { ...errors, addingPartyError: action.payload };
    case ADDING_PARTY_SUCCESS:
      return { ...errors, addingPartyError: false };
    case UPDATING_PARTY_ERROR:
      return { ...errors, updatingPartyError: action.payload };
    case UPDATING_PARTY_SUCCESS:
      return { ...errors, updatingPartyError: false };
    case DELETING_PARTY_ERROR:
      return { ...errors, deletingPartyError: action.payload };
    case DELETING_PARTY_SUCCESS:
      return { ...errors, deletingPartyError: false };

    case LOADING_ITEMS_ERROR:
      return { ...errors, loadingItemsError: action.payload };
    case LOADING_ITEMS_SUCCESS:
      return { ...errors, loadingItemsError: false };
    case ADDING_ITEM_ERROR:
      return { ...errors, addingItemError: action.payload };
    case ADDING_ITEM_SUCCESS:
      return { ...errors, addingItemError: false };

    case LOADING_RESTAURANT_ERROR:
      return { ...errors, loadingRestaurantError: action.payload };
    case LOADING_RESTAURANT_SUCCESS:
      return { ...errors, loadingRestaurantError: false };

    case ADDING_RESTAURANT_ERROR:
      return { ...errors, addingRestaurantError: action.payload };
    case ADDING_RESTAURANT_SUCCESS:
      return { ...errors, addingRestaurantError: false };

    case LOADING_SERVERS_ERROR:
      return { ...errors, loadingServersError: action.payload };
    case LOADING_SERVERS_SUCCESS:
      return { ...errors, loadingServersError: false };

    case PAYMENT_ERROR:
      return { ...errors, paymentsError: action.payload };
    case PAYMENT_SUCCESS:
      return { ...errors, paymentsError: false };

    case SUBSCRIBING_ERROR:
      return { ...errors, subscribingError: action.payload };
    case SUBSCRIBING_SUCCESS:
      return { ...errors, subscribingError: false };

    case UNSUBSCRIBING_ERROR:
      return { ...errors, unsubscribingError: action.payload };
    case UNSUBSCRIBING_SUCCESS:
      return { ...errors, unsubscribingError: false };

    default:
      return errors;
  }
};

export default ErrorReducer;
