import {sortBy} from 'lodash';

export const SORTS = {
  NONE: list => list,
  ID: list => sortBy(list, "id"),
  FIRST_NAME: list => sortBy(list, "firstName"),
  LAST_NAME: list => sortBy(list, "lastName"),
  EMAIL: list => sortBy(list, "email"),
  PHONE: list => sortBy(list, "phone"),
};