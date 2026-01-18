
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.2.1
 * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
 */
Prisma.prismaVersion = {
  client: "6.2.1",
  engine: "4123509d24aa4dede1e864b46351bf2790323b69"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.SchoolScalarFieldEnum = {
  school_id: 'school_id',
  om_id: 'om_id',
  school_name: 'school_name',
  zip_code: 'zip_code',
  address: 'address',
  dir_name: 'dir_name',
  dir_phone: 'dir_phone',
  school_email: 'school_email',
  website: 'website',
  school_type: 'school_type',
  coop: 'coop',
  note: 'note',
  city_id: 'city_id',
  country_id: 'country_id',
  county_id: 'county_id',
  region_id: 'region_id',
  duty: 'duty',
  active: 'active',
  active_by: 'active_by',
  basic: 'basic',
  medior: 'medior',
  high: 'high'
};

exports.Prisma.ContactScalarFieldEnum = {
  contact_id: 'contact_id',
  contact_email: 'contact_email',
  contact_name: 'contact_name',
  contact_phone: 'contact_phone',
  contact_note: 'contact_note',
  createdAt: 'createdAt',
  active: 'active',
  active_by: 'active_by',
  school_id: 'school_id'
};

exports.Prisma.UserScalarFieldEnum = {
  user_id: 'user_id',
  user_name: 'user_name',
  nationality: 'nationality',
  user_phone: 'user_phone',
  user_email: 'user_email',
  on_duty: 'on_duty',
  passwordHash: 'passwordHash',
  userAuthToken: 'userAuthToken',
  resetToken: 'resetToken',
  resetTokenExpiry: 'resetTokenExpiry',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  active: 'active',
  active_by: 'active_by'
};

exports.Prisma.EventScalarFieldEnum = {
  event_id: 'event_id',
  event_name: 'event_name',
  create_date: 'create_date',
  closing_date: 'closing_date',
  event_year: 'event_year',
  semester: 'semester',
  on_duty: 'on_duty',
  event_type: 'event_type',
  estimated_student: 'estimated_student',
  note: 'note',
  slug: 'slug',
  school_id: 'school_id'
};

exports.Prisma.InterestedStudentsScalarFieldEnum = {
  intrest_id: 'intrest_id',
  event_id: 'event_id',
  intrest_count: 'intrest_count',
  grade: 'grade',
  applied: 'applied',
  work_title: 'work_title',
  channel: 'channel',
  status: 'status',
  country_id: 'country_id',
  region_id: 'region_id'
};

exports.Prisma.ActivityScalarFieldEnum = {
  act_id: 'act_id',
  start_date: 'start_date',
  end_date: 'end_date',
  act_name: 'act_name',
  act_note: 'act_note',
  on_duty: 'on_duty',
  dir_flag: 'dir_flag',
  all_region: 'all_region'
};

exports.Prisma.CountryScalarFieldEnum = {
  country_id: 'country_id',
  country_name: 'country_name'
};

exports.Prisma.RegionScalarFieldEnum = {
  region_id: 'region_id',
  region_name: 'region_name',
  country_id: 'country_id'
};

exports.Prisma.CountyScalarFieldEnum = {
  county_id: 'county_id',
  county_name: 'county_name',
  region_id: 'region_id'
};

exports.Prisma.CityScalarFieldEnum = {
  city_id: 'city_id',
  city_name: 'city_name',
  county_id: 'county_id'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  School: 'School',
  Contact: 'Contact',
  User: 'User',
  Event: 'Event',
  InterestedStudents: 'InterestedStudents',
  Activity: 'Activity',
  Country: 'Country',
  Region: 'Region',
  County: 'County',
  City: 'City'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
