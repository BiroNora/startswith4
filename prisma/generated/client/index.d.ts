
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model School
 * 
 */
export type School = $Result.DefaultSelection<Prisma.$SchoolPayload>
/**
 * Model Contact
 * 
 */
export type Contact = $Result.DefaultSelection<Prisma.$ContactPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Event
 * 
 */
export type Event = $Result.DefaultSelection<Prisma.$EventPayload>
/**
 * Model InterestedStudents
 * 
 */
export type InterestedStudents = $Result.DefaultSelection<Prisma.$InterestedStudentsPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model Country
 * 
 */
export type Country = $Result.DefaultSelection<Prisma.$CountryPayload>
/**
 * Model Region
 * 
 */
export type Region = $Result.DefaultSelection<Prisma.$RegionPayload>
/**
 * Model County
 * 
 */
export type County = $Result.DefaultSelection<Prisma.$CountyPayload>
/**
 * Model City
 * 
 */
export type City = $Result.DefaultSelection<Prisma.$CityPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Schools
 * const schools = await prisma.school.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Schools
   * const schools = await prisma.school.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs, $Utils.Call<Prisma.TypeMapCb, {
    extArgs: ExtArgs
  }>, ClientOptions>

      /**
   * `prisma.school`: Exposes CRUD operations for the **School** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Schools
    * const schools = await prisma.school.findMany()
    * ```
    */
  get school(): Prisma.SchoolDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contact`: Exposes CRUD operations for the **Contact** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contacts
    * const contacts = await prisma.contact.findMany()
    * ```
    */
  get contact(): Prisma.ContactDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.event`: Exposes CRUD operations for the **Event** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Events
    * const events = await prisma.event.findMany()
    * ```
    */
  get event(): Prisma.EventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.interestedStudents`: Exposes CRUD operations for the **InterestedStudents** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more InterestedStudents
    * const interestedStudents = await prisma.interestedStudents.findMany()
    * ```
    */
  get interestedStudents(): Prisma.InterestedStudentsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **Country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): Prisma.CountryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.region`: Exposes CRUD operations for the **Region** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Regions
    * const regions = await prisma.region.findMany()
    * ```
    */
  get region(): Prisma.RegionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.county`: Exposes CRUD operations for the **County** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Counties
    * const counties = await prisma.county.findMany()
    * ```
    */
  get county(): Prisma.CountyDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.city`: Exposes CRUD operations for the **City** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Cities
    * const cities = await prisma.city.findMany()
    * ```
    */
  get city(): Prisma.CityDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.2.1
   * Query Engine version: 4123509d24aa4dede1e864b46351bf2790323b69
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
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

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "school" | "contact" | "user" | "event" | "interestedStudents" | "activity" | "country" | "region" | "county" | "city"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      School: {
        payload: Prisma.$SchoolPayload<ExtArgs>
        fields: Prisma.SchoolFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SchoolFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SchoolFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findFirst: {
            args: Prisma.SchoolFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SchoolFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          findMany: {
            args: Prisma.SchoolFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          create: {
            args: Prisma.SchoolCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          createMany: {
            args: Prisma.SchoolCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SchoolCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          delete: {
            args: Prisma.SchoolDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          update: {
            args: Prisma.SchoolUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          deleteMany: {
            args: Prisma.SchoolDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SchoolUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SchoolUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>[]
          }
          upsert: {
            args: Prisma.SchoolUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SchoolPayload>
          }
          aggregate: {
            args: Prisma.SchoolAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSchool>
          }
          groupBy: {
            args: Prisma.SchoolGroupByArgs<ExtArgs>
            result: $Utils.Optional<SchoolGroupByOutputType>[]
          }
          count: {
            args: Prisma.SchoolCountArgs<ExtArgs>
            result: $Utils.Optional<SchoolCountAggregateOutputType> | number
          }
        }
      }
      Contact: {
        payload: Prisma.$ContactPayload<ExtArgs>
        fields: Prisma.ContactFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findFirst: {
            args: Prisma.ContactFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          findMany: {
            args: Prisma.ContactFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          create: {
            args: Prisma.ContactCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          createMany: {
            args: Prisma.ContactCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          delete: {
            args: Prisma.ContactDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          update: {
            args: Prisma.ContactUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          deleteMany: {
            args: Prisma.ContactDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>[]
          }
          upsert: {
            args: Prisma.ContactUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactPayload>
          }
          aggregate: {
            args: Prisma.ContactAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContact>
          }
          groupBy: {
            args: Prisma.ContactGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactCountArgs<ExtArgs>
            result: $Utils.Optional<ContactCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Event: {
        payload: Prisma.$EventPayload<ExtArgs>
        fields: Prisma.EventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findFirst: {
            args: Prisma.EventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          findMany: {
            args: Prisma.EventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          create: {
            args: Prisma.EventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          createMany: {
            args: Prisma.EventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          delete: {
            args: Prisma.EventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          update: {
            args: Prisma.EventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          deleteMany: {
            args: Prisma.EventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>[]
          }
          upsert: {
            args: Prisma.EventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EventPayload>
          }
          aggregate: {
            args: Prisma.EventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEvent>
          }
          groupBy: {
            args: Prisma.EventGroupByArgs<ExtArgs>
            result: $Utils.Optional<EventGroupByOutputType>[]
          }
          count: {
            args: Prisma.EventCountArgs<ExtArgs>
            result: $Utils.Optional<EventCountAggregateOutputType> | number
          }
        }
      }
      InterestedStudents: {
        payload: Prisma.$InterestedStudentsPayload<ExtArgs>
        fields: Prisma.InterestedStudentsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InterestedStudentsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InterestedStudentsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>
          }
          findFirst: {
            args: Prisma.InterestedStudentsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InterestedStudentsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>
          }
          findMany: {
            args: Prisma.InterestedStudentsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>[]
          }
          create: {
            args: Prisma.InterestedStudentsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>
          }
          createMany: {
            args: Prisma.InterestedStudentsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InterestedStudentsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>[]
          }
          delete: {
            args: Prisma.InterestedStudentsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>
          }
          update: {
            args: Prisma.InterestedStudentsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>
          }
          deleteMany: {
            args: Prisma.InterestedStudentsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InterestedStudentsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InterestedStudentsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>[]
          }
          upsert: {
            args: Prisma.InterestedStudentsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InterestedStudentsPayload>
          }
          aggregate: {
            args: Prisma.InterestedStudentsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInterestedStudents>
          }
          groupBy: {
            args: Prisma.InterestedStudentsGroupByArgs<ExtArgs>
            result: $Utils.Optional<InterestedStudentsGroupByOutputType>[]
          }
          count: {
            args: Prisma.InterestedStudentsCountArgs<ExtArgs>
            result: $Utils.Optional<InterestedStudentsCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      Country: {
        payload: Prisma.$CountryPayload<ExtArgs>
        fields: Prisma.CountryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findFirst: {
            args: Prisma.CountryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          findMany: {
            args: Prisma.CountryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          create: {
            args: Prisma.CountryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          createMany: {
            args: Prisma.CountryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CountryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          delete: {
            args: Prisma.CountryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          update: {
            args: Prisma.CountryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          deleteMany: {
            args: Prisma.CountryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CountryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>[]
          }
          upsert: {
            args: Prisma.CountryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountryPayload>
          }
          aggregate: {
            args: Prisma.CountryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCountry>
          }
          groupBy: {
            args: Prisma.CountryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountryCountArgs<ExtArgs>
            result: $Utils.Optional<CountryCountAggregateOutputType> | number
          }
        }
      }
      Region: {
        payload: Prisma.$RegionPayload<ExtArgs>
        fields: Prisma.RegionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RegionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RegionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findFirst: {
            args: Prisma.RegionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RegionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          findMany: {
            args: Prisma.RegionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          create: {
            args: Prisma.RegionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          createMany: {
            args: Prisma.RegionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RegionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          delete: {
            args: Prisma.RegionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          update: {
            args: Prisma.RegionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          deleteMany: {
            args: Prisma.RegionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RegionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RegionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>[]
          }
          upsert: {
            args: Prisma.RegionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RegionPayload>
          }
          aggregate: {
            args: Prisma.RegionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRegion>
          }
          groupBy: {
            args: Prisma.RegionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RegionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RegionCountArgs<ExtArgs>
            result: $Utils.Optional<RegionCountAggregateOutputType> | number
          }
        }
      }
      County: {
        payload: Prisma.$CountyPayload<ExtArgs>
        fields: Prisma.CountyFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CountyFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CountyFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>
          }
          findFirst: {
            args: Prisma.CountyFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CountyFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>
          }
          findMany: {
            args: Prisma.CountyFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>[]
          }
          create: {
            args: Prisma.CountyCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>
          }
          createMany: {
            args: Prisma.CountyCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CountyCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>[]
          }
          delete: {
            args: Prisma.CountyDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>
          }
          update: {
            args: Prisma.CountyUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>
          }
          deleteMany: {
            args: Prisma.CountyDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CountyUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CountyUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>[]
          }
          upsert: {
            args: Prisma.CountyUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CountyPayload>
          }
          aggregate: {
            args: Prisma.CountyAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCounty>
          }
          groupBy: {
            args: Prisma.CountyGroupByArgs<ExtArgs>
            result: $Utils.Optional<CountyGroupByOutputType>[]
          }
          count: {
            args: Prisma.CountyCountArgs<ExtArgs>
            result: $Utils.Optional<CountyCountAggregateOutputType> | number
          }
        }
      }
      City: {
        payload: Prisma.$CityPayload<ExtArgs>
        fields: Prisma.CityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          findFirst: {
            args: Prisma.CityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          findMany: {
            args: Prisma.CityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>[]
          }
          create: {
            args: Prisma.CityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          createMany: {
            args: Prisma.CityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>[]
          }
          delete: {
            args: Prisma.CityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          update: {
            args: Prisma.CityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          deleteMany: {
            args: Prisma.CityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>[]
          }
          upsert: {
            args: Prisma.CityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CityPayload>
          }
          aggregate: {
            args: Prisma.CityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCity>
          }
          groupBy: {
            args: Prisma.CityGroupByArgs<ExtArgs>
            result: $Utils.Optional<CityGroupByOutputType>[]
          }
          count: {
            args: Prisma.CityCountArgs<ExtArgs>
            result: $Utils.Optional<CityCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    school?: SchoolOmit
    contact?: ContactOmit
    user?: UserOmit
    event?: EventOmit
    interestedStudents?: InterestedStudentsOmit
    activity?: ActivityOmit
    country?: CountryOmit
    region?: RegionOmit
    county?: CountyOmit
    city?: CityOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SchoolCountOutputType
   */

  export type SchoolCountOutputType = {
    Contact: number
    Event: number
    User: number
  }

  export type SchoolCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | SchoolCountOutputTypeCountContactArgs
    Event?: boolean | SchoolCountOutputTypeCountEventArgs
    User?: boolean | SchoolCountOutputTypeCountUserArgs
  }

  // Custom InputTypes
  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SchoolCountOutputType
     */
    select?: SchoolCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * SchoolCountOutputType without action
   */
  export type SchoolCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type ContactCountOutputType
   */

  export type ContactCountOutputType = {
    User: number
  }

  export type ContactCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | ContactCountOutputTypeCountUserArgs
  }

  // Custom InputTypes
  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ContactCountOutputType
     */
    select?: ContactCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ContactCountOutputType without action
   */
  export type ContactCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Contact: number
    Event: number
    School: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | UserCountOutputTypeCountContactArgs
    Event?: boolean | UserCountOutputTypeCountEventArgs
    School?: boolean | UserCountOutputTypeCountSchoolArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountEventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
  }


  /**
   * Count Type EventCountOutputType
   */

  export type EventCountOutputType = {
    User: number
    InterestedStudents: number
  }

  export type EventCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    User?: boolean | EventCountOutputTypeCountUserArgs
    InterestedStudents?: boolean | EventCountOutputTypeCountInterestedStudentsArgs
  }

  // Custom InputTypes
  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EventCountOutputType
     */
    select?: EventCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountUserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
  }

  /**
   * EventCountOutputType without action
   */
  export type EventCountOutputTypeCountInterestedStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterestedStudentsWhereInput
  }


  /**
   * Count Type CountryCountOutputType
   */

  export type CountryCountOutputType = {
    InterestedStudent: number
    Region: number
    School: number
  }

  export type CountryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InterestedStudent?: boolean | CountryCountOutputTypeCountInterestedStudentArgs
    Region?: boolean | CountryCountOutputTypeCountRegionArgs
    School?: boolean | CountryCountOutputTypeCountSchoolArgs
  }

  // Custom InputTypes
  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountryCountOutputType
     */
    select?: CountryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountInterestedStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterestedStudentsWhereInput
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountRegionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
  }

  /**
   * CountryCountOutputType without action
   */
  export type CountryCountOutputTypeCountSchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
  }


  /**
   * Count Type RegionCountOutputType
   */

  export type RegionCountOutputType = {
    County: number
    InterestedStudent: number
    School: number
  }

  export type RegionCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    County?: boolean | RegionCountOutputTypeCountCountyArgs
    InterestedStudent?: boolean | RegionCountOutputTypeCountInterestedStudentArgs
    School?: boolean | RegionCountOutputTypeCountSchoolArgs
  }

  // Custom InputTypes
  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RegionCountOutputType
     */
    select?: RegionCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountCountyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountyWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountInterestedStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterestedStudentsWhereInput
  }

  /**
   * RegionCountOutputType without action
   */
  export type RegionCountOutputTypeCountSchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
  }


  /**
   * Count Type CountyCountOutputType
   */

  export type CountyCountOutputType = {
    city: number
    School: number
  }

  export type CountyCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CountyCountOutputTypeCountCityArgs
    School?: boolean | CountyCountOutputTypeCountSchoolArgs
  }

  // Custom InputTypes
  /**
   * CountyCountOutputType without action
   */
  export type CountyCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CountyCountOutputType
     */
    select?: CountyCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CountyCountOutputType without action
   */
  export type CountyCountOutputTypeCountCityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CityWhereInput
  }

  /**
   * CountyCountOutputType without action
   */
  export type CountyCountOutputTypeCountSchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
  }


  /**
   * Count Type CityCountOutputType
   */

  export type CityCountOutputType = {
    School: number
  }

  export type CityCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | CityCountOutputTypeCountSchoolArgs
  }

  // Custom InputTypes
  /**
   * CityCountOutputType without action
   */
  export type CityCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CityCountOutputType
     */
    select?: CityCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CityCountOutputType without action
   */
  export type CityCountOutputTypeCountSchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
  }


  /**
   * Models
   */

  /**
   * Model School
   */

  export type AggregateSchool = {
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  export type SchoolAvgAggregateOutputType = {
    school_id: number | null
    city_id: number | null
    country_id: number | null
    county_id: number | null
    region_id: number | null
  }

  export type SchoolSumAggregateOutputType = {
    school_id: number | null
    city_id: number | null
    country_id: number | null
    county_id: number | null
    region_id: number | null
  }

  export type SchoolMinAggregateOutputType = {
    school_id: number | null
    om_id: string | null
    school_name: string | null
    zip_code: string | null
    address: string | null
    dir_name: string | null
    dir_phone: string | null
    school_email: string | null
    website: string | null
    coop: boolean | null
    note: string | null
    city_id: number | null
    country_id: number | null
    county_id: number | null
    region_id: number | null
    active: boolean | null
    active_by: string | null
    basic: boolean | null
    medior: boolean | null
    high: boolean | null
  }

  export type SchoolMaxAggregateOutputType = {
    school_id: number | null
    om_id: string | null
    school_name: string | null
    zip_code: string | null
    address: string | null
    dir_name: string | null
    dir_phone: string | null
    school_email: string | null
    website: string | null
    coop: boolean | null
    note: string | null
    city_id: number | null
    country_id: number | null
    county_id: number | null
    region_id: number | null
    active: boolean | null
    active_by: string | null
    basic: boolean | null
    medior: boolean | null
    high: boolean | null
  }

  export type SchoolCountAggregateOutputType = {
    school_id: number
    om_id: number
    school_name: number
    zip_code: number
    address: number
    dir_name: number
    dir_phone: number
    school_email: number
    website: number
    school_type: number
    coop: number
    note: number
    city_id: number
    country_id: number
    county_id: number
    region_id: number
    duty: number
    active: number
    active_by: number
    basic: number
    medior: number
    high: number
    _all: number
  }


  export type SchoolAvgAggregateInputType = {
    school_id?: true
    city_id?: true
    country_id?: true
    county_id?: true
    region_id?: true
  }

  export type SchoolSumAggregateInputType = {
    school_id?: true
    city_id?: true
    country_id?: true
    county_id?: true
    region_id?: true
  }

  export type SchoolMinAggregateInputType = {
    school_id?: true
    om_id?: true
    school_name?: true
    zip_code?: true
    address?: true
    dir_name?: true
    dir_phone?: true
    school_email?: true
    website?: true
    coop?: true
    note?: true
    city_id?: true
    country_id?: true
    county_id?: true
    region_id?: true
    active?: true
    active_by?: true
    basic?: true
    medior?: true
    high?: true
  }

  export type SchoolMaxAggregateInputType = {
    school_id?: true
    om_id?: true
    school_name?: true
    zip_code?: true
    address?: true
    dir_name?: true
    dir_phone?: true
    school_email?: true
    website?: true
    coop?: true
    note?: true
    city_id?: true
    country_id?: true
    county_id?: true
    region_id?: true
    active?: true
    active_by?: true
    basic?: true
    medior?: true
    high?: true
  }

  export type SchoolCountAggregateInputType = {
    school_id?: true
    om_id?: true
    school_name?: true
    zip_code?: true
    address?: true
    dir_name?: true
    dir_phone?: true
    school_email?: true
    website?: true
    school_type?: true
    coop?: true
    note?: true
    city_id?: true
    country_id?: true
    county_id?: true
    region_id?: true
    duty?: true
    active?: true
    active_by?: true
    basic?: true
    medior?: true
    high?: true
    _all?: true
  }

  export type SchoolAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which School to aggregate.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Schools
    **/
    _count?: true | SchoolCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SchoolAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SchoolSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SchoolMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SchoolMaxAggregateInputType
  }

  export type GetSchoolAggregateType<T extends SchoolAggregateArgs> = {
        [P in keyof T & keyof AggregateSchool]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSchool[P]>
      : GetScalarType<T[P], AggregateSchool[P]>
  }




  export type SchoolGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithAggregationInput | SchoolOrderByWithAggregationInput[]
    by: SchoolScalarFieldEnum[] | SchoolScalarFieldEnum
    having?: SchoolScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SchoolCountAggregateInputType | true
    _avg?: SchoolAvgAggregateInputType
    _sum?: SchoolSumAggregateInputType
    _min?: SchoolMinAggregateInputType
    _max?: SchoolMaxAggregateInputType
  }

  export type SchoolGroupByOutputType = {
    school_id: number
    om_id: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name: string | null
    dir_phone: string | null
    school_email: string
    website: string | null
    school_type: string[]
    coop: boolean | null
    note: string | null
    city_id: number
    country_id: number
    county_id: number
    region_id: number
    duty: string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    _count: SchoolCountAggregateOutputType | null
    _avg: SchoolAvgAggregateOutputType | null
    _sum: SchoolSumAggregateOutputType | null
    _min: SchoolMinAggregateOutputType | null
    _max: SchoolMaxAggregateOutputType | null
  }

  type GetSchoolGroupByPayload<T extends SchoolGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SchoolGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SchoolGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SchoolGroupByOutputType[P]>
            : GetScalarType<T[P], SchoolGroupByOutputType[P]>
        }
      >
    >


  export type SchoolSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    school_id?: boolean
    om_id?: boolean
    school_name?: boolean
    zip_code?: boolean
    address?: boolean
    dir_name?: boolean
    dir_phone?: boolean
    school_email?: boolean
    website?: boolean
    school_type?: boolean
    coop?: boolean
    note?: boolean
    city_id?: boolean
    country_id?: boolean
    county_id?: boolean
    region_id?: boolean
    duty?: boolean
    active?: boolean
    active_by?: boolean
    basic?: boolean
    medior?: boolean
    high?: boolean
    Contact?: boolean | School$ContactArgs<ExtArgs>
    Event?: boolean | School$EventArgs<ExtArgs>
    city?: boolean | CityDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    county?: boolean | CountyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    User?: boolean | School$UserArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    school_id?: boolean
    om_id?: boolean
    school_name?: boolean
    zip_code?: boolean
    address?: boolean
    dir_name?: boolean
    dir_phone?: boolean
    school_email?: boolean
    website?: boolean
    school_type?: boolean
    coop?: boolean
    note?: boolean
    city_id?: boolean
    country_id?: boolean
    county_id?: boolean
    region_id?: boolean
    duty?: boolean
    active?: boolean
    active_by?: boolean
    basic?: boolean
    medior?: boolean
    high?: boolean
    city?: boolean | CityDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    county?: boolean | CountyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    school_id?: boolean
    om_id?: boolean
    school_name?: boolean
    zip_code?: boolean
    address?: boolean
    dir_name?: boolean
    dir_phone?: boolean
    school_email?: boolean
    website?: boolean
    school_type?: boolean
    coop?: boolean
    note?: boolean
    city_id?: boolean
    country_id?: boolean
    county_id?: boolean
    region_id?: boolean
    duty?: boolean
    active?: boolean
    active_by?: boolean
    basic?: boolean
    medior?: boolean
    high?: boolean
    city?: boolean | CityDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    county?: boolean | CountyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["school"]>

  export type SchoolSelectScalar = {
    school_id?: boolean
    om_id?: boolean
    school_name?: boolean
    zip_code?: boolean
    address?: boolean
    dir_name?: boolean
    dir_phone?: boolean
    school_email?: boolean
    website?: boolean
    school_type?: boolean
    coop?: boolean
    note?: boolean
    city_id?: boolean
    country_id?: boolean
    county_id?: boolean
    region_id?: boolean
    duty?: boolean
    active?: boolean
    active_by?: boolean
    basic?: boolean
    medior?: boolean
    high?: boolean
  }

  export type SchoolOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"school_id" | "om_id" | "school_name" | "zip_code" | "address" | "dir_name" | "dir_phone" | "school_email" | "website" | "school_type" | "coop" | "note" | "city_id" | "country_id" | "county_id" | "region_id" | "duty" | "active" | "active_by" | "basic" | "medior" | "high", ExtArgs["result"]["school"]>
  export type SchoolInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | School$ContactArgs<ExtArgs>
    Event?: boolean | School$EventArgs<ExtArgs>
    city?: boolean | CityDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    county?: boolean | CountyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    User?: boolean | School$UserArgs<ExtArgs>
    _count?: boolean | SchoolCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CityDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    county?: boolean | CountyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type SchoolIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | CityDefaultArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    county?: boolean | CountyDefaultArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $SchoolPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "School"
    objects: {
      Contact: Prisma.$ContactPayload<ExtArgs>[]
      Event: Prisma.$EventPayload<ExtArgs>[]
      city: Prisma.$CityPayload<ExtArgs>
      country: Prisma.$CountryPayload<ExtArgs>
      county: Prisma.$CountyPayload<ExtArgs>
      region: Prisma.$RegionPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      school_id: number
      om_id: string | null
      school_name: string
      zip_code: string
      address: string
      dir_name: string | null
      dir_phone: string | null
      school_email: string
      website: string | null
      school_type: string[]
      coop: boolean | null
      note: string | null
      city_id: number
      country_id: number
      county_id: number
      region_id: number
      duty: string[]
      active: boolean
      active_by: string
      basic: boolean
      medior: boolean
      high: boolean
    }, ExtArgs["result"]["school"]>
    composites: {}
  }

  type SchoolGetPayload<S extends boolean | null | undefined | SchoolDefaultArgs> = $Result.GetResult<Prisma.$SchoolPayload, S>

  type SchoolCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SchoolFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SchoolCountAggregateInputType | true
    }

  export interface SchoolDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['School'], meta: { name: 'School' } }
    /**
     * Find zero or one School that matches the filter.
     * @param {SchoolFindUniqueArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SchoolFindUniqueArgs>(args: SelectSubset<T, SchoolFindUniqueArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one School that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SchoolFindUniqueOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SchoolFindUniqueOrThrowArgs>(args: SelectSubset<T, SchoolFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first School that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SchoolFindFirstArgs>(args?: SelectSubset<T, SchoolFindFirstArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first School that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindFirstOrThrowArgs} args - Arguments to find a School
     * @example
     * // Get one School
     * const school = await prisma.school.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SchoolFindFirstOrThrowArgs>(args?: SelectSubset<T, SchoolFindFirstOrThrowArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Schools that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Schools
     * const schools = await prisma.school.findMany()
     * 
     * // Get first 10 Schools
     * const schools = await prisma.school.findMany({ take: 10 })
     * 
     * // Only select the `school_id`
     * const schoolWithSchool_idOnly = await prisma.school.findMany({ select: { school_id: true } })
     * 
     */
    findMany<T extends SchoolFindManyArgs>(args?: SelectSubset<T, SchoolFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a School.
     * @param {SchoolCreateArgs} args - Arguments to create a School.
     * @example
     * // Create one School
     * const School = await prisma.school.create({
     *   data: {
     *     // ... data to create a School
     *   }
     * })
     * 
     */
    create<T extends SchoolCreateArgs>(args: SelectSubset<T, SchoolCreateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Schools.
     * @param {SchoolCreateManyArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SchoolCreateManyArgs>(args?: SelectSubset<T, SchoolCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Schools and returns the data saved in the database.
     * @param {SchoolCreateManyAndReturnArgs} args - Arguments to create many Schools.
     * @example
     * // Create many Schools
     * const school = await prisma.school.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Schools and only return the `school_id`
     * const schoolWithSchool_idOnly = await prisma.school.createManyAndReturn({
     *   select: { school_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SchoolCreateManyAndReturnArgs>(args?: SelectSubset<T, SchoolCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a School.
     * @param {SchoolDeleteArgs} args - Arguments to delete one School.
     * @example
     * // Delete one School
     * const School = await prisma.school.delete({
     *   where: {
     *     // ... filter to delete one School
     *   }
     * })
     * 
     */
    delete<T extends SchoolDeleteArgs>(args: SelectSubset<T, SchoolDeleteArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one School.
     * @param {SchoolUpdateArgs} args - Arguments to update one School.
     * @example
     * // Update one School
     * const school = await prisma.school.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SchoolUpdateArgs>(args: SelectSubset<T, SchoolUpdateArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Schools.
     * @param {SchoolDeleteManyArgs} args - Arguments to filter Schools to delete.
     * @example
     * // Delete a few Schools
     * const { count } = await prisma.school.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SchoolDeleteManyArgs>(args?: SelectSubset<T, SchoolDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SchoolUpdateManyArgs>(args: SelectSubset<T, SchoolUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Schools and returns the data updated in the database.
     * @param {SchoolUpdateManyAndReturnArgs} args - Arguments to update many Schools.
     * @example
     * // Update many Schools
     * const school = await prisma.school.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Schools and only return the `school_id`
     * const schoolWithSchool_idOnly = await prisma.school.updateManyAndReturn({
     *   select: { school_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SchoolUpdateManyAndReturnArgs>(args: SelectSubset<T, SchoolUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one School.
     * @param {SchoolUpsertArgs} args - Arguments to update or create a School.
     * @example
     * // Update or create a School
     * const school = await prisma.school.upsert({
     *   create: {
     *     // ... data to create a School
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the School we want to update
     *   }
     * })
     */
    upsert<T extends SchoolUpsertArgs>(args: SelectSubset<T, SchoolUpsertArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Schools.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolCountArgs} args - Arguments to filter Schools to count.
     * @example
     * // Count the number of Schools
     * const count = await prisma.school.count({
     *   where: {
     *     // ... the filter for the Schools we want to count
     *   }
     * })
    **/
    count<T extends SchoolCountArgs>(
      args?: Subset<T, SchoolCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SchoolCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SchoolAggregateArgs>(args: Subset<T, SchoolAggregateArgs>): Prisma.PrismaPromise<GetSchoolAggregateType<T>>

    /**
     * Group by School.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SchoolGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SchoolGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SchoolGroupByArgs['orderBy'] }
        : { orderBy?: SchoolGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SchoolGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSchoolGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the School model
   */
  readonly fields: SchoolFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for School.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SchoolClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Contact<T extends School$ContactArgs<ExtArgs> = {}>(args?: Subset<T, School$ContactArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    Event<T extends School$EventArgs<ExtArgs> = {}>(args?: Subset<T, School$EventArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    city<T extends CityDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CityDefaultArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountryDefaultArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    county<T extends CountyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountyDefaultArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    User<T extends School$UserArgs<ExtArgs> = {}>(args?: Subset<T, School$UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the School model
   */ 
  interface SchoolFieldRefs {
    readonly school_id: FieldRef<"School", 'Int'>
    readonly om_id: FieldRef<"School", 'String'>
    readonly school_name: FieldRef<"School", 'String'>
    readonly zip_code: FieldRef<"School", 'String'>
    readonly address: FieldRef<"School", 'String'>
    readonly dir_name: FieldRef<"School", 'String'>
    readonly dir_phone: FieldRef<"School", 'String'>
    readonly school_email: FieldRef<"School", 'String'>
    readonly website: FieldRef<"School", 'String'>
    readonly school_type: FieldRef<"School", 'String[]'>
    readonly coop: FieldRef<"School", 'Boolean'>
    readonly note: FieldRef<"School", 'String'>
    readonly city_id: FieldRef<"School", 'Int'>
    readonly country_id: FieldRef<"School", 'Int'>
    readonly county_id: FieldRef<"School", 'Int'>
    readonly region_id: FieldRef<"School", 'Int'>
    readonly duty: FieldRef<"School", 'String[]'>
    readonly active: FieldRef<"School", 'Boolean'>
    readonly active_by: FieldRef<"School", 'String'>
    readonly basic: FieldRef<"School", 'Boolean'>
    readonly medior: FieldRef<"School", 'Boolean'>
    readonly high: FieldRef<"School", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * School findUnique
   */
  export type SchoolFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findUniqueOrThrow
   */
  export type SchoolFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School findFirst
   */
  export type SchoolFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findFirstOrThrow
   */
  export type SchoolFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which School to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Schools.
     */
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School findMany
   */
  export type SchoolFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter, which Schools to fetch.
     */
    where?: SchoolWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Schools to fetch.
     */
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Schools.
     */
    cursor?: SchoolWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Schools from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Schools.
     */
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * School create
   */
  export type SchoolCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to create a School.
     */
    data: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
  }

  /**
   * School createMany
   */
  export type SchoolCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * School createManyAndReturn
   */
  export type SchoolCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to create many Schools.
     */
    data: SchoolCreateManyInput | SchoolCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * School update
   */
  export type SchoolUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The data needed to update a School.
     */
    data: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
    /**
     * Choose, which School to update.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School updateMany
   */
  export type SchoolUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
  }

  /**
   * School updateManyAndReturn
   */
  export type SchoolUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * The data used to update Schools.
     */
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyInput>
    /**
     * Filter which Schools to update
     */
    where?: SchoolWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * School upsert
   */
  export type SchoolUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * The filter to search for the School to update in case it exists.
     */
    where: SchoolWhereUniqueInput
    /**
     * In case the School found by the `where` argument doesn't exist, create a new School with this data.
     */
    create: XOR<SchoolCreateInput, SchoolUncheckedCreateInput>
    /**
     * In case the School was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SchoolUpdateInput, SchoolUncheckedUpdateInput>
  }

  /**
   * School delete
   */
  export type SchoolDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    /**
     * Filter which School to delete.
     */
    where: SchoolWhereUniqueInput
  }

  /**
   * School deleteMany
   */
  export type SchoolDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Schools to delete
     */
    where?: SchoolWhereInput
  }

  /**
   * School.Contact
   */
  export type School$ContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    cursor?: ContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * School.Event
   */
  export type School$EventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * School.User
   */
  export type School$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * School without action
   */
  export type SchoolDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
  }


  /**
   * Model Contact
   */

  export type AggregateContact = {
    _count: ContactCountAggregateOutputType | null
    _avg: ContactAvgAggregateOutputType | null
    _sum: ContactSumAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  export type ContactAvgAggregateOutputType = {
    contact_id: number | null
    school_id: number | null
  }

  export type ContactSumAggregateOutputType = {
    contact_id: number | null
    school_id: number | null
  }

  export type ContactMinAggregateOutputType = {
    contact_id: number | null
    contact_email: string | null
    contact_name: string | null
    contact_phone: string | null
    contact_note: string | null
    createdAt: Date | null
    active: boolean | null
    active_by: string | null
    school_id: number | null
  }

  export type ContactMaxAggregateOutputType = {
    contact_id: number | null
    contact_email: string | null
    contact_name: string | null
    contact_phone: string | null
    contact_note: string | null
    createdAt: Date | null
    active: boolean | null
    active_by: string | null
    school_id: number | null
  }

  export type ContactCountAggregateOutputType = {
    contact_id: number
    contact_email: number
    contact_name: number
    contact_phone: number
    contact_note: number
    createdAt: number
    active: number
    active_by: number
    school_id: number
    _all: number
  }


  export type ContactAvgAggregateInputType = {
    contact_id?: true
    school_id?: true
  }

  export type ContactSumAggregateInputType = {
    contact_id?: true
    school_id?: true
  }

  export type ContactMinAggregateInputType = {
    contact_id?: true
    contact_email?: true
    contact_name?: true
    contact_phone?: true
    contact_note?: true
    createdAt?: true
    active?: true
    active_by?: true
    school_id?: true
  }

  export type ContactMaxAggregateInputType = {
    contact_id?: true
    contact_email?: true
    contact_name?: true
    contact_phone?: true
    contact_note?: true
    createdAt?: true
    active?: true
    active_by?: true
    school_id?: true
  }

  export type ContactCountAggregateInputType = {
    contact_id?: true
    contact_email?: true
    contact_name?: true
    contact_phone?: true
    contact_note?: true
    createdAt?: true
    active?: true
    active_by?: true
    school_id?: true
    _all?: true
  }

  export type ContactAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contact to aggregate.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contacts
    **/
    _count?: true | ContactCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ContactAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ContactSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactMaxAggregateInputType
  }

  export type GetContactAggregateType<T extends ContactAggregateArgs> = {
        [P in keyof T & keyof AggregateContact]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContact[P]>
      : GetScalarType<T[P], AggregateContact[P]>
  }




  export type ContactGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithAggregationInput | ContactOrderByWithAggregationInput[]
    by: ContactScalarFieldEnum[] | ContactScalarFieldEnum
    having?: ContactScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactCountAggregateInputType | true
    _avg?: ContactAvgAggregateInputType
    _sum?: ContactSumAggregateInputType
    _min?: ContactMinAggregateInputType
    _max?: ContactMaxAggregateInputType
  }

  export type ContactGroupByOutputType = {
    contact_id: number
    contact_email: string
    contact_name: string | null
    contact_phone: string | null
    contact_note: string | null
    createdAt: Date
    active: boolean
    active_by: string
    school_id: number | null
    _count: ContactCountAggregateOutputType | null
    _avg: ContactAvgAggregateOutputType | null
    _sum: ContactSumAggregateOutputType | null
    _min: ContactMinAggregateOutputType | null
    _max: ContactMaxAggregateOutputType | null
  }

  type GetContactGroupByPayload<T extends ContactGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactGroupByOutputType[P]>
            : GetScalarType<T[P], ContactGroupByOutputType[P]>
        }
      >
    >


  export type ContactSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contact_id?: boolean
    contact_email?: boolean
    contact_name?: boolean
    contact_phone?: boolean
    contact_note?: boolean
    createdAt?: boolean
    active?: boolean
    active_by?: boolean
    school_id?: boolean
    School?: boolean | Contact$SchoolArgs<ExtArgs>
    User?: boolean | Contact$UserArgs<ExtArgs>
    _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contact_id?: boolean
    contact_email?: boolean
    contact_name?: boolean
    contact_phone?: boolean
    contact_note?: boolean
    createdAt?: boolean
    active?: boolean
    active_by?: boolean
    school_id?: boolean
    School?: boolean | Contact$SchoolArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    contact_id?: boolean
    contact_email?: boolean
    contact_name?: boolean
    contact_phone?: boolean
    contact_note?: boolean
    createdAt?: boolean
    active?: boolean
    active_by?: boolean
    school_id?: boolean
    School?: boolean | Contact$SchoolArgs<ExtArgs>
  }, ExtArgs["result"]["contact"]>

  export type ContactSelectScalar = {
    contact_id?: boolean
    contact_email?: boolean
    contact_name?: boolean
    contact_phone?: boolean
    contact_note?: boolean
    createdAt?: boolean
    active?: boolean
    active_by?: boolean
    school_id?: boolean
  }

  export type ContactOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"contact_id" | "contact_email" | "contact_name" | "contact_phone" | "contact_note" | "createdAt" | "active" | "active_by" | "school_id", ExtArgs["result"]["contact"]>
  export type ContactInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | Contact$SchoolArgs<ExtArgs>
    User?: boolean | Contact$UserArgs<ExtArgs>
    _count?: boolean | ContactCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ContactIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | Contact$SchoolArgs<ExtArgs>
  }
  export type ContactIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | Contact$SchoolArgs<ExtArgs>
  }

  export type $ContactPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contact"
    objects: {
      School: Prisma.$SchoolPayload<ExtArgs> | null
      User: Prisma.$UserPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      contact_id: number
      contact_email: string
      contact_name: string | null
      contact_phone: string | null
      contact_note: string | null
      createdAt: Date
      active: boolean
      active_by: string
      school_id: number | null
    }, ExtArgs["result"]["contact"]>
    composites: {}
  }

  type ContactGetPayload<S extends boolean | null | undefined | ContactDefaultArgs> = $Result.GetResult<Prisma.$ContactPayload, S>

  type ContactCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactCountAggregateInputType | true
    }

  export interface ContactDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contact'], meta: { name: 'Contact' } }
    /**
     * Find zero or one Contact that matches the filter.
     * @param {ContactFindUniqueArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactFindUniqueArgs>(args: SelectSubset<T, ContactFindUniqueArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Contact that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactFindUniqueOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Contact that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactFindFirstArgs>(args?: SelectSubset<T, ContactFindFirstArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Contact that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindFirstOrThrowArgs} args - Arguments to find a Contact
     * @example
     * // Get one Contact
     * const contact = await prisma.contact.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Contacts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contacts
     * const contacts = await prisma.contact.findMany()
     * 
     * // Get first 10 Contacts
     * const contacts = await prisma.contact.findMany({ take: 10 })
     * 
     * // Only select the `contact_id`
     * const contactWithContact_idOnly = await prisma.contact.findMany({ select: { contact_id: true } })
     * 
     */
    findMany<T extends ContactFindManyArgs>(args?: SelectSubset<T, ContactFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Contact.
     * @param {ContactCreateArgs} args - Arguments to create a Contact.
     * @example
     * // Create one Contact
     * const Contact = await prisma.contact.create({
     *   data: {
     *     // ... data to create a Contact
     *   }
     * })
     * 
     */
    create<T extends ContactCreateArgs>(args: SelectSubset<T, ContactCreateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Contacts.
     * @param {ContactCreateManyArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactCreateManyArgs>(args?: SelectSubset<T, ContactCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contacts and returns the data saved in the database.
     * @param {ContactCreateManyAndReturnArgs} args - Arguments to create many Contacts.
     * @example
     * // Create many Contacts
     * const contact = await prisma.contact.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contacts and only return the `contact_id`
     * const contactWithContact_idOnly = await prisma.contact.createManyAndReturn({
     *   select: { contact_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Contact.
     * @param {ContactDeleteArgs} args - Arguments to delete one Contact.
     * @example
     * // Delete one Contact
     * const Contact = await prisma.contact.delete({
     *   where: {
     *     // ... filter to delete one Contact
     *   }
     * })
     * 
     */
    delete<T extends ContactDeleteArgs>(args: SelectSubset<T, ContactDeleteArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Contact.
     * @param {ContactUpdateArgs} args - Arguments to update one Contact.
     * @example
     * // Update one Contact
     * const contact = await prisma.contact.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactUpdateArgs>(args: SelectSubset<T, ContactUpdateArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Contacts.
     * @param {ContactDeleteManyArgs} args - Arguments to filter Contacts to delete.
     * @example
     * // Delete a few Contacts
     * const { count } = await prisma.contact.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactDeleteManyArgs>(args?: SelectSubset<T, ContactDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactUpdateManyArgs>(args: SelectSubset<T, ContactUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contacts and returns the data updated in the database.
     * @param {ContactUpdateManyAndReturnArgs} args - Arguments to update many Contacts.
     * @example
     * // Update many Contacts
     * const contact = await prisma.contact.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contacts and only return the `contact_id`
     * const contactWithContact_idOnly = await prisma.contact.updateManyAndReturn({
     *   select: { contact_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Contact.
     * @param {ContactUpsertArgs} args - Arguments to update or create a Contact.
     * @example
     * // Update or create a Contact
     * const contact = await prisma.contact.upsert({
     *   create: {
     *     // ... data to create a Contact
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contact we want to update
     *   }
     * })
     */
    upsert<T extends ContactUpsertArgs>(args: SelectSubset<T, ContactUpsertArgs<ExtArgs>>): Prisma__ContactClient<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Contacts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactCountArgs} args - Arguments to filter Contacts to count.
     * @example
     * // Count the number of Contacts
     * const count = await prisma.contact.count({
     *   where: {
     *     // ... the filter for the Contacts we want to count
     *   }
     * })
    **/
    count<T extends ContactCountArgs>(
      args?: Subset<T, ContactCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactAggregateArgs>(args: Subset<T, ContactAggregateArgs>): Prisma.PrismaPromise<GetContactAggregateType<T>>

    /**
     * Group by Contact.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactGroupByArgs['orderBy'] }
        : { orderBy?: ContactGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contact model
   */
  readonly fields: ContactFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contact.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    School<T extends Contact$SchoolArgs<ExtArgs> = {}>(args?: Subset<T, Contact$SchoolArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | null, null, ExtArgs, ClientOptions>
    User<T extends Contact$UserArgs<ExtArgs> = {}>(args?: Subset<T, Contact$UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contact model
   */ 
  interface ContactFieldRefs {
    readonly contact_id: FieldRef<"Contact", 'Int'>
    readonly contact_email: FieldRef<"Contact", 'String'>
    readonly contact_name: FieldRef<"Contact", 'String'>
    readonly contact_phone: FieldRef<"Contact", 'String'>
    readonly contact_note: FieldRef<"Contact", 'String'>
    readonly createdAt: FieldRef<"Contact", 'DateTime'>
    readonly active: FieldRef<"Contact", 'Boolean'>
    readonly active_by: FieldRef<"Contact", 'String'>
    readonly school_id: FieldRef<"Contact", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Contact findUnique
   */
  export type ContactFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findUniqueOrThrow
   */
  export type ContactFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact findFirst
   */
  export type ContactFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findFirstOrThrow
   */
  export type ContactFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contact to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contacts.
     */
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact findMany
   */
  export type ContactFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter, which Contacts to fetch.
     */
    where?: ContactWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contacts to fetch.
     */
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contacts.
     */
    cursor?: ContactWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contacts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contacts.
     */
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * Contact create
   */
  export type ContactCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to create a Contact.
     */
    data: XOR<ContactCreateInput, ContactUncheckedCreateInput>
  }

  /**
   * Contact createMany
   */
  export type ContactCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contact createManyAndReturn
   */
  export type ContactCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to create many Contacts.
     */
    data: ContactCreateManyInput | ContactCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact update
   */
  export type ContactUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The data needed to update a Contact.
     */
    data: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
    /**
     * Choose, which Contact to update.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact updateMany
   */
  export type ContactUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
  }

  /**
   * Contact updateManyAndReturn
   */
  export type ContactUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * The data used to update Contacts.
     */
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyInput>
    /**
     * Filter which Contacts to update
     */
    where?: ContactWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Contact upsert
   */
  export type ContactUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * The filter to search for the Contact to update in case it exists.
     */
    where: ContactWhereUniqueInput
    /**
     * In case the Contact found by the `where` argument doesn't exist, create a new Contact with this data.
     */
    create: XOR<ContactCreateInput, ContactUncheckedCreateInput>
    /**
     * In case the Contact was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactUpdateInput, ContactUncheckedUpdateInput>
  }

  /**
   * Contact delete
   */
  export type ContactDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    /**
     * Filter which Contact to delete.
     */
    where: ContactWhereUniqueInput
  }

  /**
   * Contact deleteMany
   */
  export type ContactDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacts to delete
     */
    where?: ContactWhereInput
  }

  /**
   * Contact.School
   */
  export type Contact$SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
  }

  /**
   * Contact.User
   */
  export type Contact$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Contact without action
   */
  export type ContactDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    on_duty: number | null
  }

  export type UserSumAggregateOutputType = {
    on_duty: number[]
  }

  export type UserMinAggregateOutputType = {
    user_id: string | null
    user_name: string | null
    nationality: string | null
    user_phone: string | null
    user_email: string | null
    passwordHash: string | null
    userAuthToken: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    active: boolean | null
    active_by: string | null
  }

  export type UserMaxAggregateOutputType = {
    user_id: string | null
    user_name: string | null
    nationality: string | null
    user_phone: string | null
    user_email: string | null
    passwordHash: string | null
    userAuthToken: string | null
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date | null
    updatedAt: Date | null
    active: boolean | null
    active_by: string | null
  }

  export type UserCountAggregateOutputType = {
    user_id: number
    user_name: number
    nationality: number
    user_phone: number
    user_email: number
    on_duty: number
    passwordHash: number
    userAuthToken: number
    resetToken: number
    resetTokenExpiry: number
    createdAt: number
    updatedAt: number
    active: number
    active_by: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    on_duty?: true
  }

  export type UserSumAggregateInputType = {
    on_duty?: true
  }

  export type UserMinAggregateInputType = {
    user_id?: true
    user_name?: true
    nationality?: true
    user_phone?: true
    user_email?: true
    passwordHash?: true
    userAuthToken?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    active?: true
    active_by?: true
  }

  export type UserMaxAggregateInputType = {
    user_id?: true
    user_name?: true
    nationality?: true
    user_phone?: true
    user_email?: true
    passwordHash?: true
    userAuthToken?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    active?: true
    active_by?: true
  }

  export type UserCountAggregateInputType = {
    user_id?: true
    user_name?: true
    nationality?: true
    user_phone?: true
    user_email?: true
    on_duty?: true
    passwordHash?: true
    userAuthToken?: true
    resetToken?: true
    resetTokenExpiry?: true
    createdAt?: true
    updatedAt?: true
    active?: true
    active_by?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    user_id: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty: number[]
    passwordHash: string
    userAuthToken: string
    resetToken: string | null
    resetTokenExpiry: Date | null
    createdAt: Date
    updatedAt: Date
    active: boolean
    active_by: string
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    user_name?: boolean
    nationality?: boolean
    user_phone?: boolean
    user_email?: boolean
    on_duty?: boolean
    passwordHash?: boolean
    userAuthToken?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    active?: boolean
    active_by?: boolean
    Contact?: boolean | User$ContactArgs<ExtArgs>
    Event?: boolean | User$EventArgs<ExtArgs>
    School?: boolean | User$SchoolArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    user_name?: boolean
    nationality?: boolean
    user_phone?: boolean
    user_email?: boolean
    on_duty?: boolean
    passwordHash?: boolean
    userAuthToken?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    active?: boolean
    active_by?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    user_id?: boolean
    user_name?: boolean
    nationality?: boolean
    user_phone?: boolean
    user_email?: boolean
    on_duty?: boolean
    passwordHash?: boolean
    userAuthToken?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    active?: boolean
    active_by?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    user_id?: boolean
    user_name?: boolean
    nationality?: boolean
    user_phone?: boolean
    user_email?: boolean
    on_duty?: boolean
    passwordHash?: boolean
    userAuthToken?: boolean
    resetToken?: boolean
    resetTokenExpiry?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    active?: boolean
    active_by?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"user_id" | "user_name" | "nationality" | "user_phone" | "user_email" | "on_duty" | "passwordHash" | "userAuthToken" | "resetToken" | "resetTokenExpiry" | "createdAt" | "updatedAt" | "active" | "active_by", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Contact?: boolean | User$ContactArgs<ExtArgs>
    Event?: boolean | User$EventArgs<ExtArgs>
    School?: boolean | User$SchoolArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Contact: Prisma.$ContactPayload<ExtArgs>[]
      Event: Prisma.$EventPayload<ExtArgs>[]
      School: Prisma.$SchoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      user_id: string
      user_name: string
      nationality: string
      user_phone: string
      user_email: string
      on_duty: number[]
      passwordHash: string
      userAuthToken: string
      resetToken: string | null
      resetTokenExpiry: Date | null
      createdAt: Date
      updatedAt: Date
      active: boolean
      active_by: string
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `user_id`
     * const userWithUser_idOnly = await prisma.user.findMany({ select: { user_id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.createManyAndReturn({
     *   select: { user_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `user_id`
     * const userWithUser_idOnly = await prisma.user.updateManyAndReturn({
     *   select: { user_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Contact<T extends User$ContactArgs<ExtArgs> = {}>(args?: Subset<T, User$ContactArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    Event<T extends User$EventArgs<ExtArgs> = {}>(args?: Subset<T, User$EventArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    School<T extends User$SchoolArgs<ExtArgs> = {}>(args?: Subset<T, User$SchoolArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly user_id: FieldRef<"User", 'String'>
    readonly user_name: FieldRef<"User", 'String'>
    readonly nationality: FieldRef<"User", 'String'>
    readonly user_phone: FieldRef<"User", 'String'>
    readonly user_email: FieldRef<"User", 'String'>
    readonly on_duty: FieldRef<"User", 'Int[]'>
    readonly passwordHash: FieldRef<"User", 'String'>
    readonly userAuthToken: FieldRef<"User", 'String'>
    readonly resetToken: FieldRef<"User", 'String'>
    readonly resetTokenExpiry: FieldRef<"User", 'DateTime'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
    readonly active: FieldRef<"User", 'Boolean'>
    readonly active_by: FieldRef<"User", 'String'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.Contact
   */
  export type User$ContactArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contact
     */
    select?: ContactSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contact
     */
    omit?: ContactOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ContactInclude<ExtArgs> | null
    where?: ContactWhereInput
    orderBy?: ContactOrderByWithRelationInput | ContactOrderByWithRelationInput[]
    cursor?: ContactWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ContactScalarFieldEnum | ContactScalarFieldEnum[]
  }

  /**
   * User.Event
   */
  export type User$EventArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    where?: EventWhereInput
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    cursor?: EventWhereUniqueInput
    take?: number
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * User.School
   */
  export type User$SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    cursor?: SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Event
   */

  export type AggregateEvent = {
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  export type EventAvgAggregateOutputType = {
    event_id: number | null
    event_year: number | null
    estimated_student: number | null
    school_id: number | null
  }

  export type EventSumAggregateOutputType = {
    event_id: number | null
    event_year: number | null
    estimated_student: number | null
    school_id: number | null
  }

  export type EventMinAggregateOutputType = {
    event_id: number | null
    event_name: string | null
    create_date: Date | null
    closing_date: Date | null
    event_year: number | null
    semester: string | null
    on_duty: string | null
    event_type: string | null
    estimated_student: number | null
    note: string | null
    slug: string | null
    school_id: number | null
  }

  export type EventMaxAggregateOutputType = {
    event_id: number | null
    event_name: string | null
    create_date: Date | null
    closing_date: Date | null
    event_year: number | null
    semester: string | null
    on_duty: string | null
    event_type: string | null
    estimated_student: number | null
    note: string | null
    slug: string | null
    school_id: number | null
  }

  export type EventCountAggregateOutputType = {
    event_id: number
    event_name: number
    create_date: number
    closing_date: number
    event_year: number
    semester: number
    on_duty: number
    event_type: number
    estimated_student: number
    note: number
    slug: number
    school_id: number
    _all: number
  }


  export type EventAvgAggregateInputType = {
    event_id?: true
    event_year?: true
    estimated_student?: true
    school_id?: true
  }

  export type EventSumAggregateInputType = {
    event_id?: true
    event_year?: true
    estimated_student?: true
    school_id?: true
  }

  export type EventMinAggregateInputType = {
    event_id?: true
    event_name?: true
    create_date?: true
    closing_date?: true
    event_year?: true
    semester?: true
    on_duty?: true
    event_type?: true
    estimated_student?: true
    note?: true
    slug?: true
    school_id?: true
  }

  export type EventMaxAggregateInputType = {
    event_id?: true
    event_name?: true
    create_date?: true
    closing_date?: true
    event_year?: true
    semester?: true
    on_duty?: true
    event_type?: true
    estimated_student?: true
    note?: true
    slug?: true
    school_id?: true
  }

  export type EventCountAggregateInputType = {
    event_id?: true
    event_name?: true
    create_date?: true
    closing_date?: true
    event_year?: true
    semester?: true
    on_duty?: true
    event_type?: true
    estimated_student?: true
    note?: true
    slug?: true
    school_id?: true
    _all?: true
  }

  export type EventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Event to aggregate.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Events
    **/
    _count?: true | EventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EventMaxAggregateInputType
  }

  export type GetEventAggregateType<T extends EventAggregateArgs> = {
        [P in keyof T & keyof AggregateEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEvent[P]>
      : GetScalarType<T[P], AggregateEvent[P]>
  }




  export type EventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EventWhereInput
    orderBy?: EventOrderByWithAggregationInput | EventOrderByWithAggregationInput[]
    by: EventScalarFieldEnum[] | EventScalarFieldEnum
    having?: EventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EventCountAggregateInputType | true
    _avg?: EventAvgAggregateInputType
    _sum?: EventSumAggregateInputType
    _min?: EventMinAggregateInputType
    _max?: EventMaxAggregateInputType
  }

  export type EventGroupByOutputType = {
    event_id: number
    event_name: string
    create_date: Date
    closing_date: Date
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note: string | null
    slug: string
    school_id: number
    _count: EventCountAggregateOutputType | null
    _avg: EventAvgAggregateOutputType | null
    _sum: EventSumAggregateOutputType | null
    _min: EventMinAggregateOutputType | null
    _max: EventMaxAggregateOutputType | null
  }

  type GetEventGroupByPayload<T extends EventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EventGroupByOutputType[P]>
            : GetScalarType<T[P], EventGroupByOutputType[P]>
        }
      >
    >


  export type EventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    event_id?: boolean
    event_name?: boolean
    create_date?: boolean
    closing_date?: boolean
    event_year?: boolean
    semester?: boolean
    on_duty?: boolean
    event_type?: boolean
    estimated_student?: boolean
    note?: boolean
    slug?: boolean
    school_id?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
    User?: boolean | Event$UserArgs<ExtArgs>
    InterestedStudents?: boolean | Event$InterestedStudentsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    event_id?: boolean
    event_name?: boolean
    create_date?: boolean
    closing_date?: boolean
    event_year?: boolean
    semester?: boolean
    on_duty?: boolean
    event_type?: boolean
    estimated_student?: boolean
    note?: boolean
    slug?: boolean
    school_id?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    event_id?: boolean
    event_name?: boolean
    create_date?: boolean
    closing_date?: boolean
    event_year?: boolean
    semester?: boolean
    on_duty?: boolean
    event_type?: boolean
    estimated_student?: boolean
    note?: boolean
    slug?: boolean
    school_id?: boolean
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["event"]>

  export type EventSelectScalar = {
    event_id?: boolean
    event_name?: boolean
    create_date?: boolean
    closing_date?: boolean
    event_year?: boolean
    semester?: boolean
    on_duty?: boolean
    event_type?: boolean
    estimated_student?: boolean
    note?: boolean
    slug?: boolean
    school_id?: boolean
  }

  export type EventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"event_id" | "event_name" | "create_date" | "closing_date" | "event_year" | "semester" | "on_duty" | "event_type" | "estimated_student" | "note" | "slug" | "school_id", ExtArgs["result"]["event"]>
  export type EventInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
    User?: boolean | Event$UserArgs<ExtArgs>
    InterestedStudents?: boolean | Event$InterestedStudentsArgs<ExtArgs>
    _count?: boolean | EventCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EventIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }
  export type EventIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    School?: boolean | SchoolDefaultArgs<ExtArgs>
  }

  export type $EventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Event"
    objects: {
      School: Prisma.$SchoolPayload<ExtArgs>
      User: Prisma.$UserPayload<ExtArgs>[]
      InterestedStudents: Prisma.$InterestedStudentsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      event_id: number
      event_name: string
      create_date: Date
      closing_date: Date
      event_year: number
      semester: string
      on_duty: string
      event_type: string
      estimated_student: number
      note: string | null
      slug: string
      school_id: number
    }, ExtArgs["result"]["event"]>
    composites: {}
  }

  type EventGetPayload<S extends boolean | null | undefined | EventDefaultArgs> = $Result.GetResult<Prisma.$EventPayload, S>

  type EventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EventCountAggregateInputType | true
    }

  export interface EventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Event'], meta: { name: 'Event' } }
    /**
     * Find zero or one Event that matches the filter.
     * @param {EventFindUniqueArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EventFindUniqueArgs>(args: SelectSubset<T, EventFindUniqueArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Event that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EventFindUniqueOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EventFindUniqueOrThrowArgs>(args: SelectSubset<T, EventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Event that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EventFindFirstArgs>(args?: SelectSubset<T, EventFindFirstArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Event that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindFirstOrThrowArgs} args - Arguments to find a Event
     * @example
     * // Get one Event
     * const event = await prisma.event.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EventFindFirstOrThrowArgs>(args?: SelectSubset<T, EventFindFirstOrThrowArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Events that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Events
     * const events = await prisma.event.findMany()
     * 
     * // Get first 10 Events
     * const events = await prisma.event.findMany({ take: 10 })
     * 
     * // Only select the `event_id`
     * const eventWithEvent_idOnly = await prisma.event.findMany({ select: { event_id: true } })
     * 
     */
    findMany<T extends EventFindManyArgs>(args?: SelectSubset<T, EventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Event.
     * @param {EventCreateArgs} args - Arguments to create a Event.
     * @example
     * // Create one Event
     * const Event = await prisma.event.create({
     *   data: {
     *     // ... data to create a Event
     *   }
     * })
     * 
     */
    create<T extends EventCreateArgs>(args: SelectSubset<T, EventCreateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Events.
     * @param {EventCreateManyArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EventCreateManyArgs>(args?: SelectSubset<T, EventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Events and returns the data saved in the database.
     * @param {EventCreateManyAndReturnArgs} args - Arguments to create many Events.
     * @example
     * // Create many Events
     * const event = await prisma.event.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Events and only return the `event_id`
     * const eventWithEvent_idOnly = await prisma.event.createManyAndReturn({
     *   select: { event_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EventCreateManyAndReturnArgs>(args?: SelectSubset<T, EventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Event.
     * @param {EventDeleteArgs} args - Arguments to delete one Event.
     * @example
     * // Delete one Event
     * const Event = await prisma.event.delete({
     *   where: {
     *     // ... filter to delete one Event
     *   }
     * })
     * 
     */
    delete<T extends EventDeleteArgs>(args: SelectSubset<T, EventDeleteArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Event.
     * @param {EventUpdateArgs} args - Arguments to update one Event.
     * @example
     * // Update one Event
     * const event = await prisma.event.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EventUpdateArgs>(args: SelectSubset<T, EventUpdateArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Events.
     * @param {EventDeleteManyArgs} args - Arguments to filter Events to delete.
     * @example
     * // Delete a few Events
     * const { count } = await prisma.event.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EventDeleteManyArgs>(args?: SelectSubset<T, EventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EventUpdateManyArgs>(args: SelectSubset<T, EventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Events and returns the data updated in the database.
     * @param {EventUpdateManyAndReturnArgs} args - Arguments to update many Events.
     * @example
     * // Update many Events
     * const event = await prisma.event.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Events and only return the `event_id`
     * const eventWithEvent_idOnly = await prisma.event.updateManyAndReturn({
     *   select: { event_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends EventUpdateManyAndReturnArgs>(args: SelectSubset<T, EventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Event.
     * @param {EventUpsertArgs} args - Arguments to update or create a Event.
     * @example
     * // Update or create a Event
     * const event = await prisma.event.upsert({
     *   create: {
     *     // ... data to create a Event
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Event we want to update
     *   }
     * })
     */
    upsert<T extends EventUpsertArgs>(args: SelectSubset<T, EventUpsertArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Events.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventCountArgs} args - Arguments to filter Events to count.
     * @example
     * // Count the number of Events
     * const count = await prisma.event.count({
     *   where: {
     *     // ... the filter for the Events we want to count
     *   }
     * })
    **/
    count<T extends EventCountArgs>(
      args?: Subset<T, EventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EventAggregateArgs>(args: Subset<T, EventAggregateArgs>): Prisma.PrismaPromise<GetEventAggregateType<T>>

    /**
     * Group by Event.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EventGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EventGroupByArgs['orderBy'] }
        : { orderBy?: EventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Event model
   */
  readonly fields: EventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Event.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    School<T extends SchoolDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SchoolDefaultArgs<ExtArgs>>): Prisma__SchoolClient<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    User<T extends Event$UserArgs<ExtArgs> = {}>(args?: Subset<T, Event$UserArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    InterestedStudents<T extends Event$InterestedStudentsArgs<ExtArgs> = {}>(args?: Subset<T, Event$InterestedStudentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Event model
   */ 
  interface EventFieldRefs {
    readonly event_id: FieldRef<"Event", 'Int'>
    readonly event_name: FieldRef<"Event", 'String'>
    readonly create_date: FieldRef<"Event", 'DateTime'>
    readonly closing_date: FieldRef<"Event", 'DateTime'>
    readonly event_year: FieldRef<"Event", 'Int'>
    readonly semester: FieldRef<"Event", 'String'>
    readonly on_duty: FieldRef<"Event", 'String'>
    readonly event_type: FieldRef<"Event", 'String'>
    readonly estimated_student: FieldRef<"Event", 'Int'>
    readonly note: FieldRef<"Event", 'String'>
    readonly slug: FieldRef<"Event", 'String'>
    readonly school_id: FieldRef<"Event", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Event findUnique
   */
  export type EventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findUniqueOrThrow
   */
  export type EventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event findFirst
   */
  export type EventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findFirstOrThrow
   */
  export type EventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Event to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Events.
     */
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event findMany
   */
  export type EventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter, which Events to fetch.
     */
    where?: EventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Events to fetch.
     */
    orderBy?: EventOrderByWithRelationInput | EventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Events.
     */
    cursor?: EventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Events from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Events.
     */
    skip?: number
    distinct?: EventScalarFieldEnum | EventScalarFieldEnum[]
  }

  /**
   * Event create
   */
  export type EventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to create a Event.
     */
    data: XOR<EventCreateInput, EventUncheckedCreateInput>
  }

  /**
   * Event createMany
   */
  export type EventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Event createManyAndReturn
   */
  export type EventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to create many Events.
     */
    data: EventCreateManyInput | EventCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event update
   */
  export type EventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The data needed to update a Event.
     */
    data: XOR<EventUpdateInput, EventUncheckedUpdateInput>
    /**
     * Choose, which Event to update.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event updateMany
   */
  export type EventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
  }

  /**
   * Event updateManyAndReturn
   */
  export type EventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * The data used to update Events.
     */
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyInput>
    /**
     * Filter which Events to update
     */
    where?: EventWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Event upsert
   */
  export type EventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * The filter to search for the Event to update in case it exists.
     */
    where: EventWhereUniqueInput
    /**
     * In case the Event found by the `where` argument doesn't exist, create a new Event with this data.
     */
    create: XOR<EventCreateInput, EventUncheckedCreateInput>
    /**
     * In case the Event was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EventUpdateInput, EventUncheckedUpdateInput>
  }

  /**
   * Event delete
   */
  export type EventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
    /**
     * Filter which Event to delete.
     */
    where: EventWhereUniqueInput
  }

  /**
   * Event deleteMany
   */
  export type EventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Events to delete
     */
    where?: EventWhereInput
  }

  /**
   * Event.User
   */
  export type Event$UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    cursor?: UserWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * Event.InterestedStudents
   */
  export type Event$InterestedStudentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    where?: InterestedStudentsWhereInput
    orderBy?: InterestedStudentsOrderByWithRelationInput | InterestedStudentsOrderByWithRelationInput[]
    cursor?: InterestedStudentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterestedStudentsScalarFieldEnum | InterestedStudentsScalarFieldEnum[]
  }

  /**
   * Event without action
   */
  export type EventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Event
     */
    select?: EventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Event
     */
    omit?: EventOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EventInclude<ExtArgs> | null
  }


  /**
   * Model InterestedStudents
   */

  export type AggregateInterestedStudents = {
    _count: InterestedStudentsCountAggregateOutputType | null
    _avg: InterestedStudentsAvgAggregateOutputType | null
    _sum: InterestedStudentsSumAggregateOutputType | null
    _min: InterestedStudentsMinAggregateOutputType | null
    _max: InterestedStudentsMaxAggregateOutputType | null
  }

  export type InterestedStudentsAvgAggregateOutputType = {
    intrest_id: number | null
    event_id: number | null
    intrest_count: number | null
    country_id: number | null
    region_id: number | null
  }

  export type InterestedStudentsSumAggregateOutputType = {
    intrest_id: number | null
    event_id: number | null
    intrest_count: number | null
    country_id: number | null
    region_id: number | null
  }

  export type InterestedStudentsMinAggregateOutputType = {
    intrest_id: number | null
    event_id: number | null
    intrest_count: number | null
    grade: string | null
    applied: boolean | null
    work_title: string | null
    channel: string | null
    status: string | null
    country_id: number | null
    region_id: number | null
  }

  export type InterestedStudentsMaxAggregateOutputType = {
    intrest_id: number | null
    event_id: number | null
    intrest_count: number | null
    grade: string | null
    applied: boolean | null
    work_title: string | null
    channel: string | null
    status: string | null
    country_id: number | null
    region_id: number | null
  }

  export type InterestedStudentsCountAggregateOutputType = {
    intrest_id: number
    event_id: number
    intrest_count: number
    grade: number
    applied: number
    work_title: number
    channel: number
    status: number
    country_id: number
    region_id: number
    _all: number
  }


  export type InterestedStudentsAvgAggregateInputType = {
    intrest_id?: true
    event_id?: true
    intrest_count?: true
    country_id?: true
    region_id?: true
  }

  export type InterestedStudentsSumAggregateInputType = {
    intrest_id?: true
    event_id?: true
    intrest_count?: true
    country_id?: true
    region_id?: true
  }

  export type InterestedStudentsMinAggregateInputType = {
    intrest_id?: true
    event_id?: true
    intrest_count?: true
    grade?: true
    applied?: true
    work_title?: true
    channel?: true
    status?: true
    country_id?: true
    region_id?: true
  }

  export type InterestedStudentsMaxAggregateInputType = {
    intrest_id?: true
    event_id?: true
    intrest_count?: true
    grade?: true
    applied?: true
    work_title?: true
    channel?: true
    status?: true
    country_id?: true
    region_id?: true
  }

  export type InterestedStudentsCountAggregateInputType = {
    intrest_id?: true
    event_id?: true
    intrest_count?: true
    grade?: true
    applied?: true
    work_title?: true
    channel?: true
    status?: true
    country_id?: true
    region_id?: true
    _all?: true
  }

  export type InterestedStudentsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterestedStudents to aggregate.
     */
    where?: InterestedStudentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestedStudents to fetch.
     */
    orderBy?: InterestedStudentsOrderByWithRelationInput | InterestedStudentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InterestedStudentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestedStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestedStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned InterestedStudents
    **/
    _count?: true | InterestedStudentsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InterestedStudentsAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InterestedStudentsSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InterestedStudentsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InterestedStudentsMaxAggregateInputType
  }

  export type GetInterestedStudentsAggregateType<T extends InterestedStudentsAggregateArgs> = {
        [P in keyof T & keyof AggregateInterestedStudents]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInterestedStudents[P]>
      : GetScalarType<T[P], AggregateInterestedStudents[P]>
  }




  export type InterestedStudentsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InterestedStudentsWhereInput
    orderBy?: InterestedStudentsOrderByWithAggregationInput | InterestedStudentsOrderByWithAggregationInput[]
    by: InterestedStudentsScalarFieldEnum[] | InterestedStudentsScalarFieldEnum
    having?: InterestedStudentsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InterestedStudentsCountAggregateInputType | true
    _avg?: InterestedStudentsAvgAggregateInputType
    _sum?: InterestedStudentsSumAggregateInputType
    _min?: InterestedStudentsMinAggregateInputType
    _max?: InterestedStudentsMaxAggregateInputType
  }

  export type InterestedStudentsGroupByOutputType = {
    intrest_id: number
    event_id: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    country_id: number
    region_id: number
    _count: InterestedStudentsCountAggregateOutputType | null
    _avg: InterestedStudentsAvgAggregateOutputType | null
    _sum: InterestedStudentsSumAggregateOutputType | null
    _min: InterestedStudentsMinAggregateOutputType | null
    _max: InterestedStudentsMaxAggregateOutputType | null
  }

  type GetInterestedStudentsGroupByPayload<T extends InterestedStudentsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InterestedStudentsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InterestedStudentsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InterestedStudentsGroupByOutputType[P]>
            : GetScalarType<T[P], InterestedStudentsGroupByOutputType[P]>
        }
      >
    >


  export type InterestedStudentsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    intrest_id?: boolean
    event_id?: boolean
    intrest_count?: boolean
    grade?: boolean
    applied?: boolean
    work_title?: boolean
    channel?: boolean
    status?: boolean
    country_id?: boolean
    region_id?: boolean
    Country?: boolean | CountryDefaultArgs<ExtArgs>
    Event?: boolean | EventDefaultArgs<ExtArgs>
    Region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interestedStudents"]>

  export type InterestedStudentsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    intrest_id?: boolean
    event_id?: boolean
    intrest_count?: boolean
    grade?: boolean
    applied?: boolean
    work_title?: boolean
    channel?: boolean
    status?: boolean
    country_id?: boolean
    region_id?: boolean
    Country?: boolean | CountryDefaultArgs<ExtArgs>
    Event?: boolean | EventDefaultArgs<ExtArgs>
    Region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interestedStudents"]>

  export type InterestedStudentsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    intrest_id?: boolean
    event_id?: boolean
    intrest_count?: boolean
    grade?: boolean
    applied?: boolean
    work_title?: boolean
    channel?: boolean
    status?: boolean
    country_id?: boolean
    region_id?: boolean
    Country?: boolean | CountryDefaultArgs<ExtArgs>
    Event?: boolean | EventDefaultArgs<ExtArgs>
    Region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["interestedStudents"]>

  export type InterestedStudentsSelectScalar = {
    intrest_id?: boolean
    event_id?: boolean
    intrest_count?: boolean
    grade?: boolean
    applied?: boolean
    work_title?: boolean
    channel?: boolean
    status?: boolean
    country_id?: boolean
    region_id?: boolean
  }

  export type InterestedStudentsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"intrest_id" | "event_id" | "intrest_count" | "grade" | "applied" | "work_title" | "channel" | "status" | "country_id" | "region_id", ExtArgs["result"]["interestedStudents"]>
  export type InterestedStudentsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Country?: boolean | CountryDefaultArgs<ExtArgs>
    Event?: boolean | EventDefaultArgs<ExtArgs>
    Region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type InterestedStudentsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Country?: boolean | CountryDefaultArgs<ExtArgs>
    Event?: boolean | EventDefaultArgs<ExtArgs>
    Region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type InterestedStudentsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Country?: boolean | CountryDefaultArgs<ExtArgs>
    Event?: boolean | EventDefaultArgs<ExtArgs>
    Region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $InterestedStudentsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "InterestedStudents"
    objects: {
      Country: Prisma.$CountryPayload<ExtArgs>
      Event: Prisma.$EventPayload<ExtArgs>
      Region: Prisma.$RegionPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      intrest_id: number
      event_id: number
      intrest_count: number
      grade: string
      applied: boolean
      work_title: string
      channel: string
      status: string
      country_id: number
      region_id: number
    }, ExtArgs["result"]["interestedStudents"]>
    composites: {}
  }

  type InterestedStudentsGetPayload<S extends boolean | null | undefined | InterestedStudentsDefaultArgs> = $Result.GetResult<Prisma.$InterestedStudentsPayload, S>

  type InterestedStudentsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InterestedStudentsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InterestedStudentsCountAggregateInputType | true
    }

  export interface InterestedStudentsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['InterestedStudents'], meta: { name: 'InterestedStudents' } }
    /**
     * Find zero or one InterestedStudents that matches the filter.
     * @param {InterestedStudentsFindUniqueArgs} args - Arguments to find a InterestedStudents
     * @example
     * // Get one InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InterestedStudentsFindUniqueArgs>(args: SelectSubset<T, InterestedStudentsFindUniqueArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one InterestedStudents that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InterestedStudentsFindUniqueOrThrowArgs} args - Arguments to find a InterestedStudents
     * @example
     * // Get one InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InterestedStudentsFindUniqueOrThrowArgs>(args: SelectSubset<T, InterestedStudentsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first InterestedStudents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestedStudentsFindFirstArgs} args - Arguments to find a InterestedStudents
     * @example
     * // Get one InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InterestedStudentsFindFirstArgs>(args?: SelectSubset<T, InterestedStudentsFindFirstArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first InterestedStudents that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestedStudentsFindFirstOrThrowArgs} args - Arguments to find a InterestedStudents
     * @example
     * // Get one InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InterestedStudentsFindFirstOrThrowArgs>(args?: SelectSubset<T, InterestedStudentsFindFirstOrThrowArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more InterestedStudents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestedStudentsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.findMany()
     * 
     * // Get first 10 InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.findMany({ take: 10 })
     * 
     * // Only select the `intrest_id`
     * const interestedStudentsWithIntrest_idOnly = await prisma.interestedStudents.findMany({ select: { intrest_id: true } })
     * 
     */
    findMany<T extends InterestedStudentsFindManyArgs>(args?: SelectSubset<T, InterestedStudentsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a InterestedStudents.
     * @param {InterestedStudentsCreateArgs} args - Arguments to create a InterestedStudents.
     * @example
     * // Create one InterestedStudents
     * const InterestedStudents = await prisma.interestedStudents.create({
     *   data: {
     *     // ... data to create a InterestedStudents
     *   }
     * })
     * 
     */
    create<T extends InterestedStudentsCreateArgs>(args: SelectSubset<T, InterestedStudentsCreateArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many InterestedStudents.
     * @param {InterestedStudentsCreateManyArgs} args - Arguments to create many InterestedStudents.
     * @example
     * // Create many InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InterestedStudentsCreateManyArgs>(args?: SelectSubset<T, InterestedStudentsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many InterestedStudents and returns the data saved in the database.
     * @param {InterestedStudentsCreateManyAndReturnArgs} args - Arguments to create many InterestedStudents.
     * @example
     * // Create many InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many InterestedStudents and only return the `intrest_id`
     * const interestedStudentsWithIntrest_idOnly = await prisma.interestedStudents.createManyAndReturn({
     *   select: { intrest_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InterestedStudentsCreateManyAndReturnArgs>(args?: SelectSubset<T, InterestedStudentsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a InterestedStudents.
     * @param {InterestedStudentsDeleteArgs} args - Arguments to delete one InterestedStudents.
     * @example
     * // Delete one InterestedStudents
     * const InterestedStudents = await prisma.interestedStudents.delete({
     *   where: {
     *     // ... filter to delete one InterestedStudents
     *   }
     * })
     * 
     */
    delete<T extends InterestedStudentsDeleteArgs>(args: SelectSubset<T, InterestedStudentsDeleteArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one InterestedStudents.
     * @param {InterestedStudentsUpdateArgs} args - Arguments to update one InterestedStudents.
     * @example
     * // Update one InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InterestedStudentsUpdateArgs>(args: SelectSubset<T, InterestedStudentsUpdateArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more InterestedStudents.
     * @param {InterestedStudentsDeleteManyArgs} args - Arguments to filter InterestedStudents to delete.
     * @example
     * // Delete a few InterestedStudents
     * const { count } = await prisma.interestedStudents.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InterestedStudentsDeleteManyArgs>(args?: SelectSubset<T, InterestedStudentsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterestedStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestedStudentsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InterestedStudentsUpdateManyArgs>(args: SelectSubset<T, InterestedStudentsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more InterestedStudents and returns the data updated in the database.
     * @param {InterestedStudentsUpdateManyAndReturnArgs} args - Arguments to update many InterestedStudents.
     * @example
     * // Update many InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more InterestedStudents and only return the `intrest_id`
     * const interestedStudentsWithIntrest_idOnly = await prisma.interestedStudents.updateManyAndReturn({
     *   select: { intrest_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InterestedStudentsUpdateManyAndReturnArgs>(args: SelectSubset<T, InterestedStudentsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one InterestedStudents.
     * @param {InterestedStudentsUpsertArgs} args - Arguments to update or create a InterestedStudents.
     * @example
     * // Update or create a InterestedStudents
     * const interestedStudents = await prisma.interestedStudents.upsert({
     *   create: {
     *     // ... data to create a InterestedStudents
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the InterestedStudents we want to update
     *   }
     * })
     */
    upsert<T extends InterestedStudentsUpsertArgs>(args: SelectSubset<T, InterestedStudentsUpsertArgs<ExtArgs>>): Prisma__InterestedStudentsClient<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of InterestedStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestedStudentsCountArgs} args - Arguments to filter InterestedStudents to count.
     * @example
     * // Count the number of InterestedStudents
     * const count = await prisma.interestedStudents.count({
     *   where: {
     *     // ... the filter for the InterestedStudents we want to count
     *   }
     * })
    **/
    count<T extends InterestedStudentsCountArgs>(
      args?: Subset<T, InterestedStudentsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InterestedStudentsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a InterestedStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestedStudentsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InterestedStudentsAggregateArgs>(args: Subset<T, InterestedStudentsAggregateArgs>): Prisma.PrismaPromise<GetInterestedStudentsAggregateType<T>>

    /**
     * Group by InterestedStudents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InterestedStudentsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InterestedStudentsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InterestedStudentsGroupByArgs['orderBy'] }
        : { orderBy?: InterestedStudentsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InterestedStudentsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInterestedStudentsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the InterestedStudents model
   */
  readonly fields: InterestedStudentsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for InterestedStudents.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InterestedStudentsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Country<T extends CountryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountryDefaultArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    Event<T extends EventDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EventDefaultArgs<ExtArgs>>): Prisma__EventClient<$Result.GetResult<Prisma.$EventPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    Region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the InterestedStudents model
   */ 
  interface InterestedStudentsFieldRefs {
    readonly intrest_id: FieldRef<"InterestedStudents", 'Int'>
    readonly event_id: FieldRef<"InterestedStudents", 'Int'>
    readonly intrest_count: FieldRef<"InterestedStudents", 'Int'>
    readonly grade: FieldRef<"InterestedStudents", 'String'>
    readonly applied: FieldRef<"InterestedStudents", 'Boolean'>
    readonly work_title: FieldRef<"InterestedStudents", 'String'>
    readonly channel: FieldRef<"InterestedStudents", 'String'>
    readonly status: FieldRef<"InterestedStudents", 'String'>
    readonly country_id: FieldRef<"InterestedStudents", 'Int'>
    readonly region_id: FieldRef<"InterestedStudents", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * InterestedStudents findUnique
   */
  export type InterestedStudentsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * Filter, which InterestedStudents to fetch.
     */
    where: InterestedStudentsWhereUniqueInput
  }

  /**
   * InterestedStudents findUniqueOrThrow
   */
  export type InterestedStudentsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * Filter, which InterestedStudents to fetch.
     */
    where: InterestedStudentsWhereUniqueInput
  }

  /**
   * InterestedStudents findFirst
   */
  export type InterestedStudentsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * Filter, which InterestedStudents to fetch.
     */
    where?: InterestedStudentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestedStudents to fetch.
     */
    orderBy?: InterestedStudentsOrderByWithRelationInput | InterestedStudentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterestedStudents.
     */
    cursor?: InterestedStudentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestedStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestedStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterestedStudents.
     */
    distinct?: InterestedStudentsScalarFieldEnum | InterestedStudentsScalarFieldEnum[]
  }

  /**
   * InterestedStudents findFirstOrThrow
   */
  export type InterestedStudentsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * Filter, which InterestedStudents to fetch.
     */
    where?: InterestedStudentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestedStudents to fetch.
     */
    orderBy?: InterestedStudentsOrderByWithRelationInput | InterestedStudentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for InterestedStudents.
     */
    cursor?: InterestedStudentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestedStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestedStudents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of InterestedStudents.
     */
    distinct?: InterestedStudentsScalarFieldEnum | InterestedStudentsScalarFieldEnum[]
  }

  /**
   * InterestedStudents findMany
   */
  export type InterestedStudentsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * Filter, which InterestedStudents to fetch.
     */
    where?: InterestedStudentsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of InterestedStudents to fetch.
     */
    orderBy?: InterestedStudentsOrderByWithRelationInput | InterestedStudentsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing InterestedStudents.
     */
    cursor?: InterestedStudentsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` InterestedStudents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` InterestedStudents.
     */
    skip?: number
    distinct?: InterestedStudentsScalarFieldEnum | InterestedStudentsScalarFieldEnum[]
  }

  /**
   * InterestedStudents create
   */
  export type InterestedStudentsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * The data needed to create a InterestedStudents.
     */
    data: XOR<InterestedStudentsCreateInput, InterestedStudentsUncheckedCreateInput>
  }

  /**
   * InterestedStudents createMany
   */
  export type InterestedStudentsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many InterestedStudents.
     */
    data: InterestedStudentsCreateManyInput | InterestedStudentsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * InterestedStudents createManyAndReturn
   */
  export type InterestedStudentsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * The data used to create many InterestedStudents.
     */
    data: InterestedStudentsCreateManyInput | InterestedStudentsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterestedStudents update
   */
  export type InterestedStudentsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * The data needed to update a InterestedStudents.
     */
    data: XOR<InterestedStudentsUpdateInput, InterestedStudentsUncheckedUpdateInput>
    /**
     * Choose, which InterestedStudents to update.
     */
    where: InterestedStudentsWhereUniqueInput
  }

  /**
   * InterestedStudents updateMany
   */
  export type InterestedStudentsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update InterestedStudents.
     */
    data: XOR<InterestedStudentsUpdateManyMutationInput, InterestedStudentsUncheckedUpdateManyInput>
    /**
     * Filter which InterestedStudents to update
     */
    where?: InterestedStudentsWhereInput
  }

  /**
   * InterestedStudents updateManyAndReturn
   */
  export type InterestedStudentsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * The data used to update InterestedStudents.
     */
    data: XOR<InterestedStudentsUpdateManyMutationInput, InterestedStudentsUncheckedUpdateManyInput>
    /**
     * Filter which InterestedStudents to update
     */
    where?: InterestedStudentsWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * InterestedStudents upsert
   */
  export type InterestedStudentsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * The filter to search for the InterestedStudents to update in case it exists.
     */
    where: InterestedStudentsWhereUniqueInput
    /**
     * In case the InterestedStudents found by the `where` argument doesn't exist, create a new InterestedStudents with this data.
     */
    create: XOR<InterestedStudentsCreateInput, InterestedStudentsUncheckedCreateInput>
    /**
     * In case the InterestedStudents was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InterestedStudentsUpdateInput, InterestedStudentsUncheckedUpdateInput>
  }

  /**
   * InterestedStudents delete
   */
  export type InterestedStudentsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    /**
     * Filter which InterestedStudents to delete.
     */
    where: InterestedStudentsWhereUniqueInput
  }

  /**
   * InterestedStudents deleteMany
   */
  export type InterestedStudentsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which InterestedStudents to delete
     */
    where?: InterestedStudentsWhereInput
  }

  /**
   * InterestedStudents without action
   */
  export type InterestedStudentsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityAvgAggregateOutputType = {
    act_id: number | null
  }

  export type ActivitySumAggregateOutputType = {
    act_id: number | null
  }

  export type ActivityMinAggregateOutputType = {
    act_id: number | null
    start_date: Date | null
    end_date: Date | null
    act_name: string | null
    act_note: string | null
    on_duty: string | null
    dir_flag: boolean | null
    all_region: boolean | null
  }

  export type ActivityMaxAggregateOutputType = {
    act_id: number | null
    start_date: Date | null
    end_date: Date | null
    act_name: string | null
    act_note: string | null
    on_duty: string | null
    dir_flag: boolean | null
    all_region: boolean | null
  }

  export type ActivityCountAggregateOutputType = {
    act_id: number
    start_date: number
    end_date: number
    act_name: number
    act_note: number
    on_duty: number
    dir_flag: number
    all_region: number
    _all: number
  }


  export type ActivityAvgAggregateInputType = {
    act_id?: true
  }

  export type ActivitySumAggregateInputType = {
    act_id?: true
  }

  export type ActivityMinAggregateInputType = {
    act_id?: true
    start_date?: true
    end_date?: true
    act_name?: true
    act_note?: true
    on_duty?: true
    dir_flag?: true
    all_region?: true
  }

  export type ActivityMaxAggregateInputType = {
    act_id?: true
    start_date?: true
    end_date?: true
    act_name?: true
    act_note?: true
    on_duty?: true
    dir_flag?: true
    all_region?: true
  }

  export type ActivityCountAggregateInputType = {
    act_id?: true
    start_date?: true
    end_date?: true
    act_name?: true
    act_note?: true
    on_duty?: true
    dir_flag?: true
    all_region?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ActivityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ActivitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _avg?: ActivityAvgAggregateInputType
    _sum?: ActivitySumAggregateInputType
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    act_id: number
    start_date: Date
    end_date: Date
    act_name: string
    act_note: string | null
    on_duty: string
    dir_flag: boolean
    all_region: boolean
    _count: ActivityCountAggregateOutputType | null
    _avg: ActivityAvgAggregateOutputType | null
    _sum: ActivitySumAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    act_id?: boolean
    start_date?: boolean
    end_date?: boolean
    act_name?: boolean
    act_note?: boolean
    on_duty?: boolean
    dir_flag?: boolean
    all_region?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    act_id?: boolean
    start_date?: boolean
    end_date?: boolean
    act_name?: boolean
    act_note?: boolean
    on_duty?: boolean
    dir_flag?: boolean
    all_region?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    act_id?: boolean
    start_date?: boolean
    end_date?: boolean
    act_name?: boolean
    act_note?: boolean
    on_duty?: boolean
    dir_flag?: boolean
    all_region?: boolean
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    act_id?: boolean
    start_date?: boolean
    end_date?: boolean
    act_name?: boolean
    act_note?: boolean
    on_duty?: boolean
    dir_flag?: boolean
    all_region?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"act_id" | "start_date" | "end_date" | "act_name" | "act_note" | "on_duty" | "dir_flag" | "all_region", ExtArgs["result"]["activity"]>

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      act_id: number
      start_date: Date
      end_date: Date
      act_name: string
      act_note: string | null
      on_duty: string
      dir_flag: boolean
      all_region: boolean
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `act_id`
     * const activityWithAct_idOnly = await prisma.activity.findMany({ select: { act_id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `act_id`
     * const activityWithAct_idOnly = await prisma.activity.createManyAndReturn({
     *   select: { act_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `act_id`
     * const activityWithAct_idOnly = await prisma.activity.updateManyAndReturn({
     *   select: { act_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */ 
  interface ActivityFieldRefs {
    readonly act_id: FieldRef<"Activity", 'Int'>
    readonly start_date: FieldRef<"Activity", 'DateTime'>
    readonly end_date: FieldRef<"Activity", 'DateTime'>
    readonly act_name: FieldRef<"Activity", 'String'>
    readonly act_note: FieldRef<"Activity", 'String'>
    readonly on_duty: FieldRef<"Activity", 'String'>
    readonly dir_flag: FieldRef<"Activity", 'Boolean'>
    readonly all_region: FieldRef<"Activity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
  }


  /**
   * Model Country
   */

  export type AggregateCountry = {
    _count: CountryCountAggregateOutputType | null
    _avg: CountryAvgAggregateOutputType | null
    _sum: CountrySumAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  export type CountryAvgAggregateOutputType = {
    country_id: number | null
  }

  export type CountrySumAggregateOutputType = {
    country_id: number | null
  }

  export type CountryMinAggregateOutputType = {
    country_id: number | null
    country_name: string | null
  }

  export type CountryMaxAggregateOutputType = {
    country_id: number | null
    country_name: string | null
  }

  export type CountryCountAggregateOutputType = {
    country_id: number
    country_name: number
    _all: number
  }


  export type CountryAvgAggregateInputType = {
    country_id?: true
  }

  export type CountrySumAggregateInputType = {
    country_id?: true
  }

  export type CountryMinAggregateInputType = {
    country_id?: true
    country_name?: true
  }

  export type CountryMaxAggregateInputType = {
    country_id?: true
    country_name?: true
  }

  export type CountryCountAggregateInputType = {
    country_id?: true
    country_name?: true
    _all?: true
  }

  export type CountryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Country to aggregate.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Countries
    **/
    _count?: true | CountryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CountryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CountrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountryMaxAggregateInputType
  }

  export type GetCountryAggregateType<T extends CountryAggregateArgs> = {
        [P in keyof T & keyof AggregateCountry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCountry[P]>
      : GetScalarType<T[P], AggregateCountry[P]>
  }




  export type CountryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountryWhereInput
    orderBy?: CountryOrderByWithAggregationInput | CountryOrderByWithAggregationInput[]
    by: CountryScalarFieldEnum[] | CountryScalarFieldEnum
    having?: CountryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountryCountAggregateInputType | true
    _avg?: CountryAvgAggregateInputType
    _sum?: CountrySumAggregateInputType
    _min?: CountryMinAggregateInputType
    _max?: CountryMaxAggregateInputType
  }

  export type CountryGroupByOutputType = {
    country_id: number
    country_name: string
    _count: CountryCountAggregateOutputType | null
    _avg: CountryAvgAggregateOutputType | null
    _sum: CountrySumAggregateOutputType | null
    _min: CountryMinAggregateOutputType | null
    _max: CountryMaxAggregateOutputType | null
  }

  type GetCountryGroupByPayload<T extends CountryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountryGroupByOutputType[P]>
            : GetScalarType<T[P], CountryGroupByOutputType[P]>
        }
      >
    >


  export type CountrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    country_id?: boolean
    country_name?: boolean
    InterestedStudent?: boolean | Country$InterestedStudentArgs<ExtArgs>
    Region?: boolean | Country$RegionArgs<ExtArgs>
    School?: boolean | Country$SchoolArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["country"]>

  export type CountrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    country_id?: boolean
    country_name?: boolean
  }, ExtArgs["result"]["country"]>

  export type CountrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    country_id?: boolean
    country_name?: boolean
  }, ExtArgs["result"]["country"]>

  export type CountrySelectScalar = {
    country_id?: boolean
    country_name?: boolean
  }

  export type CountryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"country_id" | "country_name", ExtArgs["result"]["country"]>
  export type CountryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    InterestedStudent?: boolean | Country$InterestedStudentArgs<ExtArgs>
    Region?: boolean | Country$RegionArgs<ExtArgs>
    School?: boolean | Country$SchoolArgs<ExtArgs>
    _count?: boolean | CountryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CountryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type CountryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $CountryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Country"
    objects: {
      InterestedStudent: Prisma.$InterestedStudentsPayload<ExtArgs>[]
      Region: Prisma.$RegionPayload<ExtArgs>[]
      School: Prisma.$SchoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      country_id: number
      country_name: string
    }, ExtArgs["result"]["country"]>
    composites: {}
  }

  type CountryGetPayload<S extends boolean | null | undefined | CountryDefaultArgs> = $Result.GetResult<Prisma.$CountryPayload, S>

  type CountryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountryCountAggregateInputType | true
    }

  export interface CountryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Country'], meta: { name: 'Country' } }
    /**
     * Find zero or one Country that matches the filter.
     * @param {CountryFindUniqueArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountryFindUniqueArgs>(args: SelectSubset<T, CountryFindUniqueArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Country that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountryFindUniqueOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountryFindUniqueOrThrowArgs>(args: SelectSubset<T, CountryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Country that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountryFindFirstArgs>(args?: SelectSubset<T, CountryFindFirstArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Country that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindFirstOrThrowArgs} args - Arguments to find a Country
     * @example
     * // Get one Country
     * const country = await prisma.country.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountryFindFirstOrThrowArgs>(args?: SelectSubset<T, CountryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Countries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Countries
     * const countries = await prisma.country.findMany()
     * 
     * // Get first 10 Countries
     * const countries = await prisma.country.findMany({ take: 10 })
     * 
     * // Only select the `country_id`
     * const countryWithCountry_idOnly = await prisma.country.findMany({ select: { country_id: true } })
     * 
     */
    findMany<T extends CountryFindManyArgs>(args?: SelectSubset<T, CountryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Country.
     * @param {CountryCreateArgs} args - Arguments to create a Country.
     * @example
     * // Create one Country
     * const Country = await prisma.country.create({
     *   data: {
     *     // ... data to create a Country
     *   }
     * })
     * 
     */
    create<T extends CountryCreateArgs>(args: SelectSubset<T, CountryCreateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Countries.
     * @param {CountryCreateManyArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountryCreateManyArgs>(args?: SelectSubset<T, CountryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Countries and returns the data saved in the database.
     * @param {CountryCreateManyAndReturnArgs} args - Arguments to create many Countries.
     * @example
     * // Create many Countries
     * const country = await prisma.country.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Countries and only return the `country_id`
     * const countryWithCountry_idOnly = await prisma.country.createManyAndReturn({
     *   select: { country_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CountryCreateManyAndReturnArgs>(args?: SelectSubset<T, CountryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Country.
     * @param {CountryDeleteArgs} args - Arguments to delete one Country.
     * @example
     * // Delete one Country
     * const Country = await prisma.country.delete({
     *   where: {
     *     // ... filter to delete one Country
     *   }
     * })
     * 
     */
    delete<T extends CountryDeleteArgs>(args: SelectSubset<T, CountryDeleteArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Country.
     * @param {CountryUpdateArgs} args - Arguments to update one Country.
     * @example
     * // Update one Country
     * const country = await prisma.country.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountryUpdateArgs>(args: SelectSubset<T, CountryUpdateArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Countries.
     * @param {CountryDeleteManyArgs} args - Arguments to filter Countries to delete.
     * @example
     * // Delete a few Countries
     * const { count } = await prisma.country.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountryDeleteManyArgs>(args?: SelectSubset<T, CountryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountryUpdateManyArgs>(args: SelectSubset<T, CountryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Countries and returns the data updated in the database.
     * @param {CountryUpdateManyAndReturnArgs} args - Arguments to update many Countries.
     * @example
     * // Update many Countries
     * const country = await prisma.country.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Countries and only return the `country_id`
     * const countryWithCountry_idOnly = await prisma.country.updateManyAndReturn({
     *   select: { country_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CountryUpdateManyAndReturnArgs>(args: SelectSubset<T, CountryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Country.
     * @param {CountryUpsertArgs} args - Arguments to update or create a Country.
     * @example
     * // Update or create a Country
     * const country = await prisma.country.upsert({
     *   create: {
     *     // ... data to create a Country
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Country we want to update
     *   }
     * })
     */
    upsert<T extends CountryUpsertArgs>(args: SelectSubset<T, CountryUpsertArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Countries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryCountArgs} args - Arguments to filter Countries to count.
     * @example
     * // Count the number of Countries
     * const count = await prisma.country.count({
     *   where: {
     *     // ... the filter for the Countries we want to count
     *   }
     * })
    **/
    count<T extends CountryCountArgs>(
      args?: Subset<T, CountryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountryAggregateArgs>(args: Subset<T, CountryAggregateArgs>): Prisma.PrismaPromise<GetCountryAggregateType<T>>

    /**
     * Group by Country.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountryGroupByArgs['orderBy'] }
        : { orderBy?: CountryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Country model
   */
  readonly fields: CountryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Country.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    InterestedStudent<T extends Country$InterestedStudentArgs<ExtArgs> = {}>(args?: Subset<T, Country$InterestedStudentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    Region<T extends Country$RegionArgs<ExtArgs> = {}>(args?: Subset<T, Country$RegionArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    School<T extends Country$SchoolArgs<ExtArgs> = {}>(args?: Subset<T, Country$SchoolArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Country model
   */ 
  interface CountryFieldRefs {
    readonly country_id: FieldRef<"Country", 'Int'>
    readonly country_name: FieldRef<"Country", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Country findUnique
   */
  export type CountryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findUniqueOrThrow
   */
  export type CountryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country findFirst
   */
  export type CountryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findFirstOrThrow
   */
  export type CountryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Country to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Countries.
     */
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country findMany
   */
  export type CountryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter, which Countries to fetch.
     */
    where?: CountryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Countries to fetch.
     */
    orderBy?: CountryOrderByWithRelationInput | CountryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Countries.
     */
    cursor?: CountryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Countries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Countries.
     */
    skip?: number
    distinct?: CountryScalarFieldEnum | CountryScalarFieldEnum[]
  }

  /**
   * Country create
   */
  export type CountryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to create a Country.
     */
    data: XOR<CountryCreateInput, CountryUncheckedCreateInput>
  }

  /**
   * Country createMany
   */
  export type CountryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Country createManyAndReturn
   */
  export type CountryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * The data used to create many Countries.
     */
    data: CountryCreateManyInput | CountryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Country update
   */
  export type CountryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The data needed to update a Country.
     */
    data: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
    /**
     * Choose, which Country to update.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country updateMany
   */
  export type CountryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput
  }

  /**
   * Country updateManyAndReturn
   */
  export type CountryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * The data used to update Countries.
     */
    data: XOR<CountryUpdateManyMutationInput, CountryUncheckedUpdateManyInput>
    /**
     * Filter which Countries to update
     */
    where?: CountryWhereInput
  }

  /**
   * Country upsert
   */
  export type CountryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * The filter to search for the Country to update in case it exists.
     */
    where: CountryWhereUniqueInput
    /**
     * In case the Country found by the `where` argument doesn't exist, create a new Country with this data.
     */
    create: XOR<CountryCreateInput, CountryUncheckedCreateInput>
    /**
     * In case the Country was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountryUpdateInput, CountryUncheckedUpdateInput>
  }

  /**
   * Country delete
   */
  export type CountryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
    /**
     * Filter which Country to delete.
     */
    where: CountryWhereUniqueInput
  }

  /**
   * Country deleteMany
   */
  export type CountryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Countries to delete
     */
    where?: CountryWhereInput
  }

  /**
   * Country.InterestedStudent
   */
  export type Country$InterestedStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    where?: InterestedStudentsWhereInput
    orderBy?: InterestedStudentsOrderByWithRelationInput | InterestedStudentsOrderByWithRelationInput[]
    cursor?: InterestedStudentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterestedStudentsScalarFieldEnum | InterestedStudentsScalarFieldEnum[]
  }

  /**
   * Country.Region
   */
  export type Country$RegionArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    cursor?: RegionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Country.School
   */
  export type Country$SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    cursor?: SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * Country without action
   */
  export type CountryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Country
     */
    select?: CountrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Country
     */
    omit?: CountryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountryInclude<ExtArgs> | null
  }


  /**
   * Model Region
   */

  export type AggregateRegion = {
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  export type RegionAvgAggregateOutputType = {
    region_id: number | null
    country_id: number | null
  }

  export type RegionSumAggregateOutputType = {
    region_id: number | null
    country_id: number | null
  }

  export type RegionMinAggregateOutputType = {
    region_id: number | null
    region_name: string | null
    country_id: number | null
  }

  export type RegionMaxAggregateOutputType = {
    region_id: number | null
    region_name: string | null
    country_id: number | null
  }

  export type RegionCountAggregateOutputType = {
    region_id: number
    region_name: number
    country_id: number
    _all: number
  }


  export type RegionAvgAggregateInputType = {
    region_id?: true
    country_id?: true
  }

  export type RegionSumAggregateInputType = {
    region_id?: true
    country_id?: true
  }

  export type RegionMinAggregateInputType = {
    region_id?: true
    region_name?: true
    country_id?: true
  }

  export type RegionMaxAggregateInputType = {
    region_id?: true
    region_name?: true
    country_id?: true
  }

  export type RegionCountAggregateInputType = {
    region_id?: true
    region_name?: true
    country_id?: true
    _all?: true
  }

  export type RegionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Region to aggregate.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Regions
    **/
    _count?: true | RegionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RegionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RegionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RegionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RegionMaxAggregateInputType
  }

  export type GetRegionAggregateType<T extends RegionAggregateArgs> = {
        [P in keyof T & keyof AggregateRegion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRegion[P]>
      : GetScalarType<T[P], AggregateRegion[P]>
  }




  export type RegionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RegionWhereInput
    orderBy?: RegionOrderByWithAggregationInput | RegionOrderByWithAggregationInput[]
    by: RegionScalarFieldEnum[] | RegionScalarFieldEnum
    having?: RegionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RegionCountAggregateInputType | true
    _avg?: RegionAvgAggregateInputType
    _sum?: RegionSumAggregateInputType
    _min?: RegionMinAggregateInputType
    _max?: RegionMaxAggregateInputType
  }

  export type RegionGroupByOutputType = {
    region_id: number
    region_name: string
    country_id: number
    _count: RegionCountAggregateOutputType | null
    _avg: RegionAvgAggregateOutputType | null
    _sum: RegionSumAggregateOutputType | null
    _min: RegionMinAggregateOutputType | null
    _max: RegionMaxAggregateOutputType | null
  }

  type GetRegionGroupByPayload<T extends RegionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RegionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RegionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RegionGroupByOutputType[P]>
            : GetScalarType<T[P], RegionGroupByOutputType[P]>
        }
      >
    >


  export type RegionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    region_id?: boolean
    region_name?: boolean
    country_id?: boolean
    County?: boolean | Region$CountyArgs<ExtArgs>
    InterestedStudent?: boolean | Region$InterestedStudentArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    School?: boolean | Region$SchoolArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    region_id?: boolean
    region_name?: boolean
    country_id?: boolean
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    region_id?: boolean
    region_name?: boolean
    country_id?: boolean
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["region"]>

  export type RegionSelectScalar = {
    region_id?: boolean
    region_name?: boolean
    country_id?: boolean
  }

  export type RegionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"region_id" | "region_name" | "country_id", ExtArgs["result"]["region"]>
  export type RegionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    County?: boolean | Region$CountyArgs<ExtArgs>
    InterestedStudent?: boolean | Region$InterestedStudentArgs<ExtArgs>
    country?: boolean | CountryDefaultArgs<ExtArgs>
    School?: boolean | Region$SchoolArgs<ExtArgs>
    _count?: boolean | RegionCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type RegionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }
  export type RegionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    country?: boolean | CountryDefaultArgs<ExtArgs>
  }

  export type $RegionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Region"
    objects: {
      County: Prisma.$CountyPayload<ExtArgs>[]
      InterestedStudent: Prisma.$InterestedStudentsPayload<ExtArgs>[]
      country: Prisma.$CountryPayload<ExtArgs>
      School: Prisma.$SchoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      region_id: number
      region_name: string
      country_id: number
    }, ExtArgs["result"]["region"]>
    composites: {}
  }

  type RegionGetPayload<S extends boolean | null | undefined | RegionDefaultArgs> = $Result.GetResult<Prisma.$RegionPayload, S>

  type RegionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RegionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RegionCountAggregateInputType | true
    }

  export interface RegionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Region'], meta: { name: 'Region' } }
    /**
     * Find zero or one Region that matches the filter.
     * @param {RegionFindUniqueArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RegionFindUniqueArgs>(args: SelectSubset<T, RegionFindUniqueArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one Region that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RegionFindUniqueOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RegionFindUniqueOrThrowArgs>(args: SelectSubset<T, RegionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first Region that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RegionFindFirstArgs>(args?: SelectSubset<T, RegionFindFirstArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first Region that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindFirstOrThrowArgs} args - Arguments to find a Region
     * @example
     * // Get one Region
     * const region = await prisma.region.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RegionFindFirstOrThrowArgs>(args?: SelectSubset<T, RegionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Regions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Regions
     * const regions = await prisma.region.findMany()
     * 
     * // Get first 10 Regions
     * const regions = await prisma.region.findMany({ take: 10 })
     * 
     * // Only select the `region_id`
     * const regionWithRegion_idOnly = await prisma.region.findMany({ select: { region_id: true } })
     * 
     */
    findMany<T extends RegionFindManyArgs>(args?: SelectSubset<T, RegionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a Region.
     * @param {RegionCreateArgs} args - Arguments to create a Region.
     * @example
     * // Create one Region
     * const Region = await prisma.region.create({
     *   data: {
     *     // ... data to create a Region
     *   }
     * })
     * 
     */
    create<T extends RegionCreateArgs>(args: SelectSubset<T, RegionCreateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Regions.
     * @param {RegionCreateManyArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RegionCreateManyArgs>(args?: SelectSubset<T, RegionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Regions and returns the data saved in the database.
     * @param {RegionCreateManyAndReturnArgs} args - Arguments to create many Regions.
     * @example
     * // Create many Regions
     * const region = await prisma.region.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Regions and only return the `region_id`
     * const regionWithRegion_idOnly = await prisma.region.createManyAndReturn({
     *   select: { region_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RegionCreateManyAndReturnArgs>(args?: SelectSubset<T, RegionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a Region.
     * @param {RegionDeleteArgs} args - Arguments to delete one Region.
     * @example
     * // Delete one Region
     * const Region = await prisma.region.delete({
     *   where: {
     *     // ... filter to delete one Region
     *   }
     * })
     * 
     */
    delete<T extends RegionDeleteArgs>(args: SelectSubset<T, RegionDeleteArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one Region.
     * @param {RegionUpdateArgs} args - Arguments to update one Region.
     * @example
     * // Update one Region
     * const region = await prisma.region.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RegionUpdateArgs>(args: SelectSubset<T, RegionUpdateArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Regions.
     * @param {RegionDeleteManyArgs} args - Arguments to filter Regions to delete.
     * @example
     * // Delete a few Regions
     * const { count } = await prisma.region.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RegionDeleteManyArgs>(args?: SelectSubset<T, RegionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RegionUpdateManyArgs>(args: SelectSubset<T, RegionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Regions and returns the data updated in the database.
     * @param {RegionUpdateManyAndReturnArgs} args - Arguments to update many Regions.
     * @example
     * // Update many Regions
     * const region = await prisma.region.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Regions and only return the `region_id`
     * const regionWithRegion_idOnly = await prisma.region.updateManyAndReturn({
     *   select: { region_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RegionUpdateManyAndReturnArgs>(args: SelectSubset<T, RegionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one Region.
     * @param {RegionUpsertArgs} args - Arguments to update or create a Region.
     * @example
     * // Update or create a Region
     * const region = await prisma.region.upsert({
     *   create: {
     *     // ... data to create a Region
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Region we want to update
     *   }
     * })
     */
    upsert<T extends RegionUpsertArgs>(args: SelectSubset<T, RegionUpsertArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Regions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionCountArgs} args - Arguments to filter Regions to count.
     * @example
     * // Count the number of Regions
     * const count = await prisma.region.count({
     *   where: {
     *     // ... the filter for the Regions we want to count
     *   }
     * })
    **/
    count<T extends RegionCountArgs>(
      args?: Subset<T, RegionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RegionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RegionAggregateArgs>(args: Subset<T, RegionAggregateArgs>): Prisma.PrismaPromise<GetRegionAggregateType<T>>

    /**
     * Group by Region.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RegionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RegionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RegionGroupByArgs['orderBy'] }
        : { orderBy?: RegionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RegionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRegionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Region model
   */
  readonly fields: RegionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Region.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RegionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    County<T extends Region$CountyArgs<ExtArgs> = {}>(args?: Subset<T, Region$CountyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    InterestedStudent<T extends Region$InterestedStudentArgs<ExtArgs> = {}>(args?: Subset<T, Region$InterestedStudentArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InterestedStudentsPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    country<T extends CountryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountryDefaultArgs<ExtArgs>>): Prisma__CountryClient<$Result.GetResult<Prisma.$CountryPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    School<T extends Region$SchoolArgs<ExtArgs> = {}>(args?: Subset<T, Region$SchoolArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Region model
   */ 
  interface RegionFieldRefs {
    readonly region_id: FieldRef<"Region", 'Int'>
    readonly region_name: FieldRef<"Region", 'String'>
    readonly country_id: FieldRef<"Region", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Region findUnique
   */
  export type RegionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findUniqueOrThrow
   */
  export type RegionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region findFirst
   */
  export type RegionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findFirstOrThrow
   */
  export type RegionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Region to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Regions.
     */
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region findMany
   */
  export type RegionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter, which Regions to fetch.
     */
    where?: RegionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Regions to fetch.
     */
    orderBy?: RegionOrderByWithRelationInput | RegionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Regions.
     */
    cursor?: RegionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Regions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Regions.
     */
    skip?: number
    distinct?: RegionScalarFieldEnum | RegionScalarFieldEnum[]
  }

  /**
   * Region create
   */
  export type RegionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to create a Region.
     */
    data: XOR<RegionCreateInput, RegionUncheckedCreateInput>
  }

  /**
   * Region createMany
   */
  export type RegionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Region createManyAndReturn
   */
  export type RegionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to create many Regions.
     */
    data: RegionCreateManyInput | RegionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Region update
   */
  export type RegionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The data needed to update a Region.
     */
    data: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
    /**
     * Choose, which Region to update.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region updateMany
   */
  export type RegionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
  }

  /**
   * Region updateManyAndReturn
   */
  export type RegionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * The data used to update Regions.
     */
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyInput>
    /**
     * Filter which Regions to update
     */
    where?: RegionWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Region upsert
   */
  export type RegionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * The filter to search for the Region to update in case it exists.
     */
    where: RegionWhereUniqueInput
    /**
     * In case the Region found by the `where` argument doesn't exist, create a new Region with this data.
     */
    create: XOR<RegionCreateInput, RegionUncheckedCreateInput>
    /**
     * In case the Region was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RegionUpdateInput, RegionUncheckedUpdateInput>
  }

  /**
   * Region delete
   */
  export type RegionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
    /**
     * Filter which Region to delete.
     */
    where: RegionWhereUniqueInput
  }

  /**
   * Region deleteMany
   */
  export type RegionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Regions to delete
     */
    where?: RegionWhereInput
  }

  /**
   * Region.County
   */
  export type Region$CountyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    where?: CountyWhereInput
    orderBy?: CountyOrderByWithRelationInput | CountyOrderByWithRelationInput[]
    cursor?: CountyWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CountyScalarFieldEnum | CountyScalarFieldEnum[]
  }

  /**
   * Region.InterestedStudent
   */
  export type Region$InterestedStudentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the InterestedStudents
     */
    select?: InterestedStudentsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the InterestedStudents
     */
    omit?: InterestedStudentsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InterestedStudentsInclude<ExtArgs> | null
    where?: InterestedStudentsWhereInput
    orderBy?: InterestedStudentsOrderByWithRelationInput | InterestedStudentsOrderByWithRelationInput[]
    cursor?: InterestedStudentsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InterestedStudentsScalarFieldEnum | InterestedStudentsScalarFieldEnum[]
  }

  /**
   * Region.School
   */
  export type Region$SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    cursor?: SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * Region without action
   */
  export type RegionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Region
     */
    select?: RegionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Region
     */
    omit?: RegionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RegionInclude<ExtArgs> | null
  }


  /**
   * Model County
   */

  export type AggregateCounty = {
    _count: CountyCountAggregateOutputType | null
    _avg: CountyAvgAggregateOutputType | null
    _sum: CountySumAggregateOutputType | null
    _min: CountyMinAggregateOutputType | null
    _max: CountyMaxAggregateOutputType | null
  }

  export type CountyAvgAggregateOutputType = {
    county_id: number | null
    region_id: number | null
  }

  export type CountySumAggregateOutputType = {
    county_id: number | null
    region_id: number | null
  }

  export type CountyMinAggregateOutputType = {
    county_id: number | null
    county_name: string | null
    region_id: number | null
  }

  export type CountyMaxAggregateOutputType = {
    county_id: number | null
    county_name: string | null
    region_id: number | null
  }

  export type CountyCountAggregateOutputType = {
    county_id: number
    county_name: number
    region_id: number
    _all: number
  }


  export type CountyAvgAggregateInputType = {
    county_id?: true
    region_id?: true
  }

  export type CountySumAggregateInputType = {
    county_id?: true
    region_id?: true
  }

  export type CountyMinAggregateInputType = {
    county_id?: true
    county_name?: true
    region_id?: true
  }

  export type CountyMaxAggregateInputType = {
    county_id?: true
    county_name?: true
    region_id?: true
  }

  export type CountyCountAggregateInputType = {
    county_id?: true
    county_name?: true
    region_id?: true
    _all?: true
  }

  export type CountyAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which County to aggregate.
     */
    where?: CountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counties to fetch.
     */
    orderBy?: CountyOrderByWithRelationInput | CountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Counties
    **/
    _count?: true | CountyCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CountyAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CountySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CountyMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CountyMaxAggregateInputType
  }

  export type GetCountyAggregateType<T extends CountyAggregateArgs> = {
        [P in keyof T & keyof AggregateCounty]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCounty[P]>
      : GetScalarType<T[P], AggregateCounty[P]>
  }




  export type CountyGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CountyWhereInput
    orderBy?: CountyOrderByWithAggregationInput | CountyOrderByWithAggregationInput[]
    by: CountyScalarFieldEnum[] | CountyScalarFieldEnum
    having?: CountyScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CountyCountAggregateInputType | true
    _avg?: CountyAvgAggregateInputType
    _sum?: CountySumAggregateInputType
    _min?: CountyMinAggregateInputType
    _max?: CountyMaxAggregateInputType
  }

  export type CountyGroupByOutputType = {
    county_id: number
    county_name: string
    region_id: number
    _count: CountyCountAggregateOutputType | null
    _avg: CountyAvgAggregateOutputType | null
    _sum: CountySumAggregateOutputType | null
    _min: CountyMinAggregateOutputType | null
    _max: CountyMaxAggregateOutputType | null
  }

  type GetCountyGroupByPayload<T extends CountyGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CountyGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CountyGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CountyGroupByOutputType[P]>
            : GetScalarType<T[P], CountyGroupByOutputType[P]>
        }
      >
    >


  export type CountySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    county_id?: boolean
    county_name?: boolean
    region_id?: boolean
    city?: boolean | County$cityArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    School?: boolean | County$SchoolArgs<ExtArgs>
    _count?: boolean | CountyCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["county"]>

  export type CountySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    county_id?: boolean
    county_name?: boolean
    region_id?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["county"]>

  export type CountySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    county_id?: boolean
    county_name?: boolean
    region_id?: boolean
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["county"]>

  export type CountySelectScalar = {
    county_id?: boolean
    county_name?: boolean
    region_id?: boolean
  }

  export type CountyOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"county_id" | "county_name" | "region_id", ExtArgs["result"]["county"]>
  export type CountyInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    city?: boolean | County$cityArgs<ExtArgs>
    region?: boolean | RegionDefaultArgs<ExtArgs>
    School?: boolean | County$SchoolArgs<ExtArgs>
    _count?: boolean | CountyCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CountyIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }
  export type CountyIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    region?: boolean | RegionDefaultArgs<ExtArgs>
  }

  export type $CountyPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "County"
    objects: {
      city: Prisma.$CityPayload<ExtArgs>[]
      region: Prisma.$RegionPayload<ExtArgs>
      School: Prisma.$SchoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      county_id: number
      county_name: string
      region_id: number
    }, ExtArgs["result"]["county"]>
    composites: {}
  }

  type CountyGetPayload<S extends boolean | null | undefined | CountyDefaultArgs> = $Result.GetResult<Prisma.$CountyPayload, S>

  type CountyCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CountyFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CountyCountAggregateInputType | true
    }

  export interface CountyDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['County'], meta: { name: 'County' } }
    /**
     * Find zero or one County that matches the filter.
     * @param {CountyFindUniqueArgs} args - Arguments to find a County
     * @example
     * // Get one County
     * const county = await prisma.county.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CountyFindUniqueArgs>(args: SelectSubset<T, CountyFindUniqueArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one County that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CountyFindUniqueOrThrowArgs} args - Arguments to find a County
     * @example
     * // Get one County
     * const county = await prisma.county.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CountyFindUniqueOrThrowArgs>(args: SelectSubset<T, CountyFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first County that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountyFindFirstArgs} args - Arguments to find a County
     * @example
     * // Get one County
     * const county = await prisma.county.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CountyFindFirstArgs>(args?: SelectSubset<T, CountyFindFirstArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first County that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountyFindFirstOrThrowArgs} args - Arguments to find a County
     * @example
     * // Get one County
     * const county = await prisma.county.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CountyFindFirstOrThrowArgs>(args?: SelectSubset<T, CountyFindFirstOrThrowArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Counties that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountyFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Counties
     * const counties = await prisma.county.findMany()
     * 
     * // Get first 10 Counties
     * const counties = await prisma.county.findMany({ take: 10 })
     * 
     * // Only select the `county_id`
     * const countyWithCounty_idOnly = await prisma.county.findMany({ select: { county_id: true } })
     * 
     */
    findMany<T extends CountyFindManyArgs>(args?: SelectSubset<T, CountyFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a County.
     * @param {CountyCreateArgs} args - Arguments to create a County.
     * @example
     * // Create one County
     * const County = await prisma.county.create({
     *   data: {
     *     // ... data to create a County
     *   }
     * })
     * 
     */
    create<T extends CountyCreateArgs>(args: SelectSubset<T, CountyCreateArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Counties.
     * @param {CountyCreateManyArgs} args - Arguments to create many Counties.
     * @example
     * // Create many Counties
     * const county = await prisma.county.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CountyCreateManyArgs>(args?: SelectSubset<T, CountyCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Counties and returns the data saved in the database.
     * @param {CountyCreateManyAndReturnArgs} args - Arguments to create many Counties.
     * @example
     * // Create many Counties
     * const county = await prisma.county.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Counties and only return the `county_id`
     * const countyWithCounty_idOnly = await prisma.county.createManyAndReturn({
     *   select: { county_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CountyCreateManyAndReturnArgs>(args?: SelectSubset<T, CountyCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a County.
     * @param {CountyDeleteArgs} args - Arguments to delete one County.
     * @example
     * // Delete one County
     * const County = await prisma.county.delete({
     *   where: {
     *     // ... filter to delete one County
     *   }
     * })
     * 
     */
    delete<T extends CountyDeleteArgs>(args: SelectSubset<T, CountyDeleteArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one County.
     * @param {CountyUpdateArgs} args - Arguments to update one County.
     * @example
     * // Update one County
     * const county = await prisma.county.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CountyUpdateArgs>(args: SelectSubset<T, CountyUpdateArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Counties.
     * @param {CountyDeleteManyArgs} args - Arguments to filter Counties to delete.
     * @example
     * // Delete a few Counties
     * const { count } = await prisma.county.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CountyDeleteManyArgs>(args?: SelectSubset<T, CountyDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Counties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountyUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Counties
     * const county = await prisma.county.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CountyUpdateManyArgs>(args: SelectSubset<T, CountyUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Counties and returns the data updated in the database.
     * @param {CountyUpdateManyAndReturnArgs} args - Arguments to update many Counties.
     * @example
     * // Update many Counties
     * const county = await prisma.county.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Counties and only return the `county_id`
     * const countyWithCounty_idOnly = await prisma.county.updateManyAndReturn({
     *   select: { county_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CountyUpdateManyAndReturnArgs>(args: SelectSubset<T, CountyUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one County.
     * @param {CountyUpsertArgs} args - Arguments to update or create a County.
     * @example
     * // Update or create a County
     * const county = await prisma.county.upsert({
     *   create: {
     *     // ... data to create a County
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the County we want to update
     *   }
     * })
     */
    upsert<T extends CountyUpsertArgs>(args: SelectSubset<T, CountyUpsertArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Counties.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountyCountArgs} args - Arguments to filter Counties to count.
     * @example
     * // Count the number of Counties
     * const count = await prisma.county.count({
     *   where: {
     *     // ... the filter for the Counties we want to count
     *   }
     * })
    **/
    count<T extends CountyCountArgs>(
      args?: Subset<T, CountyCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CountyCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a County.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountyAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CountyAggregateArgs>(args: Subset<T, CountyAggregateArgs>): Prisma.PrismaPromise<GetCountyAggregateType<T>>

    /**
     * Group by County.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CountyGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CountyGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CountyGroupByArgs['orderBy'] }
        : { orderBy?: CountyGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CountyGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCountyGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the County model
   */
  readonly fields: CountyFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for County.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CountyClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    city<T extends County$cityArgs<ExtArgs> = {}>(args?: Subset<T, County$cityArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    region<T extends RegionDefaultArgs<ExtArgs> = {}>(args?: Subset<T, RegionDefaultArgs<ExtArgs>>): Prisma__RegionClient<$Result.GetResult<Prisma.$RegionPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    School<T extends County$SchoolArgs<ExtArgs> = {}>(args?: Subset<T, County$SchoolArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the County model
   */ 
  interface CountyFieldRefs {
    readonly county_id: FieldRef<"County", 'Int'>
    readonly county_name: FieldRef<"County", 'String'>
    readonly region_id: FieldRef<"County", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * County findUnique
   */
  export type CountyFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * Filter, which County to fetch.
     */
    where: CountyWhereUniqueInput
  }

  /**
   * County findUniqueOrThrow
   */
  export type CountyFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * Filter, which County to fetch.
     */
    where: CountyWhereUniqueInput
  }

  /**
   * County findFirst
   */
  export type CountyFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * Filter, which County to fetch.
     */
    where?: CountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counties to fetch.
     */
    orderBy?: CountyOrderByWithRelationInput | CountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Counties.
     */
    cursor?: CountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Counties.
     */
    distinct?: CountyScalarFieldEnum | CountyScalarFieldEnum[]
  }

  /**
   * County findFirstOrThrow
   */
  export type CountyFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * Filter, which County to fetch.
     */
    where?: CountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counties to fetch.
     */
    orderBy?: CountyOrderByWithRelationInput | CountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Counties.
     */
    cursor?: CountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counties.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Counties.
     */
    distinct?: CountyScalarFieldEnum | CountyScalarFieldEnum[]
  }

  /**
   * County findMany
   */
  export type CountyFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * Filter, which Counties to fetch.
     */
    where?: CountyWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Counties to fetch.
     */
    orderBy?: CountyOrderByWithRelationInput | CountyOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Counties.
     */
    cursor?: CountyWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Counties from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Counties.
     */
    skip?: number
    distinct?: CountyScalarFieldEnum | CountyScalarFieldEnum[]
  }

  /**
   * County create
   */
  export type CountyCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * The data needed to create a County.
     */
    data: XOR<CountyCreateInput, CountyUncheckedCreateInput>
  }

  /**
   * County createMany
   */
  export type CountyCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Counties.
     */
    data: CountyCreateManyInput | CountyCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * County createManyAndReturn
   */
  export type CountyCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * The data used to create many Counties.
     */
    data: CountyCreateManyInput | CountyCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * County update
   */
  export type CountyUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * The data needed to update a County.
     */
    data: XOR<CountyUpdateInput, CountyUncheckedUpdateInput>
    /**
     * Choose, which County to update.
     */
    where: CountyWhereUniqueInput
  }

  /**
   * County updateMany
   */
  export type CountyUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Counties.
     */
    data: XOR<CountyUpdateManyMutationInput, CountyUncheckedUpdateManyInput>
    /**
     * Filter which Counties to update
     */
    where?: CountyWhereInput
  }

  /**
   * County updateManyAndReturn
   */
  export type CountyUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * The data used to update Counties.
     */
    data: XOR<CountyUpdateManyMutationInput, CountyUncheckedUpdateManyInput>
    /**
     * Filter which Counties to update
     */
    where?: CountyWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * County upsert
   */
  export type CountyUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * The filter to search for the County to update in case it exists.
     */
    where: CountyWhereUniqueInput
    /**
     * In case the County found by the `where` argument doesn't exist, create a new County with this data.
     */
    create: XOR<CountyCreateInput, CountyUncheckedCreateInput>
    /**
     * In case the County was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CountyUpdateInput, CountyUncheckedUpdateInput>
  }

  /**
   * County delete
   */
  export type CountyDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
    /**
     * Filter which County to delete.
     */
    where: CountyWhereUniqueInput
  }

  /**
   * County deleteMany
   */
  export type CountyDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Counties to delete
     */
    where?: CountyWhereInput
  }

  /**
   * County.city
   */
  export type County$cityArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    where?: CityWhereInput
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    cursor?: CityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CityScalarFieldEnum | CityScalarFieldEnum[]
  }

  /**
   * County.School
   */
  export type County$SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    cursor?: SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * County without action
   */
  export type CountyDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the County
     */
    select?: CountySelect<ExtArgs> | null
    /**
     * Omit specific fields from the County
     */
    omit?: CountyOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CountyInclude<ExtArgs> | null
  }


  /**
   * Model City
   */

  export type AggregateCity = {
    _count: CityCountAggregateOutputType | null
    _avg: CityAvgAggregateOutputType | null
    _sum: CitySumAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  export type CityAvgAggregateOutputType = {
    city_id: number | null
    county_id: number | null
  }

  export type CitySumAggregateOutputType = {
    city_id: number | null
    county_id: number | null
  }

  export type CityMinAggregateOutputType = {
    city_id: number | null
    city_name: string | null
    county_id: number | null
  }

  export type CityMaxAggregateOutputType = {
    city_id: number | null
    city_name: string | null
    county_id: number | null
  }

  export type CityCountAggregateOutputType = {
    city_id: number
    city_name: number
    county_id: number
    _all: number
  }


  export type CityAvgAggregateInputType = {
    city_id?: true
    county_id?: true
  }

  export type CitySumAggregateInputType = {
    city_id?: true
    county_id?: true
  }

  export type CityMinAggregateInputType = {
    city_id?: true
    city_name?: true
    county_id?: true
  }

  export type CityMaxAggregateInputType = {
    city_id?: true
    city_name?: true
    county_id?: true
  }

  export type CityCountAggregateInputType = {
    city_id?: true
    city_name?: true
    county_id?: true
    _all?: true
  }

  export type CityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which City to aggregate.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Cities
    **/
    _count?: true | CityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: CityAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: CitySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CityMaxAggregateInputType
  }

  export type GetCityAggregateType<T extends CityAggregateArgs> = {
        [P in keyof T & keyof AggregateCity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCity[P]>
      : GetScalarType<T[P], AggregateCity[P]>
  }




  export type CityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CityWhereInput
    orderBy?: CityOrderByWithAggregationInput | CityOrderByWithAggregationInput[]
    by: CityScalarFieldEnum[] | CityScalarFieldEnum
    having?: CityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CityCountAggregateInputType | true
    _avg?: CityAvgAggregateInputType
    _sum?: CitySumAggregateInputType
    _min?: CityMinAggregateInputType
    _max?: CityMaxAggregateInputType
  }

  export type CityGroupByOutputType = {
    city_id: number
    city_name: string
    county_id: number
    _count: CityCountAggregateOutputType | null
    _avg: CityAvgAggregateOutputType | null
    _sum: CitySumAggregateOutputType | null
    _min: CityMinAggregateOutputType | null
    _max: CityMaxAggregateOutputType | null
  }

  type GetCityGroupByPayload<T extends CityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CityGroupByOutputType[P]>
            : GetScalarType<T[P], CityGroupByOutputType[P]>
        }
      >
    >


  export type CitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    city_id?: boolean
    city_name?: boolean
    county_id?: boolean
    county?: boolean | CountyDefaultArgs<ExtArgs>
    School?: boolean | City$SchoolArgs<ExtArgs>
    _count?: boolean | CityCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["city"]>

  export type CitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    city_id?: boolean
    city_name?: boolean
    county_id?: boolean
    county?: boolean | CountyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["city"]>

  export type CitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    city_id?: boolean
    city_name?: boolean
    county_id?: boolean
    county?: boolean | CountyDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["city"]>

  export type CitySelectScalar = {
    city_id?: boolean
    city_name?: boolean
    county_id?: boolean
  }

  export type CityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"city_id" | "city_name" | "county_id", ExtArgs["result"]["city"]>
  export type CityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    county?: boolean | CountyDefaultArgs<ExtArgs>
    School?: boolean | City$SchoolArgs<ExtArgs>
    _count?: boolean | CityCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    county?: boolean | CountyDefaultArgs<ExtArgs>
  }
  export type CityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    county?: boolean | CountyDefaultArgs<ExtArgs>
  }

  export type $CityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "City"
    objects: {
      county: Prisma.$CountyPayload<ExtArgs>
      School: Prisma.$SchoolPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      city_id: number
      city_name: string
      county_id: number
    }, ExtArgs["result"]["city"]>
    composites: {}
  }

  type CityGetPayload<S extends boolean | null | undefined | CityDefaultArgs> = $Result.GetResult<Prisma.$CityPayload, S>

  type CityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CityCountAggregateInputType | true
    }

  export interface CityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['City'], meta: { name: 'City' } }
    /**
     * Find zero or one City that matches the filter.
     * @param {CityFindUniqueArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CityFindUniqueArgs>(args: SelectSubset<T, CityFindUniqueArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUnique", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find one City that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CityFindUniqueOrThrowArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CityFindUniqueOrThrowArgs>(args: SelectSubset<T, CityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find the first City that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindFirstArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CityFindFirstArgs>(args?: SelectSubset<T, CityFindFirstArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findFirst", ClientOptions> | null, null, ExtArgs, ClientOptions>

    /**
     * Find the first City that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindFirstOrThrowArgs} args - Arguments to find a City
     * @example
     * // Get one City
     * const city = await prisma.city.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CityFindFirstOrThrowArgs>(args?: SelectSubset<T, CityFindFirstOrThrowArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findFirstOrThrow", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Find zero or more Cities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Cities
     * const cities = await prisma.city.findMany()
     * 
     * // Get first 10 Cities
     * const cities = await prisma.city.findMany({ take: 10 })
     * 
     * // Only select the `city_id`
     * const cityWithCity_idOnly = await prisma.city.findMany({ select: { city_id: true } })
     * 
     */
    findMany<T extends CityFindManyArgs>(args?: SelectSubset<T, CityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "findMany", ClientOptions>>

    /**
     * Create a City.
     * @param {CityCreateArgs} args - Arguments to create a City.
     * @example
     * // Create one City
     * const City = await prisma.city.create({
     *   data: {
     *     // ... data to create a City
     *   }
     * })
     * 
     */
    create<T extends CityCreateArgs>(args: SelectSubset<T, CityCreateArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "create", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Create many Cities.
     * @param {CityCreateManyArgs} args - Arguments to create many Cities.
     * @example
     * // Create many Cities
     * const city = await prisma.city.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CityCreateManyArgs>(args?: SelectSubset<T, CityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Cities and returns the data saved in the database.
     * @param {CityCreateManyAndReturnArgs} args - Arguments to create many Cities.
     * @example
     * // Create many Cities
     * const city = await prisma.city.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Cities and only return the `city_id`
     * const cityWithCity_idOnly = await prisma.city.createManyAndReturn({
     *   select: { city_id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CityCreateManyAndReturnArgs>(args?: SelectSubset<T, CityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "createManyAndReturn", ClientOptions>>

    /**
     * Delete a City.
     * @param {CityDeleteArgs} args - Arguments to delete one City.
     * @example
     * // Delete one City
     * const City = await prisma.city.delete({
     *   where: {
     *     // ... filter to delete one City
     *   }
     * })
     * 
     */
    delete<T extends CityDeleteArgs>(args: SelectSubset<T, CityDeleteArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "delete", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Update one City.
     * @param {CityUpdateArgs} args - Arguments to update one City.
     * @example
     * // Update one City
     * const city = await prisma.city.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CityUpdateArgs>(args: SelectSubset<T, CityUpdateArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "update", ClientOptions>, never, ExtArgs, ClientOptions>

    /**
     * Delete zero or more Cities.
     * @param {CityDeleteManyArgs} args - Arguments to filter Cities to delete.
     * @example
     * // Delete a few Cities
     * const { count } = await prisma.city.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CityDeleteManyArgs>(args?: SelectSubset<T, CityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Cities
     * const city = await prisma.city.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CityUpdateManyArgs>(args: SelectSubset<T, CityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Cities and returns the data updated in the database.
     * @param {CityUpdateManyAndReturnArgs} args - Arguments to update many Cities.
     * @example
     * // Update many Cities
     * const city = await prisma.city.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Cities and only return the `city_id`
     * const cityWithCity_idOnly = await prisma.city.updateManyAndReturn({
     *   select: { city_id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CityUpdateManyAndReturnArgs>(args: SelectSubset<T, CityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "updateManyAndReturn", ClientOptions>>

    /**
     * Create or update one City.
     * @param {CityUpsertArgs} args - Arguments to update or create a City.
     * @example
     * // Update or create a City
     * const city = await prisma.city.upsert({
     *   create: {
     *     // ... data to create a City
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the City we want to update
     *   }
     * })
     */
    upsert<T extends CityUpsertArgs>(args: SelectSubset<T, CityUpsertArgs<ExtArgs>>): Prisma__CityClient<$Result.GetResult<Prisma.$CityPayload<ExtArgs>, T, "upsert", ClientOptions>, never, ExtArgs, ClientOptions>


    /**
     * Count the number of Cities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityCountArgs} args - Arguments to filter Cities to count.
     * @example
     * // Count the number of Cities
     * const count = await prisma.city.count({
     *   where: {
     *     // ... the filter for the Cities we want to count
     *   }
     * })
    **/
    count<T extends CityCountArgs>(
      args?: Subset<T, CityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CityAggregateArgs>(args: Subset<T, CityAggregateArgs>): Prisma.PrismaPromise<GetCityAggregateType<T>>

    /**
     * Group by City.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CityGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CityGroupByArgs['orderBy'] }
        : { orderBy?: CityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the City model
   */
  readonly fields: CityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for City.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    county<T extends CountyDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CountyDefaultArgs<ExtArgs>>): Prisma__CountyClient<$Result.GetResult<Prisma.$CountyPayload<ExtArgs>, T, "findUniqueOrThrow", ClientOptions> | Null, Null, ExtArgs, ClientOptions>
    School<T extends City$SchoolArgs<ExtArgs> = {}>(args?: Subset<T, City$SchoolArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SchoolPayload<ExtArgs>, T, "findMany", ClientOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the City model
   */ 
  interface CityFieldRefs {
    readonly city_id: FieldRef<"City", 'Int'>
    readonly city_name: FieldRef<"City", 'String'>
    readonly county_id: FieldRef<"City", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * City findUnique
   */
  export type CityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City findUniqueOrThrow
   */
  export type CityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City findFirst
   */
  export type CityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cities.
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cities.
     */
    distinct?: CityScalarFieldEnum | CityScalarFieldEnum[]
  }

  /**
   * City findFirstOrThrow
   */
  export type CityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which City to fetch.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Cities.
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Cities.
     */
    distinct?: CityScalarFieldEnum | CityScalarFieldEnum[]
  }

  /**
   * City findMany
   */
  export type CityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter, which Cities to fetch.
     */
    where?: CityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Cities to fetch.
     */
    orderBy?: CityOrderByWithRelationInput | CityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Cities.
     */
    cursor?: CityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Cities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Cities.
     */
    skip?: number
    distinct?: CityScalarFieldEnum | CityScalarFieldEnum[]
  }

  /**
   * City create
   */
  export type CityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * The data needed to create a City.
     */
    data: XOR<CityCreateInput, CityUncheckedCreateInput>
  }

  /**
   * City createMany
   */
  export type CityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Cities.
     */
    data: CityCreateManyInput | CityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * City createManyAndReturn
   */
  export type CityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * The data used to create many Cities.
     */
    data: CityCreateManyInput | CityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * City update
   */
  export type CityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * The data needed to update a City.
     */
    data: XOR<CityUpdateInput, CityUncheckedUpdateInput>
    /**
     * Choose, which City to update.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City updateMany
   */
  export type CityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Cities.
     */
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyInput>
    /**
     * Filter which Cities to update
     */
    where?: CityWhereInput
  }

  /**
   * City updateManyAndReturn
   */
  export type CityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * The data used to update Cities.
     */
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyInput>
    /**
     * Filter which Cities to update
     */
    where?: CityWhereInput
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * City upsert
   */
  export type CityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * The filter to search for the City to update in case it exists.
     */
    where: CityWhereUniqueInput
    /**
     * In case the City found by the `where` argument doesn't exist, create a new City with this data.
     */
    create: XOR<CityCreateInput, CityUncheckedCreateInput>
    /**
     * In case the City was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CityUpdateInput, CityUncheckedUpdateInput>
  }

  /**
   * City delete
   */
  export type CityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
    /**
     * Filter which City to delete.
     */
    where: CityWhereUniqueInput
  }

  /**
   * City deleteMany
   */
  export type CityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Cities to delete
     */
    where?: CityWhereInput
  }

  /**
   * City.School
   */
  export type City$SchoolArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the School
     */
    select?: SchoolSelect<ExtArgs> | null
    /**
     * Omit specific fields from the School
     */
    omit?: SchoolOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SchoolInclude<ExtArgs> | null
    where?: SchoolWhereInput
    orderBy?: SchoolOrderByWithRelationInput | SchoolOrderByWithRelationInput[]
    cursor?: SchoolWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SchoolScalarFieldEnum | SchoolScalarFieldEnum[]
  }

  /**
   * City without action
   */
  export type CityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the City
     */
    select?: CitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the City
     */
    omit?: CityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CityInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SchoolScalarFieldEnum: {
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

  export type SchoolScalarFieldEnum = (typeof SchoolScalarFieldEnum)[keyof typeof SchoolScalarFieldEnum]


  export const ContactScalarFieldEnum: {
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

  export type ContactScalarFieldEnum = (typeof ContactScalarFieldEnum)[keyof typeof ContactScalarFieldEnum]


  export const UserScalarFieldEnum: {
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

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EventScalarFieldEnum: {
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

  export type EventScalarFieldEnum = (typeof EventScalarFieldEnum)[keyof typeof EventScalarFieldEnum]


  export const InterestedStudentsScalarFieldEnum: {
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

  export type InterestedStudentsScalarFieldEnum = (typeof InterestedStudentsScalarFieldEnum)[keyof typeof InterestedStudentsScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    act_id: 'act_id',
    start_date: 'start_date',
    end_date: 'end_date',
    act_name: 'act_name',
    act_note: 'act_note',
    on_duty: 'on_duty',
    dir_flag: 'dir_flag',
    all_region: 'all_region'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const CountryScalarFieldEnum: {
    country_id: 'country_id',
    country_name: 'country_name'
  };

  export type CountryScalarFieldEnum = (typeof CountryScalarFieldEnum)[keyof typeof CountryScalarFieldEnum]


  export const RegionScalarFieldEnum: {
    region_id: 'region_id',
    region_name: 'region_name',
    country_id: 'country_id'
  };

  export type RegionScalarFieldEnum = (typeof RegionScalarFieldEnum)[keyof typeof RegionScalarFieldEnum]


  export const CountyScalarFieldEnum: {
    county_id: 'county_id',
    county_name: 'county_name',
    region_id: 'region_id'
  };

  export type CountyScalarFieldEnum = (typeof CountyScalarFieldEnum)[keyof typeof CountyScalarFieldEnum]


  export const CityScalarFieldEnum: {
    city_id: 'city_id',
    city_name: 'city_name',
    county_id: 'county_id'
  };

  export type CityScalarFieldEnum = (typeof CityScalarFieldEnum)[keyof typeof CityScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SchoolWhereInput = {
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    school_id?: IntFilter<"School"> | number
    om_id?: StringNullableFilter<"School"> | string | null
    school_name?: StringFilter<"School"> | string
    zip_code?: StringFilter<"School"> | string
    address?: StringFilter<"School"> | string
    dir_name?: StringNullableFilter<"School"> | string | null
    dir_phone?: StringNullableFilter<"School"> | string | null
    school_email?: StringFilter<"School"> | string
    website?: StringNullableFilter<"School"> | string | null
    school_type?: StringNullableListFilter<"School">
    coop?: BoolNullableFilter<"School"> | boolean | null
    note?: StringNullableFilter<"School"> | string | null
    city_id?: IntFilter<"School"> | number
    country_id?: IntFilter<"School"> | number
    county_id?: IntFilter<"School"> | number
    region_id?: IntFilter<"School"> | number
    duty?: StringNullableListFilter<"School">
    active?: BoolFilter<"School"> | boolean
    active_by?: StringFilter<"School"> | string
    basic?: BoolFilter<"School"> | boolean
    medior?: BoolFilter<"School"> | boolean
    high?: BoolFilter<"School"> | boolean
    Contact?: ContactListRelationFilter
    Event?: EventListRelationFilter
    city?: XOR<CityScalarRelationFilter, CityWhereInput>
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    county?: XOR<CountyScalarRelationFilter, CountyWhereInput>
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
    User?: UserListRelationFilter
  }

  export type SchoolOrderByWithRelationInput = {
    school_id?: SortOrder
    om_id?: SortOrderInput | SortOrder
    school_name?: SortOrder
    zip_code?: SortOrder
    address?: SortOrder
    dir_name?: SortOrderInput | SortOrder
    dir_phone?: SortOrderInput | SortOrder
    school_email?: SortOrder
    website?: SortOrderInput | SortOrder
    school_type?: SortOrder
    coop?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    city_id?: SortOrder
    country_id?: SortOrder
    county_id?: SortOrder
    region_id?: SortOrder
    duty?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    basic?: SortOrder
    medior?: SortOrder
    high?: SortOrder
    Contact?: ContactOrderByRelationAggregateInput
    Event?: EventOrderByRelationAggregateInput
    city?: CityOrderByWithRelationInput
    country?: CountryOrderByWithRelationInput
    county?: CountyOrderByWithRelationInput
    region?: RegionOrderByWithRelationInput
    User?: UserOrderByRelationAggregateInput
  }

  export type SchoolWhereUniqueInput = Prisma.AtLeast<{
    school_id?: number
    school_email?: string
    AND?: SchoolWhereInput | SchoolWhereInput[]
    OR?: SchoolWhereInput[]
    NOT?: SchoolWhereInput | SchoolWhereInput[]
    om_id?: StringNullableFilter<"School"> | string | null
    school_name?: StringFilter<"School"> | string
    zip_code?: StringFilter<"School"> | string
    address?: StringFilter<"School"> | string
    dir_name?: StringNullableFilter<"School"> | string | null
    dir_phone?: StringNullableFilter<"School"> | string | null
    website?: StringNullableFilter<"School"> | string | null
    school_type?: StringNullableListFilter<"School">
    coop?: BoolNullableFilter<"School"> | boolean | null
    note?: StringNullableFilter<"School"> | string | null
    city_id?: IntFilter<"School"> | number
    country_id?: IntFilter<"School"> | number
    county_id?: IntFilter<"School"> | number
    region_id?: IntFilter<"School"> | number
    duty?: StringNullableListFilter<"School">
    active?: BoolFilter<"School"> | boolean
    active_by?: StringFilter<"School"> | string
    basic?: BoolFilter<"School"> | boolean
    medior?: BoolFilter<"School"> | boolean
    high?: BoolFilter<"School"> | boolean
    Contact?: ContactListRelationFilter
    Event?: EventListRelationFilter
    city?: XOR<CityScalarRelationFilter, CityWhereInput>
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    county?: XOR<CountyScalarRelationFilter, CountyWhereInput>
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
    User?: UserListRelationFilter
  }, "school_id" | "school_email">

  export type SchoolOrderByWithAggregationInput = {
    school_id?: SortOrder
    om_id?: SortOrderInput | SortOrder
    school_name?: SortOrder
    zip_code?: SortOrder
    address?: SortOrder
    dir_name?: SortOrderInput | SortOrder
    dir_phone?: SortOrderInput | SortOrder
    school_email?: SortOrder
    website?: SortOrderInput | SortOrder
    school_type?: SortOrder
    coop?: SortOrderInput | SortOrder
    note?: SortOrderInput | SortOrder
    city_id?: SortOrder
    country_id?: SortOrder
    county_id?: SortOrder
    region_id?: SortOrder
    duty?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    basic?: SortOrder
    medior?: SortOrder
    high?: SortOrder
    _count?: SchoolCountOrderByAggregateInput
    _avg?: SchoolAvgOrderByAggregateInput
    _max?: SchoolMaxOrderByAggregateInput
    _min?: SchoolMinOrderByAggregateInput
    _sum?: SchoolSumOrderByAggregateInput
  }

  export type SchoolScalarWhereWithAggregatesInput = {
    AND?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    OR?: SchoolScalarWhereWithAggregatesInput[]
    NOT?: SchoolScalarWhereWithAggregatesInput | SchoolScalarWhereWithAggregatesInput[]
    school_id?: IntWithAggregatesFilter<"School"> | number
    om_id?: StringNullableWithAggregatesFilter<"School"> | string | null
    school_name?: StringWithAggregatesFilter<"School"> | string
    zip_code?: StringWithAggregatesFilter<"School"> | string
    address?: StringWithAggregatesFilter<"School"> | string
    dir_name?: StringNullableWithAggregatesFilter<"School"> | string | null
    dir_phone?: StringNullableWithAggregatesFilter<"School"> | string | null
    school_email?: StringWithAggregatesFilter<"School"> | string
    website?: StringNullableWithAggregatesFilter<"School"> | string | null
    school_type?: StringNullableListFilter<"School">
    coop?: BoolNullableWithAggregatesFilter<"School"> | boolean | null
    note?: StringNullableWithAggregatesFilter<"School"> | string | null
    city_id?: IntWithAggregatesFilter<"School"> | number
    country_id?: IntWithAggregatesFilter<"School"> | number
    county_id?: IntWithAggregatesFilter<"School"> | number
    region_id?: IntWithAggregatesFilter<"School"> | number
    duty?: StringNullableListFilter<"School">
    active?: BoolWithAggregatesFilter<"School"> | boolean
    active_by?: StringWithAggregatesFilter<"School"> | string
    basic?: BoolWithAggregatesFilter<"School"> | boolean
    medior?: BoolWithAggregatesFilter<"School"> | boolean
    high?: BoolWithAggregatesFilter<"School"> | boolean
  }

  export type ContactWhereInput = {
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    contact_id?: IntFilter<"Contact"> | number
    contact_email?: StringFilter<"Contact"> | string
    contact_name?: StringNullableFilter<"Contact"> | string | null
    contact_phone?: StringNullableFilter<"Contact"> | string | null
    contact_note?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    active?: BoolFilter<"Contact"> | boolean
    active_by?: StringFilter<"Contact"> | string
    school_id?: IntNullableFilter<"Contact"> | number | null
    School?: XOR<SchoolNullableScalarRelationFilter, SchoolWhereInput> | null
    User?: UserListRelationFilter
  }

  export type ContactOrderByWithRelationInput = {
    contact_id?: SortOrder
    contact_email?: SortOrder
    contact_name?: SortOrderInput | SortOrder
    contact_phone?: SortOrderInput | SortOrder
    contact_note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    school_id?: SortOrderInput | SortOrder
    School?: SchoolOrderByWithRelationInput
    User?: UserOrderByRelationAggregateInput
  }

  export type ContactWhereUniqueInput = Prisma.AtLeast<{
    contact_id?: number
    contact_email?: string
    AND?: ContactWhereInput | ContactWhereInput[]
    OR?: ContactWhereInput[]
    NOT?: ContactWhereInput | ContactWhereInput[]
    contact_name?: StringNullableFilter<"Contact"> | string | null
    contact_phone?: StringNullableFilter<"Contact"> | string | null
    contact_note?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    active?: BoolFilter<"Contact"> | boolean
    active_by?: StringFilter<"Contact"> | string
    school_id?: IntNullableFilter<"Contact"> | number | null
    School?: XOR<SchoolNullableScalarRelationFilter, SchoolWhereInput> | null
    User?: UserListRelationFilter
  }, "contact_id" | "contact_email">

  export type ContactOrderByWithAggregationInput = {
    contact_id?: SortOrder
    contact_email?: SortOrder
    contact_name?: SortOrderInput | SortOrder
    contact_phone?: SortOrderInput | SortOrder
    contact_note?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    school_id?: SortOrderInput | SortOrder
    _count?: ContactCountOrderByAggregateInput
    _avg?: ContactAvgOrderByAggregateInput
    _max?: ContactMaxOrderByAggregateInput
    _min?: ContactMinOrderByAggregateInput
    _sum?: ContactSumOrderByAggregateInput
  }

  export type ContactScalarWhereWithAggregatesInput = {
    AND?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    OR?: ContactScalarWhereWithAggregatesInput[]
    NOT?: ContactScalarWhereWithAggregatesInput | ContactScalarWhereWithAggregatesInput[]
    contact_id?: IntWithAggregatesFilter<"Contact"> | number
    contact_email?: StringWithAggregatesFilter<"Contact"> | string
    contact_name?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    contact_phone?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    contact_note?: StringNullableWithAggregatesFilter<"Contact"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Contact"> | Date | string
    active?: BoolWithAggregatesFilter<"Contact"> | boolean
    active_by?: StringWithAggregatesFilter<"Contact"> | string
    school_id?: IntNullableWithAggregatesFilter<"Contact"> | number | null
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_id?: StringFilter<"User"> | string
    user_name?: StringFilter<"User"> | string
    nationality?: StringFilter<"User"> | string
    user_phone?: StringFilter<"User"> | string
    user_email?: StringFilter<"User"> | string
    on_duty?: IntNullableListFilter<"User">
    passwordHash?: StringFilter<"User"> | string
    userAuthToken?: StringFilter<"User"> | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    active?: BoolFilter<"User"> | boolean
    active_by?: StringFilter<"User"> | string
    Contact?: ContactListRelationFilter
    Event?: EventListRelationFilter
    School?: SchoolListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    nationality?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    on_duty?: SortOrder
    passwordHash?: SortOrder
    userAuthToken?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    Contact?: ContactOrderByRelationAggregateInput
    Event?: EventOrderByRelationAggregateInput
    School?: SchoolOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    user_id?: string
    user_email?: string
    userAuthToken?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    user_name?: StringFilter<"User"> | string
    nationality?: StringFilter<"User"> | string
    user_phone?: StringFilter<"User"> | string
    on_duty?: IntNullableListFilter<"User">
    passwordHash?: StringFilter<"User"> | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    active?: BoolFilter<"User"> | boolean
    active_by?: StringFilter<"User"> | string
    Contact?: ContactListRelationFilter
    Event?: EventListRelationFilter
    School?: SchoolListRelationFilter
  }, "user_id" | "user_email" | "userAuthToken">

  export type UserOrderByWithAggregationInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    nationality?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    on_duty?: SortOrder
    passwordHash?: SortOrder
    userAuthToken?: SortOrder
    resetToken?: SortOrderInput | SortOrder
    resetTokenExpiry?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    user_id?: StringWithAggregatesFilter<"User"> | string
    user_name?: StringWithAggregatesFilter<"User"> | string
    nationality?: StringWithAggregatesFilter<"User"> | string
    user_phone?: StringWithAggregatesFilter<"User"> | string
    user_email?: StringWithAggregatesFilter<"User"> | string
    on_duty?: IntNullableListFilter<"User">
    passwordHash?: StringWithAggregatesFilter<"User"> | string
    userAuthToken?: StringWithAggregatesFilter<"User"> | string
    resetToken?: StringNullableWithAggregatesFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    active?: BoolWithAggregatesFilter<"User"> | boolean
    active_by?: StringWithAggregatesFilter<"User"> | string
  }

  export type EventWhereInput = {
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    event_id?: IntFilter<"Event"> | number
    event_name?: StringFilter<"Event"> | string
    create_date?: DateTimeFilter<"Event"> | Date | string
    closing_date?: DateTimeFilter<"Event"> | Date | string
    event_year?: IntFilter<"Event"> | number
    semester?: StringFilter<"Event"> | string
    on_duty?: StringFilter<"Event"> | string
    event_type?: StringFilter<"Event"> | string
    estimated_student?: IntFilter<"Event"> | number
    note?: StringNullableFilter<"Event"> | string | null
    slug?: StringFilter<"Event"> | string
    school_id?: IntFilter<"Event"> | number
    School?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
    User?: UserListRelationFilter
    InterestedStudents?: InterestedStudentsListRelationFilter
  }

  export type EventOrderByWithRelationInput = {
    event_id?: SortOrder
    event_name?: SortOrder
    create_date?: SortOrder
    closing_date?: SortOrder
    event_year?: SortOrder
    semester?: SortOrder
    on_duty?: SortOrder
    event_type?: SortOrder
    estimated_student?: SortOrder
    note?: SortOrderInput | SortOrder
    slug?: SortOrder
    school_id?: SortOrder
    School?: SchoolOrderByWithRelationInput
    User?: UserOrderByRelationAggregateInput
    InterestedStudents?: InterestedStudentsOrderByRelationAggregateInput
  }

  export type EventWhereUniqueInput = Prisma.AtLeast<{
    event_id?: number
    slug?: string
    AND?: EventWhereInput | EventWhereInput[]
    OR?: EventWhereInput[]
    NOT?: EventWhereInput | EventWhereInput[]
    event_name?: StringFilter<"Event"> | string
    create_date?: DateTimeFilter<"Event"> | Date | string
    closing_date?: DateTimeFilter<"Event"> | Date | string
    event_year?: IntFilter<"Event"> | number
    semester?: StringFilter<"Event"> | string
    on_duty?: StringFilter<"Event"> | string
    event_type?: StringFilter<"Event"> | string
    estimated_student?: IntFilter<"Event"> | number
    note?: StringNullableFilter<"Event"> | string | null
    school_id?: IntFilter<"Event"> | number
    School?: XOR<SchoolScalarRelationFilter, SchoolWhereInput>
    User?: UserListRelationFilter
    InterestedStudents?: InterestedStudentsListRelationFilter
  }, "event_id" | "slug">

  export type EventOrderByWithAggregationInput = {
    event_id?: SortOrder
    event_name?: SortOrder
    create_date?: SortOrder
    closing_date?: SortOrder
    event_year?: SortOrder
    semester?: SortOrder
    on_duty?: SortOrder
    event_type?: SortOrder
    estimated_student?: SortOrder
    note?: SortOrderInput | SortOrder
    slug?: SortOrder
    school_id?: SortOrder
    _count?: EventCountOrderByAggregateInput
    _avg?: EventAvgOrderByAggregateInput
    _max?: EventMaxOrderByAggregateInput
    _min?: EventMinOrderByAggregateInput
    _sum?: EventSumOrderByAggregateInput
  }

  export type EventScalarWhereWithAggregatesInput = {
    AND?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    OR?: EventScalarWhereWithAggregatesInput[]
    NOT?: EventScalarWhereWithAggregatesInput | EventScalarWhereWithAggregatesInput[]
    event_id?: IntWithAggregatesFilter<"Event"> | number
    event_name?: StringWithAggregatesFilter<"Event"> | string
    create_date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    closing_date?: DateTimeWithAggregatesFilter<"Event"> | Date | string
    event_year?: IntWithAggregatesFilter<"Event"> | number
    semester?: StringWithAggregatesFilter<"Event"> | string
    on_duty?: StringWithAggregatesFilter<"Event"> | string
    event_type?: StringWithAggregatesFilter<"Event"> | string
    estimated_student?: IntWithAggregatesFilter<"Event"> | number
    note?: StringNullableWithAggregatesFilter<"Event"> | string | null
    slug?: StringWithAggregatesFilter<"Event"> | string
    school_id?: IntWithAggregatesFilter<"Event"> | number
  }

  export type InterestedStudentsWhereInput = {
    AND?: InterestedStudentsWhereInput | InterestedStudentsWhereInput[]
    OR?: InterestedStudentsWhereInput[]
    NOT?: InterestedStudentsWhereInput | InterestedStudentsWhereInput[]
    intrest_id?: IntFilter<"InterestedStudents"> | number
    event_id?: IntFilter<"InterestedStudents"> | number
    intrest_count?: IntFilter<"InterestedStudents"> | number
    grade?: StringFilter<"InterestedStudents"> | string
    applied?: BoolFilter<"InterestedStudents"> | boolean
    work_title?: StringFilter<"InterestedStudents"> | string
    channel?: StringFilter<"InterestedStudents"> | string
    status?: StringFilter<"InterestedStudents"> | string
    country_id?: IntFilter<"InterestedStudents"> | number
    region_id?: IntFilter<"InterestedStudents"> | number
    Country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    Event?: XOR<EventScalarRelationFilter, EventWhereInput>
    Region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }

  export type InterestedStudentsOrderByWithRelationInput = {
    intrest_id?: SortOrder
    event_id?: SortOrder
    intrest_count?: SortOrder
    grade?: SortOrder
    applied?: SortOrder
    work_title?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    country_id?: SortOrder
    region_id?: SortOrder
    Country?: CountryOrderByWithRelationInput
    Event?: EventOrderByWithRelationInput
    Region?: RegionOrderByWithRelationInput
  }

  export type InterestedStudentsWhereUniqueInput = Prisma.AtLeast<{
    intrest_id?: number
    AND?: InterestedStudentsWhereInput | InterestedStudentsWhereInput[]
    OR?: InterestedStudentsWhereInput[]
    NOT?: InterestedStudentsWhereInput | InterestedStudentsWhereInput[]
    event_id?: IntFilter<"InterestedStudents"> | number
    intrest_count?: IntFilter<"InterestedStudents"> | number
    grade?: StringFilter<"InterestedStudents"> | string
    applied?: BoolFilter<"InterestedStudents"> | boolean
    work_title?: StringFilter<"InterestedStudents"> | string
    channel?: StringFilter<"InterestedStudents"> | string
    status?: StringFilter<"InterestedStudents"> | string
    country_id?: IntFilter<"InterestedStudents"> | number
    region_id?: IntFilter<"InterestedStudents"> | number
    Country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    Event?: XOR<EventScalarRelationFilter, EventWhereInput>
    Region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
  }, "intrest_id">

  export type InterestedStudentsOrderByWithAggregationInput = {
    intrest_id?: SortOrder
    event_id?: SortOrder
    intrest_count?: SortOrder
    grade?: SortOrder
    applied?: SortOrder
    work_title?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    country_id?: SortOrder
    region_id?: SortOrder
    _count?: InterestedStudentsCountOrderByAggregateInput
    _avg?: InterestedStudentsAvgOrderByAggregateInput
    _max?: InterestedStudentsMaxOrderByAggregateInput
    _min?: InterestedStudentsMinOrderByAggregateInput
    _sum?: InterestedStudentsSumOrderByAggregateInput
  }

  export type InterestedStudentsScalarWhereWithAggregatesInput = {
    AND?: InterestedStudentsScalarWhereWithAggregatesInput | InterestedStudentsScalarWhereWithAggregatesInput[]
    OR?: InterestedStudentsScalarWhereWithAggregatesInput[]
    NOT?: InterestedStudentsScalarWhereWithAggregatesInput | InterestedStudentsScalarWhereWithAggregatesInput[]
    intrest_id?: IntWithAggregatesFilter<"InterestedStudents"> | number
    event_id?: IntWithAggregatesFilter<"InterestedStudents"> | number
    intrest_count?: IntWithAggregatesFilter<"InterestedStudents"> | number
    grade?: StringWithAggregatesFilter<"InterestedStudents"> | string
    applied?: BoolWithAggregatesFilter<"InterestedStudents"> | boolean
    work_title?: StringWithAggregatesFilter<"InterestedStudents"> | string
    channel?: StringWithAggregatesFilter<"InterestedStudents"> | string
    status?: StringWithAggregatesFilter<"InterestedStudents"> | string
    country_id?: IntWithAggregatesFilter<"InterestedStudents"> | number
    region_id?: IntWithAggregatesFilter<"InterestedStudents"> | number
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    act_id?: IntFilter<"Activity"> | number
    start_date?: DateTimeFilter<"Activity"> | Date | string
    end_date?: DateTimeFilter<"Activity"> | Date | string
    act_name?: StringFilter<"Activity"> | string
    act_note?: StringNullableFilter<"Activity"> | string | null
    on_duty?: StringFilter<"Activity"> | string
    dir_flag?: BoolFilter<"Activity"> | boolean
    all_region?: BoolFilter<"Activity"> | boolean
  }

  export type ActivityOrderByWithRelationInput = {
    act_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    act_name?: SortOrder
    act_note?: SortOrderInput | SortOrder
    on_duty?: SortOrder
    dir_flag?: SortOrder
    all_region?: SortOrder
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    act_id?: number
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    start_date?: DateTimeFilter<"Activity"> | Date | string
    end_date?: DateTimeFilter<"Activity"> | Date | string
    act_name?: StringFilter<"Activity"> | string
    act_note?: StringNullableFilter<"Activity"> | string | null
    on_duty?: StringFilter<"Activity"> | string
    dir_flag?: BoolFilter<"Activity"> | boolean
    all_region?: BoolFilter<"Activity"> | boolean
  }, "act_id">

  export type ActivityOrderByWithAggregationInput = {
    act_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    act_name?: SortOrder
    act_note?: SortOrderInput | SortOrder
    on_duty?: SortOrder
    dir_flag?: SortOrder
    all_region?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _avg?: ActivityAvgOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
    _sum?: ActivitySumOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    act_id?: IntWithAggregatesFilter<"Activity"> | number
    start_date?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    end_date?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    act_name?: StringWithAggregatesFilter<"Activity"> | string
    act_note?: StringNullableWithAggregatesFilter<"Activity"> | string | null
    on_duty?: StringWithAggregatesFilter<"Activity"> | string
    dir_flag?: BoolWithAggregatesFilter<"Activity"> | boolean
    all_region?: BoolWithAggregatesFilter<"Activity"> | boolean
  }

  export type CountryWhereInput = {
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    country_id?: IntFilter<"Country"> | number
    country_name?: StringFilter<"Country"> | string
    InterestedStudent?: InterestedStudentsListRelationFilter
    Region?: RegionListRelationFilter
    School?: SchoolListRelationFilter
  }

  export type CountryOrderByWithRelationInput = {
    country_id?: SortOrder
    country_name?: SortOrder
    InterestedStudent?: InterestedStudentsOrderByRelationAggregateInput
    Region?: RegionOrderByRelationAggregateInput
    School?: SchoolOrderByRelationAggregateInput
  }

  export type CountryWhereUniqueInput = Prisma.AtLeast<{
    country_id?: number
    country_name?: string
    AND?: CountryWhereInput | CountryWhereInput[]
    OR?: CountryWhereInput[]
    NOT?: CountryWhereInput | CountryWhereInput[]
    InterestedStudent?: InterestedStudentsListRelationFilter
    Region?: RegionListRelationFilter
    School?: SchoolListRelationFilter
  }, "country_id" | "country_name">

  export type CountryOrderByWithAggregationInput = {
    country_id?: SortOrder
    country_name?: SortOrder
    _count?: CountryCountOrderByAggregateInput
    _avg?: CountryAvgOrderByAggregateInput
    _max?: CountryMaxOrderByAggregateInput
    _min?: CountryMinOrderByAggregateInput
    _sum?: CountrySumOrderByAggregateInput
  }

  export type CountryScalarWhereWithAggregatesInput = {
    AND?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    OR?: CountryScalarWhereWithAggregatesInput[]
    NOT?: CountryScalarWhereWithAggregatesInput | CountryScalarWhereWithAggregatesInput[]
    country_id?: IntWithAggregatesFilter<"Country"> | number
    country_name?: StringWithAggregatesFilter<"Country"> | string
  }

  export type RegionWhereInput = {
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    region_id?: IntFilter<"Region"> | number
    region_name?: StringFilter<"Region"> | string
    country_id?: IntFilter<"Region"> | number
    County?: CountyListRelationFilter
    InterestedStudent?: InterestedStudentsListRelationFilter
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    School?: SchoolListRelationFilter
  }

  export type RegionOrderByWithRelationInput = {
    region_id?: SortOrder
    region_name?: SortOrder
    country_id?: SortOrder
    County?: CountyOrderByRelationAggregateInput
    InterestedStudent?: InterestedStudentsOrderByRelationAggregateInput
    country?: CountryOrderByWithRelationInput
    School?: SchoolOrderByRelationAggregateInput
  }

  export type RegionWhereUniqueInput = Prisma.AtLeast<{
    region_id?: number
    region_name?: string
    AND?: RegionWhereInput | RegionWhereInput[]
    OR?: RegionWhereInput[]
    NOT?: RegionWhereInput | RegionWhereInput[]
    country_id?: IntFilter<"Region"> | number
    County?: CountyListRelationFilter
    InterestedStudent?: InterestedStudentsListRelationFilter
    country?: XOR<CountryScalarRelationFilter, CountryWhereInput>
    School?: SchoolListRelationFilter
  }, "region_id" | "region_name">

  export type RegionOrderByWithAggregationInput = {
    region_id?: SortOrder
    region_name?: SortOrder
    country_id?: SortOrder
    _count?: RegionCountOrderByAggregateInput
    _avg?: RegionAvgOrderByAggregateInput
    _max?: RegionMaxOrderByAggregateInput
    _min?: RegionMinOrderByAggregateInput
    _sum?: RegionSumOrderByAggregateInput
  }

  export type RegionScalarWhereWithAggregatesInput = {
    AND?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    OR?: RegionScalarWhereWithAggregatesInput[]
    NOT?: RegionScalarWhereWithAggregatesInput | RegionScalarWhereWithAggregatesInput[]
    region_id?: IntWithAggregatesFilter<"Region"> | number
    region_name?: StringWithAggregatesFilter<"Region"> | string
    country_id?: IntWithAggregatesFilter<"Region"> | number
  }

  export type CountyWhereInput = {
    AND?: CountyWhereInput | CountyWhereInput[]
    OR?: CountyWhereInput[]
    NOT?: CountyWhereInput | CountyWhereInput[]
    county_id?: IntFilter<"County"> | number
    county_name?: StringFilter<"County"> | string
    region_id?: IntFilter<"County"> | number
    city?: CityListRelationFilter
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
    School?: SchoolListRelationFilter
  }

  export type CountyOrderByWithRelationInput = {
    county_id?: SortOrder
    county_name?: SortOrder
    region_id?: SortOrder
    city?: CityOrderByRelationAggregateInput
    region?: RegionOrderByWithRelationInput
    School?: SchoolOrderByRelationAggregateInput
  }

  export type CountyWhereUniqueInput = Prisma.AtLeast<{
    county_id?: number
    county_name?: string
    AND?: CountyWhereInput | CountyWhereInput[]
    OR?: CountyWhereInput[]
    NOT?: CountyWhereInput | CountyWhereInput[]
    region_id?: IntFilter<"County"> | number
    city?: CityListRelationFilter
    region?: XOR<RegionScalarRelationFilter, RegionWhereInput>
    School?: SchoolListRelationFilter
  }, "county_id" | "county_name">

  export type CountyOrderByWithAggregationInput = {
    county_id?: SortOrder
    county_name?: SortOrder
    region_id?: SortOrder
    _count?: CountyCountOrderByAggregateInput
    _avg?: CountyAvgOrderByAggregateInput
    _max?: CountyMaxOrderByAggregateInput
    _min?: CountyMinOrderByAggregateInput
    _sum?: CountySumOrderByAggregateInput
  }

  export type CountyScalarWhereWithAggregatesInput = {
    AND?: CountyScalarWhereWithAggregatesInput | CountyScalarWhereWithAggregatesInput[]
    OR?: CountyScalarWhereWithAggregatesInput[]
    NOT?: CountyScalarWhereWithAggregatesInput | CountyScalarWhereWithAggregatesInput[]
    county_id?: IntWithAggregatesFilter<"County"> | number
    county_name?: StringWithAggregatesFilter<"County"> | string
    region_id?: IntWithAggregatesFilter<"County"> | number
  }

  export type CityWhereInput = {
    AND?: CityWhereInput | CityWhereInput[]
    OR?: CityWhereInput[]
    NOT?: CityWhereInput | CityWhereInput[]
    city_id?: IntFilter<"City"> | number
    city_name?: StringFilter<"City"> | string
    county_id?: IntFilter<"City"> | number
    county?: XOR<CountyScalarRelationFilter, CountyWhereInput>
    School?: SchoolListRelationFilter
  }

  export type CityOrderByWithRelationInput = {
    city_id?: SortOrder
    city_name?: SortOrder
    county_id?: SortOrder
    county?: CountyOrderByWithRelationInput
    School?: SchoolOrderByRelationAggregateInput
  }

  export type CityWhereUniqueInput = Prisma.AtLeast<{
    city_id?: number
    city_name?: string
    AND?: CityWhereInput | CityWhereInput[]
    OR?: CityWhereInput[]
    NOT?: CityWhereInput | CityWhereInput[]
    county_id?: IntFilter<"City"> | number
    county?: XOR<CountyScalarRelationFilter, CountyWhereInput>
    School?: SchoolListRelationFilter
  }, "city_id" | "city_name">

  export type CityOrderByWithAggregationInput = {
    city_id?: SortOrder
    city_name?: SortOrder
    county_id?: SortOrder
    _count?: CityCountOrderByAggregateInput
    _avg?: CityAvgOrderByAggregateInput
    _max?: CityMaxOrderByAggregateInput
    _min?: CityMinOrderByAggregateInput
    _sum?: CitySumOrderByAggregateInput
  }

  export type CityScalarWhereWithAggregatesInput = {
    AND?: CityScalarWhereWithAggregatesInput | CityScalarWhereWithAggregatesInput[]
    OR?: CityScalarWhereWithAggregatesInput[]
    NOT?: CityScalarWhereWithAggregatesInput | CityScalarWhereWithAggregatesInput[]
    city_id?: IntWithAggregatesFilter<"City"> | number
    city_name?: StringWithAggregatesFilter<"City"> | string
    county_id?: IntWithAggregatesFilter<"City"> | number
  }

  export type SchoolCreateInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactCreateNestedManyWithoutSchoolInput
    Event?: EventCreateNestedManyWithoutSchoolInput
    city: CityCreateNestedOneWithoutSchoolInput
    country: CountryCreateNestedOneWithoutSchoolInput
    county: CountyCreateNestedOneWithoutSchoolInput
    region: RegionCreateNestedOneWithoutSchoolInput
    User?: UserCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactUncheckedCreateNestedManyWithoutSchoolInput
    Event?: EventUncheckedCreateNestedManyWithoutSchoolInput
    User?: UserUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUpdateInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUpdateManyWithoutSchoolNestedInput
    Event?: EventUpdateManyWithoutSchoolNestedInput
    city?: CityUpdateOneRequiredWithoutSchoolNestedInput
    country?: CountryUpdateOneRequiredWithoutSchoolNestedInput
    county?: CountyUpdateOneRequiredWithoutSchoolNestedInput
    region?: RegionUpdateOneRequiredWithoutSchoolNestedInput
    User?: UserUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUncheckedUpdateManyWithoutSchoolNestedInput
    Event?: EventUncheckedUpdateManyWithoutSchoolNestedInput
    User?: UserUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolCreateManyInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
  }

  export type SchoolUpdateManyMutationInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SchoolUncheckedUpdateManyInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ContactCreateInput = {
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
    School?: SchoolCreateNestedOneWithoutContactInput
    User?: UserCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateInput = {
    contact_id?: number
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
    school_id?: number | null
    User?: UserUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactUpdateInput = {
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    School?: SchoolUpdateOneWithoutContactNestedInput
    User?: UserUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateInput = {
    contact_id?: IntFieldUpdateOperationsInput | number
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    school_id?: NullableIntFieldUpdateOperationsInput | number | null
    User?: UserUncheckedUpdateManyWithoutContactNestedInput
  }

  export type ContactCreateManyInput = {
    contact_id?: number
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
    school_id?: number | null
  }

  export type ContactUpdateManyMutationInput = {
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
  }

  export type ContactUncheckedUpdateManyInput = {
    contact_id?: IntFieldUpdateOperationsInput | number
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    school_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type UserCreateInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Contact?: ContactCreateNestedManyWithoutUserInput
    Event?: EventCreateNestedManyWithoutUserInput
    School?: SchoolCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Contact?: ContactUncheckedCreateNestedManyWithoutUserInput
    Event?: EventUncheckedCreateNestedManyWithoutUserInput
    School?: SchoolUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Contact?: ContactUpdateManyWithoutUserNestedInput
    Event?: EventUpdateManyWithoutUserNestedInput
    School?: SchoolUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Contact?: ContactUncheckedUpdateManyWithoutUserNestedInput
    Event?: EventUncheckedUpdateManyWithoutUserNestedInput
    School?: SchoolUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
  }

  export type UserUpdateManyMutationInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
  }

  export type UserUncheckedUpdateManyInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
  }

  export type EventCreateInput = {
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    School: SchoolCreateNestedOneWithoutEventInput
    User?: UserCreateNestedManyWithoutEventInput
    InterestedStudents?: InterestedStudentsCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateInput = {
    event_id?: number
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    school_id: number
    User?: UserUncheckedCreateNestedManyWithoutEventInput
    InterestedStudents?: InterestedStudentsUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventUpdateInput = {
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    School?: SchoolUpdateOneRequiredWithoutEventNestedInput
    User?: UserUpdateManyWithoutEventNestedInput
    InterestedStudents?: InterestedStudentsUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateInput = {
    event_id?: IntFieldUpdateOperationsInput | number
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    school_id?: IntFieldUpdateOperationsInput | number
    User?: UserUncheckedUpdateManyWithoutEventNestedInput
    InterestedStudents?: InterestedStudentsUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventCreateManyInput = {
    event_id?: number
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    school_id: number
  }

  export type EventUpdateManyMutationInput = {
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type EventUncheckedUpdateManyInput = {
    event_id?: IntFieldUpdateOperationsInput | number
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    school_id?: IntFieldUpdateOperationsInput | number
  }

  export type InterestedStudentsCreateInput = {
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    Country: CountryCreateNestedOneWithoutInterestedStudentInput
    Event: EventCreateNestedOneWithoutInterestedStudentsInput
    Region: RegionCreateNestedOneWithoutInterestedStudentInput
  }

  export type InterestedStudentsUncheckedCreateInput = {
    intrest_id?: number
    event_id: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    country_id: number
    region_id: number
  }

  export type InterestedStudentsUpdateInput = {
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    Country?: CountryUpdateOneRequiredWithoutInterestedStudentNestedInput
    Event?: EventUpdateOneRequiredWithoutInterestedStudentsNestedInput
    Region?: RegionUpdateOneRequiredWithoutInterestedStudentNestedInput
  }

  export type InterestedStudentsUncheckedUpdateInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type InterestedStudentsCreateManyInput = {
    intrest_id?: number
    event_id: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    country_id: number
    region_id: number
  }

  export type InterestedStudentsUpdateManyMutationInput = {
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
  }

  export type InterestedStudentsUncheckedUpdateManyInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type ActivityCreateInput = {
    start_date?: Date | string
    end_date: Date | string
    act_name: string
    act_note?: string | null
    on_duty: string
    dir_flag: boolean
    all_region: boolean
  }

  export type ActivityUncheckedCreateInput = {
    act_id?: number
    start_date?: Date | string
    end_date: Date | string
    act_name: string
    act_note?: string | null
    on_duty: string
    dir_flag: boolean
    all_region: boolean
  }

  export type ActivityUpdateInput = {
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    act_name?: StringFieldUpdateOperationsInput | string
    act_note?: NullableStringFieldUpdateOperationsInput | string | null
    on_duty?: StringFieldUpdateOperationsInput | string
    dir_flag?: BoolFieldUpdateOperationsInput | boolean
    all_region?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    act_name?: StringFieldUpdateOperationsInput | string
    act_note?: NullableStringFieldUpdateOperationsInput | string | null
    on_duty?: StringFieldUpdateOperationsInput | string
    dir_flag?: BoolFieldUpdateOperationsInput | boolean
    all_region?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCreateManyInput = {
    act_id?: number
    start_date?: Date | string
    end_date: Date | string
    act_name: string
    act_note?: string | null
    on_duty: string
    dir_flag: boolean
    all_region: boolean
  }

  export type ActivityUpdateManyMutationInput = {
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    act_name?: StringFieldUpdateOperationsInput | string
    act_note?: NullableStringFieldUpdateOperationsInput | string | null
    on_duty?: StringFieldUpdateOperationsInput | string
    dir_flag?: BoolFieldUpdateOperationsInput | boolean
    all_region?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateManyInput = {
    act_id?: IntFieldUpdateOperationsInput | number
    start_date?: DateTimeFieldUpdateOperationsInput | Date | string
    end_date?: DateTimeFieldUpdateOperationsInput | Date | string
    act_name?: StringFieldUpdateOperationsInput | string
    act_note?: NullableStringFieldUpdateOperationsInput | string | null
    on_duty?: StringFieldUpdateOperationsInput | string
    dir_flag?: BoolFieldUpdateOperationsInput | boolean
    all_region?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CountryCreateInput = {
    country_name: string
    InterestedStudent?: InterestedStudentsCreateNestedManyWithoutCountryInput
    Region?: RegionCreateNestedManyWithoutCountryInput
    School?: SchoolCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateInput = {
    country_id?: number
    country_name: string
    InterestedStudent?: InterestedStudentsUncheckedCreateNestedManyWithoutCountryInput
    Region?: RegionUncheckedCreateNestedManyWithoutCountryInput
    School?: SchoolUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryUpdateInput = {
    country_name?: StringFieldUpdateOperationsInput | string
    InterestedStudent?: InterestedStudentsUpdateManyWithoutCountryNestedInput
    Region?: RegionUpdateManyWithoutCountryNestedInput
    School?: SchoolUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateInput = {
    country_id?: IntFieldUpdateOperationsInput | number
    country_name?: StringFieldUpdateOperationsInput | string
    InterestedStudent?: InterestedStudentsUncheckedUpdateManyWithoutCountryNestedInput
    Region?: RegionUncheckedUpdateManyWithoutCountryNestedInput
    School?: SchoolUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type CountryCreateManyInput = {
    country_id?: number
    country_name: string
  }

  export type CountryUpdateManyMutationInput = {
    country_name?: StringFieldUpdateOperationsInput | string
  }

  export type CountryUncheckedUpdateManyInput = {
    country_id?: IntFieldUpdateOperationsInput | number
    country_name?: StringFieldUpdateOperationsInput | string
  }

  export type RegionCreateInput = {
    region_name: string
    County?: CountyCreateNestedManyWithoutRegionInput
    InterestedStudent?: InterestedStudentsCreateNestedManyWithoutRegionInput
    country: CountryCreateNestedOneWithoutRegionInput
    School?: SchoolCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateInput = {
    region_id?: number
    region_name: string
    country_id: number
    County?: CountyUncheckedCreateNestedManyWithoutRegionInput
    InterestedStudent?: InterestedStudentsUncheckedCreateNestedManyWithoutRegionInput
    School?: SchoolUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionUpdateInput = {
    region_name?: StringFieldUpdateOperationsInput | string
    County?: CountyUpdateManyWithoutRegionNestedInput
    InterestedStudent?: InterestedStudentsUpdateManyWithoutRegionNestedInput
    country?: CountryUpdateOneRequiredWithoutRegionNestedInput
    School?: SchoolUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    County?: CountyUncheckedUpdateManyWithoutRegionNestedInput
    InterestedStudent?: InterestedStudentsUncheckedUpdateManyWithoutRegionNestedInput
    School?: SchoolUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionCreateManyInput = {
    region_id?: number
    region_name: string
    country_id: number
  }

  export type RegionUpdateManyMutationInput = {
    region_name?: StringFieldUpdateOperationsInput | string
  }

  export type RegionUncheckedUpdateManyInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
  }

  export type CountyCreateInput = {
    county_name: string
    city?: CityCreateNestedManyWithoutCountyInput
    region: RegionCreateNestedOneWithoutCountyInput
    School?: SchoolCreateNestedManyWithoutCountyInput
  }

  export type CountyUncheckedCreateInput = {
    county_id?: number
    county_name: string
    region_id: number
    city?: CityUncheckedCreateNestedManyWithoutCountyInput
    School?: SchoolUncheckedCreateNestedManyWithoutCountyInput
  }

  export type CountyUpdateInput = {
    county_name?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateManyWithoutCountyNestedInput
    region?: RegionUpdateOneRequiredWithoutCountyNestedInput
    School?: SchoolUpdateManyWithoutCountyNestedInput
  }

  export type CountyUncheckedUpdateInput = {
    county_id?: IntFieldUpdateOperationsInput | number
    county_name?: StringFieldUpdateOperationsInput | string
    region_id?: IntFieldUpdateOperationsInput | number
    city?: CityUncheckedUpdateManyWithoutCountyNestedInput
    School?: SchoolUncheckedUpdateManyWithoutCountyNestedInput
  }

  export type CountyCreateManyInput = {
    county_id?: number
    county_name: string
    region_id: number
  }

  export type CountyUpdateManyMutationInput = {
    county_name?: StringFieldUpdateOperationsInput | string
  }

  export type CountyUncheckedUpdateManyInput = {
    county_id?: IntFieldUpdateOperationsInput | number
    county_name?: StringFieldUpdateOperationsInput | string
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type CityCreateInput = {
    city_name: string
    county: CountyCreateNestedOneWithoutCityInput
    School?: SchoolCreateNestedManyWithoutCityInput
  }

  export type CityUncheckedCreateInput = {
    city_id?: number
    city_name: string
    county_id: number
    School?: SchoolUncheckedCreateNestedManyWithoutCityInput
  }

  export type CityUpdateInput = {
    city_name?: StringFieldUpdateOperationsInput | string
    county?: CountyUpdateOneRequiredWithoutCityNestedInput
    School?: SchoolUpdateManyWithoutCityNestedInput
  }

  export type CityUncheckedUpdateInput = {
    city_id?: IntFieldUpdateOperationsInput | number
    city_name?: StringFieldUpdateOperationsInput | string
    county_id?: IntFieldUpdateOperationsInput | number
    School?: SchoolUncheckedUpdateManyWithoutCityNestedInput
  }

  export type CityCreateManyInput = {
    city_id?: number
    city_name: string
    county_id: number
  }

  export type CityUpdateManyMutationInput = {
    city_name?: StringFieldUpdateOperationsInput | string
  }

  export type CityUncheckedUpdateManyInput = {
    city_id?: IntFieldUpdateOperationsInput | number
    city_name?: StringFieldUpdateOperationsInput | string
    county_id?: IntFieldUpdateOperationsInput | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ContactListRelationFilter = {
    every?: ContactWhereInput
    some?: ContactWhereInput
    none?: ContactWhereInput
  }

  export type EventListRelationFilter = {
    every?: EventWhereInput
    some?: EventWhereInput
    none?: EventWhereInput
  }

  export type CityScalarRelationFilter = {
    is?: CityWhereInput
    isNot?: CityWhereInput
  }

  export type CountryScalarRelationFilter = {
    is?: CountryWhereInput
    isNot?: CountryWhereInput
  }

  export type CountyScalarRelationFilter = {
    is?: CountyWhereInput
    isNot?: CountyWhereInput
  }

  export type RegionScalarRelationFilter = {
    is?: RegionWhereInput
    isNot?: RegionWhereInput
  }

  export type UserListRelationFilter = {
    every?: UserWhereInput
    some?: UserWhereInput
    none?: UserWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ContactOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SchoolCountOrderByAggregateInput = {
    school_id?: SortOrder
    om_id?: SortOrder
    school_name?: SortOrder
    zip_code?: SortOrder
    address?: SortOrder
    dir_name?: SortOrder
    dir_phone?: SortOrder
    school_email?: SortOrder
    website?: SortOrder
    school_type?: SortOrder
    coop?: SortOrder
    note?: SortOrder
    city_id?: SortOrder
    country_id?: SortOrder
    county_id?: SortOrder
    region_id?: SortOrder
    duty?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    basic?: SortOrder
    medior?: SortOrder
    high?: SortOrder
  }

  export type SchoolAvgOrderByAggregateInput = {
    school_id?: SortOrder
    city_id?: SortOrder
    country_id?: SortOrder
    county_id?: SortOrder
    region_id?: SortOrder
  }

  export type SchoolMaxOrderByAggregateInput = {
    school_id?: SortOrder
    om_id?: SortOrder
    school_name?: SortOrder
    zip_code?: SortOrder
    address?: SortOrder
    dir_name?: SortOrder
    dir_phone?: SortOrder
    school_email?: SortOrder
    website?: SortOrder
    coop?: SortOrder
    note?: SortOrder
    city_id?: SortOrder
    country_id?: SortOrder
    county_id?: SortOrder
    region_id?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    basic?: SortOrder
    medior?: SortOrder
    high?: SortOrder
  }

  export type SchoolMinOrderByAggregateInput = {
    school_id?: SortOrder
    om_id?: SortOrder
    school_name?: SortOrder
    zip_code?: SortOrder
    address?: SortOrder
    dir_name?: SortOrder
    dir_phone?: SortOrder
    school_email?: SortOrder
    website?: SortOrder
    coop?: SortOrder
    note?: SortOrder
    city_id?: SortOrder
    country_id?: SortOrder
    county_id?: SortOrder
    region_id?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    basic?: SortOrder
    medior?: SortOrder
    high?: SortOrder
  }

  export type SchoolSumOrderByAggregateInput = {
    school_id?: SortOrder
    city_id?: SortOrder
    country_id?: SortOrder
    county_id?: SortOrder
    region_id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type SchoolNullableScalarRelationFilter = {
    is?: SchoolWhereInput | null
    isNot?: SchoolWhereInput | null
  }

  export type ContactCountOrderByAggregateInput = {
    contact_id?: SortOrder
    contact_email?: SortOrder
    contact_name?: SortOrder
    contact_phone?: SortOrder
    contact_note?: SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    school_id?: SortOrder
  }

  export type ContactAvgOrderByAggregateInput = {
    contact_id?: SortOrder
    school_id?: SortOrder
  }

  export type ContactMaxOrderByAggregateInput = {
    contact_id?: SortOrder
    contact_email?: SortOrder
    contact_name?: SortOrder
    contact_phone?: SortOrder
    contact_note?: SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    school_id?: SortOrder
  }

  export type ContactMinOrderByAggregateInput = {
    contact_id?: SortOrder
    contact_email?: SortOrder
    contact_name?: SortOrder
    contact_phone?: SortOrder
    contact_note?: SortOrder
    createdAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
    school_id?: SortOrder
  }

  export type ContactSumOrderByAggregateInput = {
    contact_id?: SortOrder
    school_id?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type IntNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    has?: number | IntFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListIntFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListIntFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type SchoolListRelationFilter = {
    every?: SchoolWhereInput
    some?: SchoolWhereInput
    none?: SchoolWhereInput
  }

  export type SchoolOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    nationality?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    on_duty?: SortOrder
    passwordHash?: SortOrder
    userAuthToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    on_duty?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    nationality?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    passwordHash?: SortOrder
    userAuthToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    user_id?: SortOrder
    user_name?: SortOrder
    nationality?: SortOrder
    user_phone?: SortOrder
    user_email?: SortOrder
    passwordHash?: SortOrder
    userAuthToken?: SortOrder
    resetToken?: SortOrder
    resetTokenExpiry?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    active?: SortOrder
    active_by?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    on_duty?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type SchoolScalarRelationFilter = {
    is?: SchoolWhereInput
    isNot?: SchoolWhereInput
  }

  export type InterestedStudentsListRelationFilter = {
    every?: InterestedStudentsWhereInput
    some?: InterestedStudentsWhereInput
    none?: InterestedStudentsWhereInput
  }

  export type InterestedStudentsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type EventCountOrderByAggregateInput = {
    event_id?: SortOrder
    event_name?: SortOrder
    create_date?: SortOrder
    closing_date?: SortOrder
    event_year?: SortOrder
    semester?: SortOrder
    on_duty?: SortOrder
    event_type?: SortOrder
    estimated_student?: SortOrder
    note?: SortOrder
    slug?: SortOrder
    school_id?: SortOrder
  }

  export type EventAvgOrderByAggregateInput = {
    event_id?: SortOrder
    event_year?: SortOrder
    estimated_student?: SortOrder
    school_id?: SortOrder
  }

  export type EventMaxOrderByAggregateInput = {
    event_id?: SortOrder
    event_name?: SortOrder
    create_date?: SortOrder
    closing_date?: SortOrder
    event_year?: SortOrder
    semester?: SortOrder
    on_duty?: SortOrder
    event_type?: SortOrder
    estimated_student?: SortOrder
    note?: SortOrder
    slug?: SortOrder
    school_id?: SortOrder
  }

  export type EventMinOrderByAggregateInput = {
    event_id?: SortOrder
    event_name?: SortOrder
    create_date?: SortOrder
    closing_date?: SortOrder
    event_year?: SortOrder
    semester?: SortOrder
    on_duty?: SortOrder
    event_type?: SortOrder
    estimated_student?: SortOrder
    note?: SortOrder
    slug?: SortOrder
    school_id?: SortOrder
  }

  export type EventSumOrderByAggregateInput = {
    event_id?: SortOrder
    event_year?: SortOrder
    estimated_student?: SortOrder
    school_id?: SortOrder
  }

  export type EventScalarRelationFilter = {
    is?: EventWhereInput
    isNot?: EventWhereInput
  }

  export type InterestedStudentsCountOrderByAggregateInput = {
    intrest_id?: SortOrder
    event_id?: SortOrder
    intrest_count?: SortOrder
    grade?: SortOrder
    applied?: SortOrder
    work_title?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    country_id?: SortOrder
    region_id?: SortOrder
  }

  export type InterestedStudentsAvgOrderByAggregateInput = {
    intrest_id?: SortOrder
    event_id?: SortOrder
    intrest_count?: SortOrder
    country_id?: SortOrder
    region_id?: SortOrder
  }

  export type InterestedStudentsMaxOrderByAggregateInput = {
    intrest_id?: SortOrder
    event_id?: SortOrder
    intrest_count?: SortOrder
    grade?: SortOrder
    applied?: SortOrder
    work_title?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    country_id?: SortOrder
    region_id?: SortOrder
  }

  export type InterestedStudentsMinOrderByAggregateInput = {
    intrest_id?: SortOrder
    event_id?: SortOrder
    intrest_count?: SortOrder
    grade?: SortOrder
    applied?: SortOrder
    work_title?: SortOrder
    channel?: SortOrder
    status?: SortOrder
    country_id?: SortOrder
    region_id?: SortOrder
  }

  export type InterestedStudentsSumOrderByAggregateInput = {
    intrest_id?: SortOrder
    event_id?: SortOrder
    intrest_count?: SortOrder
    country_id?: SortOrder
    region_id?: SortOrder
  }

  export type ActivityCountOrderByAggregateInput = {
    act_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    act_name?: SortOrder
    act_note?: SortOrder
    on_duty?: SortOrder
    dir_flag?: SortOrder
    all_region?: SortOrder
  }

  export type ActivityAvgOrderByAggregateInput = {
    act_id?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    act_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    act_name?: SortOrder
    act_note?: SortOrder
    on_duty?: SortOrder
    dir_flag?: SortOrder
    all_region?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    act_id?: SortOrder
    start_date?: SortOrder
    end_date?: SortOrder
    act_name?: SortOrder
    act_note?: SortOrder
    on_duty?: SortOrder
    dir_flag?: SortOrder
    all_region?: SortOrder
  }

  export type ActivitySumOrderByAggregateInput = {
    act_id?: SortOrder
  }

  export type RegionListRelationFilter = {
    every?: RegionWhereInput
    some?: RegionWhereInput
    none?: RegionWhereInput
  }

  export type RegionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CountryCountOrderByAggregateInput = {
    country_id?: SortOrder
    country_name?: SortOrder
  }

  export type CountryAvgOrderByAggregateInput = {
    country_id?: SortOrder
  }

  export type CountryMaxOrderByAggregateInput = {
    country_id?: SortOrder
    country_name?: SortOrder
  }

  export type CountryMinOrderByAggregateInput = {
    country_id?: SortOrder
    country_name?: SortOrder
  }

  export type CountrySumOrderByAggregateInput = {
    country_id?: SortOrder
  }

  export type CountyListRelationFilter = {
    every?: CountyWhereInput
    some?: CountyWhereInput
    none?: CountyWhereInput
  }

  export type CountyOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RegionCountOrderByAggregateInput = {
    region_id?: SortOrder
    region_name?: SortOrder
    country_id?: SortOrder
  }

  export type RegionAvgOrderByAggregateInput = {
    region_id?: SortOrder
    country_id?: SortOrder
  }

  export type RegionMaxOrderByAggregateInput = {
    region_id?: SortOrder
    region_name?: SortOrder
    country_id?: SortOrder
  }

  export type RegionMinOrderByAggregateInput = {
    region_id?: SortOrder
    region_name?: SortOrder
    country_id?: SortOrder
  }

  export type RegionSumOrderByAggregateInput = {
    region_id?: SortOrder
    country_id?: SortOrder
  }

  export type CityListRelationFilter = {
    every?: CityWhereInput
    some?: CityWhereInput
    none?: CityWhereInput
  }

  export type CityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CountyCountOrderByAggregateInput = {
    county_id?: SortOrder
    county_name?: SortOrder
    region_id?: SortOrder
  }

  export type CountyAvgOrderByAggregateInput = {
    county_id?: SortOrder
    region_id?: SortOrder
  }

  export type CountyMaxOrderByAggregateInput = {
    county_id?: SortOrder
    county_name?: SortOrder
    region_id?: SortOrder
  }

  export type CountyMinOrderByAggregateInput = {
    county_id?: SortOrder
    county_name?: SortOrder
    region_id?: SortOrder
  }

  export type CountySumOrderByAggregateInput = {
    county_id?: SortOrder
    region_id?: SortOrder
  }

  export type CityCountOrderByAggregateInput = {
    city_id?: SortOrder
    city_name?: SortOrder
    county_id?: SortOrder
  }

  export type CityAvgOrderByAggregateInput = {
    city_id?: SortOrder
    county_id?: SortOrder
  }

  export type CityMaxOrderByAggregateInput = {
    city_id?: SortOrder
    city_name?: SortOrder
    county_id?: SortOrder
  }

  export type CityMinOrderByAggregateInput = {
    city_id?: SortOrder
    city_name?: SortOrder
    county_id?: SortOrder
  }

  export type CitySumOrderByAggregateInput = {
    city_id?: SortOrder
    county_id?: SortOrder
  }

  export type SchoolCreateschool_typeInput = {
    set: string[]
  }

  export type SchoolCreatedutyInput = {
    set: string[]
  }

  export type ContactCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ContactCreateWithoutSchoolInput, ContactUncheckedCreateWithoutSchoolInput> | ContactCreateWithoutSchoolInput[] | ContactUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutSchoolInput | ContactCreateOrConnectWithoutSchoolInput[]
    createMany?: ContactCreateManySchoolInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutSchoolInput = {
    create?: XOR<EventCreateWithoutSchoolInput, EventUncheckedCreateWithoutSchoolInput> | EventCreateWithoutSchoolInput[] | EventUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: EventCreateOrConnectWithoutSchoolInput | EventCreateOrConnectWithoutSchoolInput[]
    createMany?: EventCreateManySchoolInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type CityCreateNestedOneWithoutSchoolInput = {
    create?: XOR<CityCreateWithoutSchoolInput, CityUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: CityCreateOrConnectWithoutSchoolInput
    connect?: CityWhereUniqueInput
  }

  export type CountryCreateNestedOneWithoutSchoolInput = {
    create?: XOR<CountryCreateWithoutSchoolInput, CountryUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: CountryCreateOrConnectWithoutSchoolInput
    connect?: CountryWhereUniqueInput
  }

  export type CountyCreateNestedOneWithoutSchoolInput = {
    create?: XOR<CountyCreateWithoutSchoolInput, CountyUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: CountyCreateOrConnectWithoutSchoolInput
    connect?: CountyWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutSchoolInput = {
    create?: XOR<RegionCreateWithoutSchoolInput, RegionUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: RegionCreateOrConnectWithoutSchoolInput
    connect?: RegionWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutSchoolInput = {
    create?: XOR<UserCreateWithoutSchoolInput, UserUncheckedCreateWithoutSchoolInput> | UserCreateWithoutSchoolInput[] | UserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSchoolInput | UserCreateOrConnectWithoutSchoolInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type ContactUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<ContactCreateWithoutSchoolInput, ContactUncheckedCreateWithoutSchoolInput> | ContactCreateWithoutSchoolInput[] | ContactUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutSchoolInput | ContactCreateOrConnectWithoutSchoolInput[]
    createMany?: ContactCreateManySchoolInputEnvelope
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<EventCreateWithoutSchoolInput, EventUncheckedCreateWithoutSchoolInput> | EventCreateWithoutSchoolInput[] | EventUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: EventCreateOrConnectWithoutSchoolInput | EventCreateOrConnectWithoutSchoolInput[]
    createMany?: EventCreateManySchoolInputEnvelope
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutSchoolInput = {
    create?: XOR<UserCreateWithoutSchoolInput, UserUncheckedCreateWithoutSchoolInput> | UserCreateWithoutSchoolInput[] | UserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSchoolInput | UserCreateOrConnectWithoutSchoolInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type SchoolUpdateschool_typeInput = {
    set?: string[]
    push?: string | string[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type SchoolUpdatedutyInput = {
    set?: string[]
    push?: string | string[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ContactUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ContactCreateWithoutSchoolInput, ContactUncheckedCreateWithoutSchoolInput> | ContactCreateWithoutSchoolInput[] | ContactUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutSchoolInput | ContactCreateOrConnectWithoutSchoolInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutSchoolInput | ContactUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ContactCreateManySchoolInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutSchoolInput | ContactUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutSchoolInput | ContactUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type EventUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<EventCreateWithoutSchoolInput, EventUncheckedCreateWithoutSchoolInput> | EventCreateWithoutSchoolInput[] | EventUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: EventCreateOrConnectWithoutSchoolInput | EventCreateOrConnectWithoutSchoolInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutSchoolInput | EventUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: EventCreateManySchoolInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutSchoolInput | EventUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: EventUpdateManyWithWhereWithoutSchoolInput | EventUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type CityUpdateOneRequiredWithoutSchoolNestedInput = {
    create?: XOR<CityCreateWithoutSchoolInput, CityUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: CityCreateOrConnectWithoutSchoolInput
    upsert?: CityUpsertWithoutSchoolInput
    connect?: CityWhereUniqueInput
    update?: XOR<XOR<CityUpdateToOneWithWhereWithoutSchoolInput, CityUpdateWithoutSchoolInput>, CityUncheckedUpdateWithoutSchoolInput>
  }

  export type CountryUpdateOneRequiredWithoutSchoolNestedInput = {
    create?: XOR<CountryCreateWithoutSchoolInput, CountryUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: CountryCreateOrConnectWithoutSchoolInput
    upsert?: CountryUpsertWithoutSchoolInput
    connect?: CountryWhereUniqueInput
    update?: XOR<XOR<CountryUpdateToOneWithWhereWithoutSchoolInput, CountryUpdateWithoutSchoolInput>, CountryUncheckedUpdateWithoutSchoolInput>
  }

  export type CountyUpdateOneRequiredWithoutSchoolNestedInput = {
    create?: XOR<CountyCreateWithoutSchoolInput, CountyUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: CountyCreateOrConnectWithoutSchoolInput
    upsert?: CountyUpsertWithoutSchoolInput
    connect?: CountyWhereUniqueInput
    update?: XOR<XOR<CountyUpdateToOneWithWhereWithoutSchoolInput, CountyUpdateWithoutSchoolInput>, CountyUncheckedUpdateWithoutSchoolInput>
  }

  export type RegionUpdateOneRequiredWithoutSchoolNestedInput = {
    create?: XOR<RegionCreateWithoutSchoolInput, RegionUncheckedCreateWithoutSchoolInput>
    connectOrCreate?: RegionCreateOrConnectWithoutSchoolInput
    upsert?: RegionUpsertWithoutSchoolInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutSchoolInput, RegionUpdateWithoutSchoolInput>, RegionUncheckedUpdateWithoutSchoolInput>
  }

  export type UserUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<UserCreateWithoutSchoolInput, UserUncheckedCreateWithoutSchoolInput> | UserCreateWithoutSchoolInput[] | UserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSchoolInput | UserCreateOrConnectWithoutSchoolInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSchoolInput | UserUpsertWithWhereUniqueWithoutSchoolInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSchoolInput | UserUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSchoolInput | UserUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ContactUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<ContactCreateWithoutSchoolInput, ContactUncheckedCreateWithoutSchoolInput> | ContactCreateWithoutSchoolInput[] | ContactUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutSchoolInput | ContactCreateOrConnectWithoutSchoolInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutSchoolInput | ContactUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: ContactCreateManySchoolInputEnvelope
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutSchoolInput | ContactUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutSchoolInput | ContactUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<EventCreateWithoutSchoolInput, EventUncheckedCreateWithoutSchoolInput> | EventCreateWithoutSchoolInput[] | EventUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: EventCreateOrConnectWithoutSchoolInput | EventCreateOrConnectWithoutSchoolInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutSchoolInput | EventUpsertWithWhereUniqueWithoutSchoolInput[]
    createMany?: EventCreateManySchoolInputEnvelope
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutSchoolInput | EventUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: EventUpdateManyWithWhereWithoutSchoolInput | EventUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutSchoolNestedInput = {
    create?: XOR<UserCreateWithoutSchoolInput, UserUncheckedCreateWithoutSchoolInput> | UserCreateWithoutSchoolInput[] | UserUncheckedCreateWithoutSchoolInput[]
    connectOrCreate?: UserCreateOrConnectWithoutSchoolInput | UserCreateOrConnectWithoutSchoolInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutSchoolInput | UserUpsertWithWhereUniqueWithoutSchoolInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutSchoolInput | UserUpdateWithWhereUniqueWithoutSchoolInput[]
    updateMany?: UserUpdateManyWithWhereWithoutSchoolInput | UserUpdateManyWithWhereWithoutSchoolInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type SchoolCreateNestedOneWithoutContactInput = {
    create?: XOR<SchoolCreateWithoutContactInput, SchoolUncheckedCreateWithoutContactInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutContactInput
    connect?: SchoolWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutContactInput = {
    create?: XOR<UserCreateWithoutContactInput, UserUncheckedCreateWithoutContactInput> | UserCreateWithoutContactInput[] | UserUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserCreateOrConnectWithoutContactInput | UserCreateOrConnectWithoutContactInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutContactInput = {
    create?: XOR<UserCreateWithoutContactInput, UserUncheckedCreateWithoutContactInput> | UserCreateWithoutContactInput[] | UserUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserCreateOrConnectWithoutContactInput | UserCreateOrConnectWithoutContactInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type SchoolUpdateOneWithoutContactNestedInput = {
    create?: XOR<SchoolCreateWithoutContactInput, SchoolUncheckedCreateWithoutContactInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutContactInput
    upsert?: SchoolUpsertWithoutContactInput
    disconnect?: SchoolWhereInput | boolean
    delete?: SchoolWhereInput | boolean
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutContactInput, SchoolUpdateWithoutContactInput>, SchoolUncheckedUpdateWithoutContactInput>
  }

  export type UserUpdateManyWithoutContactNestedInput = {
    create?: XOR<UserCreateWithoutContactInput, UserUncheckedCreateWithoutContactInput> | UserCreateWithoutContactInput[] | UserUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserCreateOrConnectWithoutContactInput | UserCreateOrConnectWithoutContactInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutContactInput | UserUpsertWithWhereUniqueWithoutContactInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutContactInput | UserUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: UserUpdateManyWithWhereWithoutContactInput | UserUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUncheckedUpdateManyWithoutContactNestedInput = {
    create?: XOR<UserCreateWithoutContactInput, UserUncheckedCreateWithoutContactInput> | UserCreateWithoutContactInput[] | UserUncheckedCreateWithoutContactInput[]
    connectOrCreate?: UserCreateOrConnectWithoutContactInput | UserCreateOrConnectWithoutContactInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutContactInput | UserUpsertWithWhereUniqueWithoutContactInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutContactInput | UserUpdateWithWhereUniqueWithoutContactInput[]
    updateMany?: UserUpdateManyWithWhereWithoutContactInput | UserUpdateManyWithWhereWithoutContactInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type UserCreateon_dutyInput = {
    set: number[]
  }

  export type ContactCreateNestedManyWithoutUserInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type EventCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type SchoolCreateNestedManyWithoutUserInput = {
    create?: XOR<SchoolCreateWithoutUserInput, SchoolUncheckedCreateWithoutUserInput> | SchoolCreateWithoutUserInput[] | SchoolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutUserInput | SchoolCreateOrConnectWithoutUserInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type ContactUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
  }

  export type EventUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
  }

  export type SchoolUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<SchoolCreateWithoutUserInput, SchoolUncheckedCreateWithoutUserInput> | SchoolCreateWithoutUserInput[] | SchoolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutUserInput | SchoolCreateOrConnectWithoutUserInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type UserUpdateon_dutyInput = {
    set?: number[]
    push?: number | number[]
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ContactUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutUserInput | ContactUpsertWithWhereUniqueWithoutUserInput[]
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutUserInput | ContactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutUserInput | ContactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type EventUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type SchoolUpdateManyWithoutUserNestedInput = {
    create?: XOR<SchoolCreateWithoutUserInput, SchoolUncheckedCreateWithoutUserInput> | SchoolCreateWithoutUserInput[] | SchoolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutUserInput | SchoolCreateOrConnectWithoutUserInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutUserInput | SchoolUpsertWithWhereUniqueWithoutUserInput[]
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutUserInput | SchoolUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutUserInput | SchoolUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type ContactUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput> | ContactCreateWithoutUserInput[] | ContactUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ContactCreateOrConnectWithoutUserInput | ContactCreateOrConnectWithoutUserInput[]
    upsert?: ContactUpsertWithWhereUniqueWithoutUserInput | ContactUpsertWithWhereUniqueWithoutUserInput[]
    set?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    disconnect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    delete?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    connect?: ContactWhereUniqueInput | ContactWhereUniqueInput[]
    update?: ContactUpdateWithWhereUniqueWithoutUserInput | ContactUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ContactUpdateManyWithWhereWithoutUserInput | ContactUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ContactScalarWhereInput | ContactScalarWhereInput[]
  }

  export type EventUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput> | EventCreateWithoutUserInput[] | EventUncheckedCreateWithoutUserInput[]
    connectOrCreate?: EventCreateOrConnectWithoutUserInput | EventCreateOrConnectWithoutUserInput[]
    upsert?: EventUpsertWithWhereUniqueWithoutUserInput | EventUpsertWithWhereUniqueWithoutUserInput[]
    set?: EventWhereUniqueInput | EventWhereUniqueInput[]
    disconnect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    delete?: EventWhereUniqueInput | EventWhereUniqueInput[]
    connect?: EventWhereUniqueInput | EventWhereUniqueInput[]
    update?: EventUpdateWithWhereUniqueWithoutUserInput | EventUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: EventUpdateManyWithWhereWithoutUserInput | EventUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: EventScalarWhereInput | EventScalarWhereInput[]
  }

  export type SchoolUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<SchoolCreateWithoutUserInput, SchoolUncheckedCreateWithoutUserInput> | SchoolCreateWithoutUserInput[] | SchoolUncheckedCreateWithoutUserInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutUserInput | SchoolCreateOrConnectWithoutUserInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutUserInput | SchoolUpsertWithWhereUniqueWithoutUserInput[]
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutUserInput | SchoolUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutUserInput | SchoolUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type SchoolCreateNestedOneWithoutEventInput = {
    create?: XOR<SchoolCreateWithoutEventInput, SchoolUncheckedCreateWithoutEventInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutEventInput
    connect?: SchoolWhereUniqueInput
  }

  export type UserCreateNestedManyWithoutEventInput = {
    create?: XOR<UserCreateWithoutEventInput, UserUncheckedCreateWithoutEventInput> | UserCreateWithoutEventInput[] | UserUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEventInput | UserCreateOrConnectWithoutEventInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type InterestedStudentsCreateNestedManyWithoutEventInput = {
    create?: XOR<InterestedStudentsCreateWithoutEventInput, InterestedStudentsUncheckedCreateWithoutEventInput> | InterestedStudentsCreateWithoutEventInput[] | InterestedStudentsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutEventInput | InterestedStudentsCreateOrConnectWithoutEventInput[]
    createMany?: InterestedStudentsCreateManyEventInputEnvelope
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
  }

  export type UserUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<UserCreateWithoutEventInput, UserUncheckedCreateWithoutEventInput> | UserCreateWithoutEventInput[] | UserUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEventInput | UserCreateOrConnectWithoutEventInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
  }

  export type InterestedStudentsUncheckedCreateNestedManyWithoutEventInput = {
    create?: XOR<InterestedStudentsCreateWithoutEventInput, InterestedStudentsUncheckedCreateWithoutEventInput> | InterestedStudentsCreateWithoutEventInput[] | InterestedStudentsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutEventInput | InterestedStudentsCreateOrConnectWithoutEventInput[]
    createMany?: InterestedStudentsCreateManyEventInputEnvelope
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
  }

  export type SchoolUpdateOneRequiredWithoutEventNestedInput = {
    create?: XOR<SchoolCreateWithoutEventInput, SchoolUncheckedCreateWithoutEventInput>
    connectOrCreate?: SchoolCreateOrConnectWithoutEventInput
    upsert?: SchoolUpsertWithoutEventInput
    connect?: SchoolWhereUniqueInput
    update?: XOR<XOR<SchoolUpdateToOneWithWhereWithoutEventInput, SchoolUpdateWithoutEventInput>, SchoolUncheckedUpdateWithoutEventInput>
  }

  export type UserUpdateManyWithoutEventNestedInput = {
    create?: XOR<UserCreateWithoutEventInput, UserUncheckedCreateWithoutEventInput> | UserCreateWithoutEventInput[] | UserUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEventInput | UserCreateOrConnectWithoutEventInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutEventInput | UserUpsertWithWhereUniqueWithoutEventInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutEventInput | UserUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: UserUpdateManyWithWhereWithoutEventInput | UserUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type InterestedStudentsUpdateManyWithoutEventNestedInput = {
    create?: XOR<InterestedStudentsCreateWithoutEventInput, InterestedStudentsUncheckedCreateWithoutEventInput> | InterestedStudentsCreateWithoutEventInput[] | InterestedStudentsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutEventInput | InterestedStudentsCreateOrConnectWithoutEventInput[]
    upsert?: InterestedStudentsUpsertWithWhereUniqueWithoutEventInput | InterestedStudentsUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: InterestedStudentsCreateManyEventInputEnvelope
    set?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    disconnect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    delete?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    update?: InterestedStudentsUpdateWithWhereUniqueWithoutEventInput | InterestedStudentsUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: InterestedStudentsUpdateManyWithWhereWithoutEventInput | InterestedStudentsUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
  }

  export type UserUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<UserCreateWithoutEventInput, UserUncheckedCreateWithoutEventInput> | UserCreateWithoutEventInput[] | UserUncheckedCreateWithoutEventInput[]
    connectOrCreate?: UserCreateOrConnectWithoutEventInput | UserCreateOrConnectWithoutEventInput[]
    upsert?: UserUpsertWithWhereUniqueWithoutEventInput | UserUpsertWithWhereUniqueWithoutEventInput[]
    set?: UserWhereUniqueInput | UserWhereUniqueInput[]
    disconnect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    delete?: UserWhereUniqueInput | UserWhereUniqueInput[]
    connect?: UserWhereUniqueInput | UserWhereUniqueInput[]
    update?: UserUpdateWithWhereUniqueWithoutEventInput | UserUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: UserUpdateManyWithWhereWithoutEventInput | UserUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: UserScalarWhereInput | UserScalarWhereInput[]
  }

  export type InterestedStudentsUncheckedUpdateManyWithoutEventNestedInput = {
    create?: XOR<InterestedStudentsCreateWithoutEventInput, InterestedStudentsUncheckedCreateWithoutEventInput> | InterestedStudentsCreateWithoutEventInput[] | InterestedStudentsUncheckedCreateWithoutEventInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutEventInput | InterestedStudentsCreateOrConnectWithoutEventInput[]
    upsert?: InterestedStudentsUpsertWithWhereUniqueWithoutEventInput | InterestedStudentsUpsertWithWhereUniqueWithoutEventInput[]
    createMany?: InterestedStudentsCreateManyEventInputEnvelope
    set?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    disconnect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    delete?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    update?: InterestedStudentsUpdateWithWhereUniqueWithoutEventInput | InterestedStudentsUpdateWithWhereUniqueWithoutEventInput[]
    updateMany?: InterestedStudentsUpdateManyWithWhereWithoutEventInput | InterestedStudentsUpdateManyWithWhereWithoutEventInput[]
    deleteMany?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
  }

  export type CountryCreateNestedOneWithoutInterestedStudentInput = {
    create?: XOR<CountryCreateWithoutInterestedStudentInput, CountryUncheckedCreateWithoutInterestedStudentInput>
    connectOrCreate?: CountryCreateOrConnectWithoutInterestedStudentInput
    connect?: CountryWhereUniqueInput
  }

  export type EventCreateNestedOneWithoutInterestedStudentsInput = {
    create?: XOR<EventCreateWithoutInterestedStudentsInput, EventUncheckedCreateWithoutInterestedStudentsInput>
    connectOrCreate?: EventCreateOrConnectWithoutInterestedStudentsInput
    connect?: EventWhereUniqueInput
  }

  export type RegionCreateNestedOneWithoutInterestedStudentInput = {
    create?: XOR<RegionCreateWithoutInterestedStudentInput, RegionUncheckedCreateWithoutInterestedStudentInput>
    connectOrCreate?: RegionCreateOrConnectWithoutInterestedStudentInput
    connect?: RegionWhereUniqueInput
  }

  export type CountryUpdateOneRequiredWithoutInterestedStudentNestedInput = {
    create?: XOR<CountryCreateWithoutInterestedStudentInput, CountryUncheckedCreateWithoutInterestedStudentInput>
    connectOrCreate?: CountryCreateOrConnectWithoutInterestedStudentInput
    upsert?: CountryUpsertWithoutInterestedStudentInput
    connect?: CountryWhereUniqueInput
    update?: XOR<XOR<CountryUpdateToOneWithWhereWithoutInterestedStudentInput, CountryUpdateWithoutInterestedStudentInput>, CountryUncheckedUpdateWithoutInterestedStudentInput>
  }

  export type EventUpdateOneRequiredWithoutInterestedStudentsNestedInput = {
    create?: XOR<EventCreateWithoutInterestedStudentsInput, EventUncheckedCreateWithoutInterestedStudentsInput>
    connectOrCreate?: EventCreateOrConnectWithoutInterestedStudentsInput
    upsert?: EventUpsertWithoutInterestedStudentsInput
    connect?: EventWhereUniqueInput
    update?: XOR<XOR<EventUpdateToOneWithWhereWithoutInterestedStudentsInput, EventUpdateWithoutInterestedStudentsInput>, EventUncheckedUpdateWithoutInterestedStudentsInput>
  }

  export type RegionUpdateOneRequiredWithoutInterestedStudentNestedInput = {
    create?: XOR<RegionCreateWithoutInterestedStudentInput, RegionUncheckedCreateWithoutInterestedStudentInput>
    connectOrCreate?: RegionCreateOrConnectWithoutInterestedStudentInput
    upsert?: RegionUpsertWithoutInterestedStudentInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutInterestedStudentInput, RegionUpdateWithoutInterestedStudentInput>, RegionUncheckedUpdateWithoutInterestedStudentInput>
  }

  export type InterestedStudentsCreateNestedManyWithoutCountryInput = {
    create?: XOR<InterestedStudentsCreateWithoutCountryInput, InterestedStudentsUncheckedCreateWithoutCountryInput> | InterestedStudentsCreateWithoutCountryInput[] | InterestedStudentsUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutCountryInput | InterestedStudentsCreateOrConnectWithoutCountryInput[]
    createMany?: InterestedStudentsCreateManyCountryInputEnvelope
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
  }

  export type RegionCreateNestedManyWithoutCountryInput = {
    create?: XOR<RegionCreateWithoutCountryInput, RegionUncheckedCreateWithoutCountryInput> | RegionCreateWithoutCountryInput[] | RegionUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCountryInput | RegionCreateOrConnectWithoutCountryInput[]
    createMany?: RegionCreateManyCountryInputEnvelope
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
  }

  export type SchoolCreateNestedManyWithoutCountryInput = {
    create?: XOR<SchoolCreateWithoutCountryInput, SchoolUncheckedCreateWithoutCountryInput> | SchoolCreateWithoutCountryInput[] | SchoolUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountryInput | SchoolCreateOrConnectWithoutCountryInput[]
    createMany?: SchoolCreateManyCountryInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type InterestedStudentsUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<InterestedStudentsCreateWithoutCountryInput, InterestedStudentsUncheckedCreateWithoutCountryInput> | InterestedStudentsCreateWithoutCountryInput[] | InterestedStudentsUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutCountryInput | InterestedStudentsCreateOrConnectWithoutCountryInput[]
    createMany?: InterestedStudentsCreateManyCountryInputEnvelope
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
  }

  export type RegionUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<RegionCreateWithoutCountryInput, RegionUncheckedCreateWithoutCountryInput> | RegionCreateWithoutCountryInput[] | RegionUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCountryInput | RegionCreateOrConnectWithoutCountryInput[]
    createMany?: RegionCreateManyCountryInputEnvelope
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
  }

  export type SchoolUncheckedCreateNestedManyWithoutCountryInput = {
    create?: XOR<SchoolCreateWithoutCountryInput, SchoolUncheckedCreateWithoutCountryInput> | SchoolCreateWithoutCountryInput[] | SchoolUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountryInput | SchoolCreateOrConnectWithoutCountryInput[]
    createMany?: SchoolCreateManyCountryInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type InterestedStudentsUpdateManyWithoutCountryNestedInput = {
    create?: XOR<InterestedStudentsCreateWithoutCountryInput, InterestedStudentsUncheckedCreateWithoutCountryInput> | InterestedStudentsCreateWithoutCountryInput[] | InterestedStudentsUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutCountryInput | InterestedStudentsCreateOrConnectWithoutCountryInput[]
    upsert?: InterestedStudentsUpsertWithWhereUniqueWithoutCountryInput | InterestedStudentsUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: InterestedStudentsCreateManyCountryInputEnvelope
    set?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    disconnect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    delete?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    update?: InterestedStudentsUpdateWithWhereUniqueWithoutCountryInput | InterestedStudentsUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: InterestedStudentsUpdateManyWithWhereWithoutCountryInput | InterestedStudentsUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
  }

  export type RegionUpdateManyWithoutCountryNestedInput = {
    create?: XOR<RegionCreateWithoutCountryInput, RegionUncheckedCreateWithoutCountryInput> | RegionCreateWithoutCountryInput[] | RegionUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCountryInput | RegionCreateOrConnectWithoutCountryInput[]
    upsert?: RegionUpsertWithWhereUniqueWithoutCountryInput | RegionUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: RegionCreateManyCountryInputEnvelope
    set?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    disconnect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    delete?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    update?: RegionUpdateWithWhereUniqueWithoutCountryInput | RegionUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: RegionUpdateManyWithWhereWithoutCountryInput | RegionUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: RegionScalarWhereInput | RegionScalarWhereInput[]
  }

  export type SchoolUpdateManyWithoutCountryNestedInput = {
    create?: XOR<SchoolCreateWithoutCountryInput, SchoolUncheckedCreateWithoutCountryInput> | SchoolCreateWithoutCountryInput[] | SchoolUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountryInput | SchoolCreateOrConnectWithoutCountryInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutCountryInput | SchoolUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: SchoolCreateManyCountryInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutCountryInput | SchoolUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutCountryInput | SchoolUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type InterestedStudentsUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<InterestedStudentsCreateWithoutCountryInput, InterestedStudentsUncheckedCreateWithoutCountryInput> | InterestedStudentsCreateWithoutCountryInput[] | InterestedStudentsUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutCountryInput | InterestedStudentsCreateOrConnectWithoutCountryInput[]
    upsert?: InterestedStudentsUpsertWithWhereUniqueWithoutCountryInput | InterestedStudentsUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: InterestedStudentsCreateManyCountryInputEnvelope
    set?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    disconnect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    delete?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    update?: InterestedStudentsUpdateWithWhereUniqueWithoutCountryInput | InterestedStudentsUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: InterestedStudentsUpdateManyWithWhereWithoutCountryInput | InterestedStudentsUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
  }

  export type RegionUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<RegionCreateWithoutCountryInput, RegionUncheckedCreateWithoutCountryInput> | RegionCreateWithoutCountryInput[] | RegionUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: RegionCreateOrConnectWithoutCountryInput | RegionCreateOrConnectWithoutCountryInput[]
    upsert?: RegionUpsertWithWhereUniqueWithoutCountryInput | RegionUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: RegionCreateManyCountryInputEnvelope
    set?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    disconnect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    delete?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    connect?: RegionWhereUniqueInput | RegionWhereUniqueInput[]
    update?: RegionUpdateWithWhereUniqueWithoutCountryInput | RegionUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: RegionUpdateManyWithWhereWithoutCountryInput | RegionUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: RegionScalarWhereInput | RegionScalarWhereInput[]
  }

  export type SchoolUncheckedUpdateManyWithoutCountryNestedInput = {
    create?: XOR<SchoolCreateWithoutCountryInput, SchoolUncheckedCreateWithoutCountryInput> | SchoolCreateWithoutCountryInput[] | SchoolUncheckedCreateWithoutCountryInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountryInput | SchoolCreateOrConnectWithoutCountryInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutCountryInput | SchoolUpsertWithWhereUniqueWithoutCountryInput[]
    createMany?: SchoolCreateManyCountryInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutCountryInput | SchoolUpdateWithWhereUniqueWithoutCountryInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutCountryInput | SchoolUpdateManyWithWhereWithoutCountryInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type CountyCreateNestedManyWithoutRegionInput = {
    create?: XOR<CountyCreateWithoutRegionInput, CountyUncheckedCreateWithoutRegionInput> | CountyCreateWithoutRegionInput[] | CountyUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CountyCreateOrConnectWithoutRegionInput | CountyCreateOrConnectWithoutRegionInput[]
    createMany?: CountyCreateManyRegionInputEnvelope
    connect?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
  }

  export type InterestedStudentsCreateNestedManyWithoutRegionInput = {
    create?: XOR<InterestedStudentsCreateWithoutRegionInput, InterestedStudentsUncheckedCreateWithoutRegionInput> | InterestedStudentsCreateWithoutRegionInput[] | InterestedStudentsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutRegionInput | InterestedStudentsCreateOrConnectWithoutRegionInput[]
    createMany?: InterestedStudentsCreateManyRegionInputEnvelope
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
  }

  export type CountryCreateNestedOneWithoutRegionInput = {
    create?: XOR<CountryCreateWithoutRegionInput, CountryUncheckedCreateWithoutRegionInput>
    connectOrCreate?: CountryCreateOrConnectWithoutRegionInput
    connect?: CountryWhereUniqueInput
  }

  export type SchoolCreateNestedManyWithoutRegionInput = {
    create?: XOR<SchoolCreateWithoutRegionInput, SchoolUncheckedCreateWithoutRegionInput> | SchoolCreateWithoutRegionInput[] | SchoolUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutRegionInput | SchoolCreateOrConnectWithoutRegionInput[]
    createMany?: SchoolCreateManyRegionInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type CountyUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<CountyCreateWithoutRegionInput, CountyUncheckedCreateWithoutRegionInput> | CountyCreateWithoutRegionInput[] | CountyUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CountyCreateOrConnectWithoutRegionInput | CountyCreateOrConnectWithoutRegionInput[]
    createMany?: CountyCreateManyRegionInputEnvelope
    connect?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
  }

  export type InterestedStudentsUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<InterestedStudentsCreateWithoutRegionInput, InterestedStudentsUncheckedCreateWithoutRegionInput> | InterestedStudentsCreateWithoutRegionInput[] | InterestedStudentsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutRegionInput | InterestedStudentsCreateOrConnectWithoutRegionInput[]
    createMany?: InterestedStudentsCreateManyRegionInputEnvelope
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
  }

  export type SchoolUncheckedCreateNestedManyWithoutRegionInput = {
    create?: XOR<SchoolCreateWithoutRegionInput, SchoolUncheckedCreateWithoutRegionInput> | SchoolCreateWithoutRegionInput[] | SchoolUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutRegionInput | SchoolCreateOrConnectWithoutRegionInput[]
    createMany?: SchoolCreateManyRegionInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type CountyUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CountyCreateWithoutRegionInput, CountyUncheckedCreateWithoutRegionInput> | CountyCreateWithoutRegionInput[] | CountyUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CountyCreateOrConnectWithoutRegionInput | CountyCreateOrConnectWithoutRegionInput[]
    upsert?: CountyUpsertWithWhereUniqueWithoutRegionInput | CountyUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CountyCreateManyRegionInputEnvelope
    set?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    disconnect?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    delete?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    connect?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    update?: CountyUpdateWithWhereUniqueWithoutRegionInput | CountyUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CountyUpdateManyWithWhereWithoutRegionInput | CountyUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CountyScalarWhereInput | CountyScalarWhereInput[]
  }

  export type InterestedStudentsUpdateManyWithoutRegionNestedInput = {
    create?: XOR<InterestedStudentsCreateWithoutRegionInput, InterestedStudentsUncheckedCreateWithoutRegionInput> | InterestedStudentsCreateWithoutRegionInput[] | InterestedStudentsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutRegionInput | InterestedStudentsCreateOrConnectWithoutRegionInput[]
    upsert?: InterestedStudentsUpsertWithWhereUniqueWithoutRegionInput | InterestedStudentsUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: InterestedStudentsCreateManyRegionInputEnvelope
    set?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    disconnect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    delete?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    update?: InterestedStudentsUpdateWithWhereUniqueWithoutRegionInput | InterestedStudentsUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: InterestedStudentsUpdateManyWithWhereWithoutRegionInput | InterestedStudentsUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
  }

  export type CountryUpdateOneRequiredWithoutRegionNestedInput = {
    create?: XOR<CountryCreateWithoutRegionInput, CountryUncheckedCreateWithoutRegionInput>
    connectOrCreate?: CountryCreateOrConnectWithoutRegionInput
    upsert?: CountryUpsertWithoutRegionInput
    connect?: CountryWhereUniqueInput
    update?: XOR<XOR<CountryUpdateToOneWithWhereWithoutRegionInput, CountryUpdateWithoutRegionInput>, CountryUncheckedUpdateWithoutRegionInput>
  }

  export type SchoolUpdateManyWithoutRegionNestedInput = {
    create?: XOR<SchoolCreateWithoutRegionInput, SchoolUncheckedCreateWithoutRegionInput> | SchoolCreateWithoutRegionInput[] | SchoolUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutRegionInput | SchoolCreateOrConnectWithoutRegionInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutRegionInput | SchoolUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: SchoolCreateManyRegionInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutRegionInput | SchoolUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutRegionInput | SchoolUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type CountyUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<CountyCreateWithoutRegionInput, CountyUncheckedCreateWithoutRegionInput> | CountyCreateWithoutRegionInput[] | CountyUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: CountyCreateOrConnectWithoutRegionInput | CountyCreateOrConnectWithoutRegionInput[]
    upsert?: CountyUpsertWithWhereUniqueWithoutRegionInput | CountyUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: CountyCreateManyRegionInputEnvelope
    set?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    disconnect?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    delete?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    connect?: CountyWhereUniqueInput | CountyWhereUniqueInput[]
    update?: CountyUpdateWithWhereUniqueWithoutRegionInput | CountyUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: CountyUpdateManyWithWhereWithoutRegionInput | CountyUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: CountyScalarWhereInput | CountyScalarWhereInput[]
  }

  export type InterestedStudentsUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<InterestedStudentsCreateWithoutRegionInput, InterestedStudentsUncheckedCreateWithoutRegionInput> | InterestedStudentsCreateWithoutRegionInput[] | InterestedStudentsUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: InterestedStudentsCreateOrConnectWithoutRegionInput | InterestedStudentsCreateOrConnectWithoutRegionInput[]
    upsert?: InterestedStudentsUpsertWithWhereUniqueWithoutRegionInput | InterestedStudentsUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: InterestedStudentsCreateManyRegionInputEnvelope
    set?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    disconnect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    delete?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    connect?: InterestedStudentsWhereUniqueInput | InterestedStudentsWhereUniqueInput[]
    update?: InterestedStudentsUpdateWithWhereUniqueWithoutRegionInput | InterestedStudentsUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: InterestedStudentsUpdateManyWithWhereWithoutRegionInput | InterestedStudentsUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
  }

  export type SchoolUncheckedUpdateManyWithoutRegionNestedInput = {
    create?: XOR<SchoolCreateWithoutRegionInput, SchoolUncheckedCreateWithoutRegionInput> | SchoolCreateWithoutRegionInput[] | SchoolUncheckedCreateWithoutRegionInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutRegionInput | SchoolCreateOrConnectWithoutRegionInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutRegionInput | SchoolUpsertWithWhereUniqueWithoutRegionInput[]
    createMany?: SchoolCreateManyRegionInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutRegionInput | SchoolUpdateWithWhereUniqueWithoutRegionInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutRegionInput | SchoolUpdateManyWithWhereWithoutRegionInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type CityCreateNestedManyWithoutCountyInput = {
    create?: XOR<CityCreateWithoutCountyInput, CityUncheckedCreateWithoutCountyInput> | CityCreateWithoutCountyInput[] | CityUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: CityCreateOrConnectWithoutCountyInput | CityCreateOrConnectWithoutCountyInput[]
    createMany?: CityCreateManyCountyInputEnvelope
    connect?: CityWhereUniqueInput | CityWhereUniqueInput[]
  }

  export type RegionCreateNestedOneWithoutCountyInput = {
    create?: XOR<RegionCreateWithoutCountyInput, RegionUncheckedCreateWithoutCountyInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCountyInput
    connect?: RegionWhereUniqueInput
  }

  export type SchoolCreateNestedManyWithoutCountyInput = {
    create?: XOR<SchoolCreateWithoutCountyInput, SchoolUncheckedCreateWithoutCountyInput> | SchoolCreateWithoutCountyInput[] | SchoolUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountyInput | SchoolCreateOrConnectWithoutCountyInput[]
    createMany?: SchoolCreateManyCountyInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type CityUncheckedCreateNestedManyWithoutCountyInput = {
    create?: XOR<CityCreateWithoutCountyInput, CityUncheckedCreateWithoutCountyInput> | CityCreateWithoutCountyInput[] | CityUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: CityCreateOrConnectWithoutCountyInput | CityCreateOrConnectWithoutCountyInput[]
    createMany?: CityCreateManyCountyInputEnvelope
    connect?: CityWhereUniqueInput | CityWhereUniqueInput[]
  }

  export type SchoolUncheckedCreateNestedManyWithoutCountyInput = {
    create?: XOR<SchoolCreateWithoutCountyInput, SchoolUncheckedCreateWithoutCountyInput> | SchoolCreateWithoutCountyInput[] | SchoolUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountyInput | SchoolCreateOrConnectWithoutCountyInput[]
    createMany?: SchoolCreateManyCountyInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type CityUpdateManyWithoutCountyNestedInput = {
    create?: XOR<CityCreateWithoutCountyInput, CityUncheckedCreateWithoutCountyInput> | CityCreateWithoutCountyInput[] | CityUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: CityCreateOrConnectWithoutCountyInput | CityCreateOrConnectWithoutCountyInput[]
    upsert?: CityUpsertWithWhereUniqueWithoutCountyInput | CityUpsertWithWhereUniqueWithoutCountyInput[]
    createMany?: CityCreateManyCountyInputEnvelope
    set?: CityWhereUniqueInput | CityWhereUniqueInput[]
    disconnect?: CityWhereUniqueInput | CityWhereUniqueInput[]
    delete?: CityWhereUniqueInput | CityWhereUniqueInput[]
    connect?: CityWhereUniqueInput | CityWhereUniqueInput[]
    update?: CityUpdateWithWhereUniqueWithoutCountyInput | CityUpdateWithWhereUniqueWithoutCountyInput[]
    updateMany?: CityUpdateManyWithWhereWithoutCountyInput | CityUpdateManyWithWhereWithoutCountyInput[]
    deleteMany?: CityScalarWhereInput | CityScalarWhereInput[]
  }

  export type RegionUpdateOneRequiredWithoutCountyNestedInput = {
    create?: XOR<RegionCreateWithoutCountyInput, RegionUncheckedCreateWithoutCountyInput>
    connectOrCreate?: RegionCreateOrConnectWithoutCountyInput
    upsert?: RegionUpsertWithoutCountyInput
    connect?: RegionWhereUniqueInput
    update?: XOR<XOR<RegionUpdateToOneWithWhereWithoutCountyInput, RegionUpdateWithoutCountyInput>, RegionUncheckedUpdateWithoutCountyInput>
  }

  export type SchoolUpdateManyWithoutCountyNestedInput = {
    create?: XOR<SchoolCreateWithoutCountyInput, SchoolUncheckedCreateWithoutCountyInput> | SchoolCreateWithoutCountyInput[] | SchoolUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountyInput | SchoolCreateOrConnectWithoutCountyInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutCountyInput | SchoolUpsertWithWhereUniqueWithoutCountyInput[]
    createMany?: SchoolCreateManyCountyInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutCountyInput | SchoolUpdateWithWhereUniqueWithoutCountyInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutCountyInput | SchoolUpdateManyWithWhereWithoutCountyInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type CityUncheckedUpdateManyWithoutCountyNestedInput = {
    create?: XOR<CityCreateWithoutCountyInput, CityUncheckedCreateWithoutCountyInput> | CityCreateWithoutCountyInput[] | CityUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: CityCreateOrConnectWithoutCountyInput | CityCreateOrConnectWithoutCountyInput[]
    upsert?: CityUpsertWithWhereUniqueWithoutCountyInput | CityUpsertWithWhereUniqueWithoutCountyInput[]
    createMany?: CityCreateManyCountyInputEnvelope
    set?: CityWhereUniqueInput | CityWhereUniqueInput[]
    disconnect?: CityWhereUniqueInput | CityWhereUniqueInput[]
    delete?: CityWhereUniqueInput | CityWhereUniqueInput[]
    connect?: CityWhereUniqueInput | CityWhereUniqueInput[]
    update?: CityUpdateWithWhereUniqueWithoutCountyInput | CityUpdateWithWhereUniqueWithoutCountyInput[]
    updateMany?: CityUpdateManyWithWhereWithoutCountyInput | CityUpdateManyWithWhereWithoutCountyInput[]
    deleteMany?: CityScalarWhereInput | CityScalarWhereInput[]
  }

  export type SchoolUncheckedUpdateManyWithoutCountyNestedInput = {
    create?: XOR<SchoolCreateWithoutCountyInput, SchoolUncheckedCreateWithoutCountyInput> | SchoolCreateWithoutCountyInput[] | SchoolUncheckedCreateWithoutCountyInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCountyInput | SchoolCreateOrConnectWithoutCountyInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutCountyInput | SchoolUpsertWithWhereUniqueWithoutCountyInput[]
    createMany?: SchoolCreateManyCountyInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutCountyInput | SchoolUpdateWithWhereUniqueWithoutCountyInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutCountyInput | SchoolUpdateManyWithWhereWithoutCountyInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type CountyCreateNestedOneWithoutCityInput = {
    create?: XOR<CountyCreateWithoutCityInput, CountyUncheckedCreateWithoutCityInput>
    connectOrCreate?: CountyCreateOrConnectWithoutCityInput
    connect?: CountyWhereUniqueInput
  }

  export type SchoolCreateNestedManyWithoutCityInput = {
    create?: XOR<SchoolCreateWithoutCityInput, SchoolUncheckedCreateWithoutCityInput> | SchoolCreateWithoutCityInput[] | SchoolUncheckedCreateWithoutCityInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCityInput | SchoolCreateOrConnectWithoutCityInput[]
    createMany?: SchoolCreateManyCityInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type SchoolUncheckedCreateNestedManyWithoutCityInput = {
    create?: XOR<SchoolCreateWithoutCityInput, SchoolUncheckedCreateWithoutCityInput> | SchoolCreateWithoutCityInput[] | SchoolUncheckedCreateWithoutCityInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCityInput | SchoolCreateOrConnectWithoutCityInput[]
    createMany?: SchoolCreateManyCityInputEnvelope
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
  }

  export type CountyUpdateOneRequiredWithoutCityNestedInput = {
    create?: XOR<CountyCreateWithoutCityInput, CountyUncheckedCreateWithoutCityInput>
    connectOrCreate?: CountyCreateOrConnectWithoutCityInput
    upsert?: CountyUpsertWithoutCityInput
    connect?: CountyWhereUniqueInput
    update?: XOR<XOR<CountyUpdateToOneWithWhereWithoutCityInput, CountyUpdateWithoutCityInput>, CountyUncheckedUpdateWithoutCityInput>
  }

  export type SchoolUpdateManyWithoutCityNestedInput = {
    create?: XOR<SchoolCreateWithoutCityInput, SchoolUncheckedCreateWithoutCityInput> | SchoolCreateWithoutCityInput[] | SchoolUncheckedCreateWithoutCityInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCityInput | SchoolCreateOrConnectWithoutCityInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutCityInput | SchoolUpsertWithWhereUniqueWithoutCityInput[]
    createMany?: SchoolCreateManyCityInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutCityInput | SchoolUpdateWithWhereUniqueWithoutCityInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutCityInput | SchoolUpdateManyWithWhereWithoutCityInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type SchoolUncheckedUpdateManyWithoutCityNestedInput = {
    create?: XOR<SchoolCreateWithoutCityInput, SchoolUncheckedCreateWithoutCityInput> | SchoolCreateWithoutCityInput[] | SchoolUncheckedCreateWithoutCityInput[]
    connectOrCreate?: SchoolCreateOrConnectWithoutCityInput | SchoolCreateOrConnectWithoutCityInput[]
    upsert?: SchoolUpsertWithWhereUniqueWithoutCityInput | SchoolUpsertWithWhereUniqueWithoutCityInput[]
    createMany?: SchoolCreateManyCityInputEnvelope
    set?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    disconnect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    delete?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    connect?: SchoolWhereUniqueInput | SchoolWhereUniqueInput[]
    update?: SchoolUpdateWithWhereUniqueWithoutCityInput | SchoolUpdateWithWhereUniqueWithoutCityInput[]
    updateMany?: SchoolUpdateManyWithWhereWithoutCityInput | SchoolUpdateManyWithWhereWithoutCityInput[]
    deleteMany?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type ContactCreateWithoutSchoolInput = {
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
    User?: UserCreateNestedManyWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutSchoolInput = {
    contact_id?: number
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
    User?: UserUncheckedCreateNestedManyWithoutContactInput
  }

  export type ContactCreateOrConnectWithoutSchoolInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutSchoolInput, ContactUncheckedCreateWithoutSchoolInput>
  }

  export type ContactCreateManySchoolInputEnvelope = {
    data: ContactCreateManySchoolInput | ContactCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type EventCreateWithoutSchoolInput = {
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    User?: UserCreateNestedManyWithoutEventInput
    InterestedStudents?: InterestedStudentsCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutSchoolInput = {
    event_id?: number
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    User?: UserUncheckedCreateNestedManyWithoutEventInput
    InterestedStudents?: InterestedStudentsUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutSchoolInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutSchoolInput, EventUncheckedCreateWithoutSchoolInput>
  }

  export type EventCreateManySchoolInputEnvelope = {
    data: EventCreateManySchoolInput | EventCreateManySchoolInput[]
    skipDuplicates?: boolean
  }

  export type CityCreateWithoutSchoolInput = {
    city_name: string
    county: CountyCreateNestedOneWithoutCityInput
  }

  export type CityUncheckedCreateWithoutSchoolInput = {
    city_id?: number
    city_name: string
    county_id: number
  }

  export type CityCreateOrConnectWithoutSchoolInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutSchoolInput, CityUncheckedCreateWithoutSchoolInput>
  }

  export type CountryCreateWithoutSchoolInput = {
    country_name: string
    InterestedStudent?: InterestedStudentsCreateNestedManyWithoutCountryInput
    Region?: RegionCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateWithoutSchoolInput = {
    country_id?: number
    country_name: string
    InterestedStudent?: InterestedStudentsUncheckedCreateNestedManyWithoutCountryInput
    Region?: RegionUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryCreateOrConnectWithoutSchoolInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutSchoolInput, CountryUncheckedCreateWithoutSchoolInput>
  }

  export type CountyCreateWithoutSchoolInput = {
    county_name: string
    city?: CityCreateNestedManyWithoutCountyInput
    region: RegionCreateNestedOneWithoutCountyInput
  }

  export type CountyUncheckedCreateWithoutSchoolInput = {
    county_id?: number
    county_name: string
    region_id: number
    city?: CityUncheckedCreateNestedManyWithoutCountyInput
  }

  export type CountyCreateOrConnectWithoutSchoolInput = {
    where: CountyWhereUniqueInput
    create: XOR<CountyCreateWithoutSchoolInput, CountyUncheckedCreateWithoutSchoolInput>
  }

  export type RegionCreateWithoutSchoolInput = {
    region_name: string
    County?: CountyCreateNestedManyWithoutRegionInput
    InterestedStudent?: InterestedStudentsCreateNestedManyWithoutRegionInput
    country: CountryCreateNestedOneWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutSchoolInput = {
    region_id?: number
    region_name: string
    country_id: number
    County?: CountyUncheckedCreateNestedManyWithoutRegionInput
    InterestedStudent?: InterestedStudentsUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutSchoolInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutSchoolInput, RegionUncheckedCreateWithoutSchoolInput>
  }

  export type UserCreateWithoutSchoolInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Contact?: ContactCreateNestedManyWithoutUserInput
    Event?: EventCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutSchoolInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Contact?: ContactUncheckedCreateNestedManyWithoutUserInput
    Event?: EventUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutSchoolInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutSchoolInput, UserUncheckedCreateWithoutSchoolInput>
  }

  export type ContactUpsertWithWhereUniqueWithoutSchoolInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutSchoolInput, ContactUncheckedUpdateWithoutSchoolInput>
    create: XOR<ContactCreateWithoutSchoolInput, ContactUncheckedCreateWithoutSchoolInput>
  }

  export type ContactUpdateWithWhereUniqueWithoutSchoolInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutSchoolInput, ContactUncheckedUpdateWithoutSchoolInput>
  }

  export type ContactUpdateManyWithWhereWithoutSchoolInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutSchoolInput>
  }

  export type ContactScalarWhereInput = {
    AND?: ContactScalarWhereInput | ContactScalarWhereInput[]
    OR?: ContactScalarWhereInput[]
    NOT?: ContactScalarWhereInput | ContactScalarWhereInput[]
    contact_id?: IntFilter<"Contact"> | number
    contact_email?: StringFilter<"Contact"> | string
    contact_name?: StringNullableFilter<"Contact"> | string | null
    contact_phone?: StringNullableFilter<"Contact"> | string | null
    contact_note?: StringNullableFilter<"Contact"> | string | null
    createdAt?: DateTimeFilter<"Contact"> | Date | string
    active?: BoolFilter<"Contact"> | boolean
    active_by?: StringFilter<"Contact"> | string
    school_id?: IntNullableFilter<"Contact"> | number | null
  }

  export type EventUpsertWithWhereUniqueWithoutSchoolInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutSchoolInput, EventUncheckedUpdateWithoutSchoolInput>
    create: XOR<EventCreateWithoutSchoolInput, EventUncheckedCreateWithoutSchoolInput>
  }

  export type EventUpdateWithWhereUniqueWithoutSchoolInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutSchoolInput, EventUncheckedUpdateWithoutSchoolInput>
  }

  export type EventUpdateManyWithWhereWithoutSchoolInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutSchoolInput>
  }

  export type EventScalarWhereInput = {
    AND?: EventScalarWhereInput | EventScalarWhereInput[]
    OR?: EventScalarWhereInput[]
    NOT?: EventScalarWhereInput | EventScalarWhereInput[]
    event_id?: IntFilter<"Event"> | number
    event_name?: StringFilter<"Event"> | string
    create_date?: DateTimeFilter<"Event"> | Date | string
    closing_date?: DateTimeFilter<"Event"> | Date | string
    event_year?: IntFilter<"Event"> | number
    semester?: StringFilter<"Event"> | string
    on_duty?: StringFilter<"Event"> | string
    event_type?: StringFilter<"Event"> | string
    estimated_student?: IntFilter<"Event"> | number
    note?: StringNullableFilter<"Event"> | string | null
    slug?: StringFilter<"Event"> | string
    school_id?: IntFilter<"Event"> | number
  }

  export type CityUpsertWithoutSchoolInput = {
    update: XOR<CityUpdateWithoutSchoolInput, CityUncheckedUpdateWithoutSchoolInput>
    create: XOR<CityCreateWithoutSchoolInput, CityUncheckedCreateWithoutSchoolInput>
    where?: CityWhereInput
  }

  export type CityUpdateToOneWithWhereWithoutSchoolInput = {
    where?: CityWhereInput
    data: XOR<CityUpdateWithoutSchoolInput, CityUncheckedUpdateWithoutSchoolInput>
  }

  export type CityUpdateWithoutSchoolInput = {
    city_name?: StringFieldUpdateOperationsInput | string
    county?: CountyUpdateOneRequiredWithoutCityNestedInput
  }

  export type CityUncheckedUpdateWithoutSchoolInput = {
    city_id?: IntFieldUpdateOperationsInput | number
    city_name?: StringFieldUpdateOperationsInput | string
    county_id?: IntFieldUpdateOperationsInput | number
  }

  export type CountryUpsertWithoutSchoolInput = {
    update: XOR<CountryUpdateWithoutSchoolInput, CountryUncheckedUpdateWithoutSchoolInput>
    create: XOR<CountryCreateWithoutSchoolInput, CountryUncheckedCreateWithoutSchoolInput>
    where?: CountryWhereInput
  }

  export type CountryUpdateToOneWithWhereWithoutSchoolInput = {
    where?: CountryWhereInput
    data: XOR<CountryUpdateWithoutSchoolInput, CountryUncheckedUpdateWithoutSchoolInput>
  }

  export type CountryUpdateWithoutSchoolInput = {
    country_name?: StringFieldUpdateOperationsInput | string
    InterestedStudent?: InterestedStudentsUpdateManyWithoutCountryNestedInput
    Region?: RegionUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateWithoutSchoolInput = {
    country_id?: IntFieldUpdateOperationsInput | number
    country_name?: StringFieldUpdateOperationsInput | string
    InterestedStudent?: InterestedStudentsUncheckedUpdateManyWithoutCountryNestedInput
    Region?: RegionUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type CountyUpsertWithoutSchoolInput = {
    update: XOR<CountyUpdateWithoutSchoolInput, CountyUncheckedUpdateWithoutSchoolInput>
    create: XOR<CountyCreateWithoutSchoolInput, CountyUncheckedCreateWithoutSchoolInput>
    where?: CountyWhereInput
  }

  export type CountyUpdateToOneWithWhereWithoutSchoolInput = {
    where?: CountyWhereInput
    data: XOR<CountyUpdateWithoutSchoolInput, CountyUncheckedUpdateWithoutSchoolInput>
  }

  export type CountyUpdateWithoutSchoolInput = {
    county_name?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateManyWithoutCountyNestedInput
    region?: RegionUpdateOneRequiredWithoutCountyNestedInput
  }

  export type CountyUncheckedUpdateWithoutSchoolInput = {
    county_id?: IntFieldUpdateOperationsInput | number
    county_name?: StringFieldUpdateOperationsInput | string
    region_id?: IntFieldUpdateOperationsInput | number
    city?: CityUncheckedUpdateManyWithoutCountyNestedInput
  }

  export type RegionUpsertWithoutSchoolInput = {
    update: XOR<RegionUpdateWithoutSchoolInput, RegionUncheckedUpdateWithoutSchoolInput>
    create: XOR<RegionCreateWithoutSchoolInput, RegionUncheckedCreateWithoutSchoolInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutSchoolInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutSchoolInput, RegionUncheckedUpdateWithoutSchoolInput>
  }

  export type RegionUpdateWithoutSchoolInput = {
    region_name?: StringFieldUpdateOperationsInput | string
    County?: CountyUpdateManyWithoutRegionNestedInput
    InterestedStudent?: InterestedStudentsUpdateManyWithoutRegionNestedInput
    country?: CountryUpdateOneRequiredWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutSchoolInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    County?: CountyUncheckedUpdateManyWithoutRegionNestedInput
    InterestedStudent?: InterestedStudentsUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutSchoolInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutSchoolInput, UserUncheckedUpdateWithoutSchoolInput>
    create: XOR<UserCreateWithoutSchoolInput, UserUncheckedCreateWithoutSchoolInput>
  }

  export type UserUpdateWithWhereUniqueWithoutSchoolInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutSchoolInput, UserUncheckedUpdateWithoutSchoolInput>
  }

  export type UserUpdateManyWithWhereWithoutSchoolInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutSchoolInput>
  }

  export type UserScalarWhereInput = {
    AND?: UserScalarWhereInput | UserScalarWhereInput[]
    OR?: UserScalarWhereInput[]
    NOT?: UserScalarWhereInput | UserScalarWhereInput[]
    user_id?: StringFilter<"User"> | string
    user_name?: StringFilter<"User"> | string
    nationality?: StringFilter<"User"> | string
    user_phone?: StringFilter<"User"> | string
    user_email?: StringFilter<"User"> | string
    on_duty?: IntNullableListFilter<"User">
    passwordHash?: StringFilter<"User"> | string
    userAuthToken?: StringFilter<"User"> | string
    resetToken?: StringNullableFilter<"User"> | string | null
    resetTokenExpiry?: DateTimeNullableFilter<"User"> | Date | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    active?: BoolFilter<"User"> | boolean
    active_by?: StringFilter<"User"> | string
  }

  export type SchoolCreateWithoutContactInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Event?: EventCreateNestedManyWithoutSchoolInput
    city: CityCreateNestedOneWithoutSchoolInput
    country: CountryCreateNestedOneWithoutSchoolInput
    county: CountyCreateNestedOneWithoutSchoolInput
    region: RegionCreateNestedOneWithoutSchoolInput
    User?: UserCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutContactInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Event?: EventUncheckedCreateNestedManyWithoutSchoolInput
    User?: UserUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutContactInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutContactInput, SchoolUncheckedCreateWithoutContactInput>
  }

  export type UserCreateWithoutContactInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Event?: EventCreateNestedManyWithoutUserInput
    School?: SchoolCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutContactInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Event?: EventUncheckedCreateNestedManyWithoutUserInput
    School?: SchoolUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutContactInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutContactInput, UserUncheckedCreateWithoutContactInput>
  }

  export type SchoolUpsertWithoutContactInput = {
    update: XOR<SchoolUpdateWithoutContactInput, SchoolUncheckedUpdateWithoutContactInput>
    create: XOR<SchoolCreateWithoutContactInput, SchoolUncheckedCreateWithoutContactInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutContactInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutContactInput, SchoolUncheckedUpdateWithoutContactInput>
  }

  export type SchoolUpdateWithoutContactInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Event?: EventUpdateManyWithoutSchoolNestedInput
    city?: CityUpdateOneRequiredWithoutSchoolNestedInput
    country?: CountryUpdateOneRequiredWithoutSchoolNestedInput
    county?: CountyUpdateOneRequiredWithoutSchoolNestedInput
    region?: RegionUpdateOneRequiredWithoutSchoolNestedInput
    User?: UserUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutContactInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Event?: EventUncheckedUpdateManyWithoutSchoolNestedInput
    User?: UserUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutContactInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutContactInput, UserUncheckedUpdateWithoutContactInput>
    create: XOR<UserCreateWithoutContactInput, UserUncheckedCreateWithoutContactInput>
  }

  export type UserUpdateWithWhereUniqueWithoutContactInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutContactInput, UserUncheckedUpdateWithoutContactInput>
  }

  export type UserUpdateManyWithWhereWithoutContactInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutContactInput>
  }

  export type ContactCreateWithoutUserInput = {
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
    School?: SchoolCreateNestedOneWithoutContactInput
  }

  export type ContactUncheckedCreateWithoutUserInput = {
    contact_id?: number
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
    school_id?: number | null
  }

  export type ContactCreateOrConnectWithoutUserInput = {
    where: ContactWhereUniqueInput
    create: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput>
  }

  export type EventCreateWithoutUserInput = {
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    School: SchoolCreateNestedOneWithoutEventInput
    InterestedStudents?: InterestedStudentsCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutUserInput = {
    event_id?: number
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    school_id: number
    InterestedStudents?: InterestedStudentsUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutUserInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type SchoolCreateWithoutUserInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactCreateNestedManyWithoutSchoolInput
    Event?: EventCreateNestedManyWithoutSchoolInput
    city: CityCreateNestedOneWithoutSchoolInput
    country: CountryCreateNestedOneWithoutSchoolInput
    county: CountyCreateNestedOneWithoutSchoolInput
    region: RegionCreateNestedOneWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutUserInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactUncheckedCreateNestedManyWithoutSchoolInput
    Event?: EventUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutUserInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutUserInput, SchoolUncheckedCreateWithoutUserInput>
  }

  export type ContactUpsertWithWhereUniqueWithoutUserInput = {
    where: ContactWhereUniqueInput
    update: XOR<ContactUpdateWithoutUserInput, ContactUncheckedUpdateWithoutUserInput>
    create: XOR<ContactCreateWithoutUserInput, ContactUncheckedCreateWithoutUserInput>
  }

  export type ContactUpdateWithWhereUniqueWithoutUserInput = {
    where: ContactWhereUniqueInput
    data: XOR<ContactUpdateWithoutUserInput, ContactUncheckedUpdateWithoutUserInput>
  }

  export type ContactUpdateManyWithWhereWithoutUserInput = {
    where: ContactScalarWhereInput
    data: XOR<ContactUpdateManyMutationInput, ContactUncheckedUpdateManyWithoutUserInput>
  }

  export type EventUpsertWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    update: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
    create: XOR<EventCreateWithoutUserInput, EventUncheckedCreateWithoutUserInput>
  }

  export type EventUpdateWithWhereUniqueWithoutUserInput = {
    where: EventWhereUniqueInput
    data: XOR<EventUpdateWithoutUserInput, EventUncheckedUpdateWithoutUserInput>
  }

  export type EventUpdateManyWithWhereWithoutUserInput = {
    where: EventScalarWhereInput
    data: XOR<EventUpdateManyMutationInput, EventUncheckedUpdateManyWithoutUserInput>
  }

  export type SchoolUpsertWithWhereUniqueWithoutUserInput = {
    where: SchoolWhereUniqueInput
    update: XOR<SchoolUpdateWithoutUserInput, SchoolUncheckedUpdateWithoutUserInput>
    create: XOR<SchoolCreateWithoutUserInput, SchoolUncheckedCreateWithoutUserInput>
  }

  export type SchoolUpdateWithWhereUniqueWithoutUserInput = {
    where: SchoolWhereUniqueInput
    data: XOR<SchoolUpdateWithoutUserInput, SchoolUncheckedUpdateWithoutUserInput>
  }

  export type SchoolUpdateManyWithWhereWithoutUserInput = {
    where: SchoolScalarWhereInput
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyWithoutUserInput>
  }

  export type SchoolScalarWhereInput = {
    AND?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
    OR?: SchoolScalarWhereInput[]
    NOT?: SchoolScalarWhereInput | SchoolScalarWhereInput[]
    school_id?: IntFilter<"School"> | number
    om_id?: StringNullableFilter<"School"> | string | null
    school_name?: StringFilter<"School"> | string
    zip_code?: StringFilter<"School"> | string
    address?: StringFilter<"School"> | string
    dir_name?: StringNullableFilter<"School"> | string | null
    dir_phone?: StringNullableFilter<"School"> | string | null
    school_email?: StringFilter<"School"> | string
    website?: StringNullableFilter<"School"> | string | null
    school_type?: StringNullableListFilter<"School">
    coop?: BoolNullableFilter<"School"> | boolean | null
    note?: StringNullableFilter<"School"> | string | null
    city_id?: IntFilter<"School"> | number
    country_id?: IntFilter<"School"> | number
    county_id?: IntFilter<"School"> | number
    region_id?: IntFilter<"School"> | number
    duty?: StringNullableListFilter<"School">
    active?: BoolFilter<"School"> | boolean
    active_by?: StringFilter<"School"> | string
    basic?: BoolFilter<"School"> | boolean
    medior?: BoolFilter<"School"> | boolean
    high?: BoolFilter<"School"> | boolean
  }

  export type SchoolCreateWithoutEventInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactCreateNestedManyWithoutSchoolInput
    city: CityCreateNestedOneWithoutSchoolInput
    country: CountryCreateNestedOneWithoutSchoolInput
    county: CountyCreateNestedOneWithoutSchoolInput
    region: RegionCreateNestedOneWithoutSchoolInput
    User?: UserCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutEventInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactUncheckedCreateNestedManyWithoutSchoolInput
    User?: UserUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutEventInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutEventInput, SchoolUncheckedCreateWithoutEventInput>
  }

  export type UserCreateWithoutEventInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Contact?: ContactCreateNestedManyWithoutUserInput
    School?: SchoolCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutEventInput = {
    user_id?: string
    user_name: string
    nationality: string
    user_phone: string
    user_email: string
    on_duty?: UserCreateon_dutyInput | number[]
    passwordHash: string
    userAuthToken: string
    resetToken?: string | null
    resetTokenExpiry?: Date | string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    active: boolean
    active_by: string
    Contact?: ContactUncheckedCreateNestedManyWithoutUserInput
    School?: SchoolUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutEventInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutEventInput, UserUncheckedCreateWithoutEventInput>
  }

  export type InterestedStudentsCreateWithoutEventInput = {
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    Country: CountryCreateNestedOneWithoutInterestedStudentInput
    Region: RegionCreateNestedOneWithoutInterestedStudentInput
  }

  export type InterestedStudentsUncheckedCreateWithoutEventInput = {
    intrest_id?: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    country_id: number
    region_id: number
  }

  export type InterestedStudentsCreateOrConnectWithoutEventInput = {
    where: InterestedStudentsWhereUniqueInput
    create: XOR<InterestedStudentsCreateWithoutEventInput, InterestedStudentsUncheckedCreateWithoutEventInput>
  }

  export type InterestedStudentsCreateManyEventInputEnvelope = {
    data: InterestedStudentsCreateManyEventInput | InterestedStudentsCreateManyEventInput[]
    skipDuplicates?: boolean
  }

  export type SchoolUpsertWithoutEventInput = {
    update: XOR<SchoolUpdateWithoutEventInput, SchoolUncheckedUpdateWithoutEventInput>
    create: XOR<SchoolCreateWithoutEventInput, SchoolUncheckedCreateWithoutEventInput>
    where?: SchoolWhereInput
  }

  export type SchoolUpdateToOneWithWhereWithoutEventInput = {
    where?: SchoolWhereInput
    data: XOR<SchoolUpdateWithoutEventInput, SchoolUncheckedUpdateWithoutEventInput>
  }

  export type SchoolUpdateWithoutEventInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUpdateManyWithoutSchoolNestedInput
    city?: CityUpdateOneRequiredWithoutSchoolNestedInput
    country?: CountryUpdateOneRequiredWithoutSchoolNestedInput
    county?: CountyUpdateOneRequiredWithoutSchoolNestedInput
    region?: RegionUpdateOneRequiredWithoutSchoolNestedInput
    User?: UserUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutEventInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUncheckedUpdateManyWithoutSchoolNestedInput
    User?: UserUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type UserUpsertWithWhereUniqueWithoutEventInput = {
    where: UserWhereUniqueInput
    update: XOR<UserUpdateWithoutEventInput, UserUncheckedUpdateWithoutEventInput>
    create: XOR<UserCreateWithoutEventInput, UserUncheckedCreateWithoutEventInput>
  }

  export type UserUpdateWithWhereUniqueWithoutEventInput = {
    where: UserWhereUniqueInput
    data: XOR<UserUpdateWithoutEventInput, UserUncheckedUpdateWithoutEventInput>
  }

  export type UserUpdateManyWithWhereWithoutEventInput = {
    where: UserScalarWhereInput
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyWithoutEventInput>
  }

  export type InterestedStudentsUpsertWithWhereUniqueWithoutEventInput = {
    where: InterestedStudentsWhereUniqueInput
    update: XOR<InterestedStudentsUpdateWithoutEventInput, InterestedStudentsUncheckedUpdateWithoutEventInput>
    create: XOR<InterestedStudentsCreateWithoutEventInput, InterestedStudentsUncheckedCreateWithoutEventInput>
  }

  export type InterestedStudentsUpdateWithWhereUniqueWithoutEventInput = {
    where: InterestedStudentsWhereUniqueInput
    data: XOR<InterestedStudentsUpdateWithoutEventInput, InterestedStudentsUncheckedUpdateWithoutEventInput>
  }

  export type InterestedStudentsUpdateManyWithWhereWithoutEventInput = {
    where: InterestedStudentsScalarWhereInput
    data: XOR<InterestedStudentsUpdateManyMutationInput, InterestedStudentsUncheckedUpdateManyWithoutEventInput>
  }

  export type InterestedStudentsScalarWhereInput = {
    AND?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
    OR?: InterestedStudentsScalarWhereInput[]
    NOT?: InterestedStudentsScalarWhereInput | InterestedStudentsScalarWhereInput[]
    intrest_id?: IntFilter<"InterestedStudents"> | number
    event_id?: IntFilter<"InterestedStudents"> | number
    intrest_count?: IntFilter<"InterestedStudents"> | number
    grade?: StringFilter<"InterestedStudents"> | string
    applied?: BoolFilter<"InterestedStudents"> | boolean
    work_title?: StringFilter<"InterestedStudents"> | string
    channel?: StringFilter<"InterestedStudents"> | string
    status?: StringFilter<"InterestedStudents"> | string
    country_id?: IntFilter<"InterestedStudents"> | number
    region_id?: IntFilter<"InterestedStudents"> | number
  }

  export type CountryCreateWithoutInterestedStudentInput = {
    country_name: string
    Region?: RegionCreateNestedManyWithoutCountryInput
    School?: SchoolCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateWithoutInterestedStudentInput = {
    country_id?: number
    country_name: string
    Region?: RegionUncheckedCreateNestedManyWithoutCountryInput
    School?: SchoolUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryCreateOrConnectWithoutInterestedStudentInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutInterestedStudentInput, CountryUncheckedCreateWithoutInterestedStudentInput>
  }

  export type EventCreateWithoutInterestedStudentsInput = {
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    School: SchoolCreateNestedOneWithoutEventInput
    User?: UserCreateNestedManyWithoutEventInput
  }

  export type EventUncheckedCreateWithoutInterestedStudentsInput = {
    event_id?: number
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
    school_id: number
    User?: UserUncheckedCreateNestedManyWithoutEventInput
  }

  export type EventCreateOrConnectWithoutInterestedStudentsInput = {
    where: EventWhereUniqueInput
    create: XOR<EventCreateWithoutInterestedStudentsInput, EventUncheckedCreateWithoutInterestedStudentsInput>
  }

  export type RegionCreateWithoutInterestedStudentInput = {
    region_name: string
    County?: CountyCreateNestedManyWithoutRegionInput
    country: CountryCreateNestedOneWithoutRegionInput
    School?: SchoolCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutInterestedStudentInput = {
    region_id?: number
    region_name: string
    country_id: number
    County?: CountyUncheckedCreateNestedManyWithoutRegionInput
    School?: SchoolUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutInterestedStudentInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutInterestedStudentInput, RegionUncheckedCreateWithoutInterestedStudentInput>
  }

  export type CountryUpsertWithoutInterestedStudentInput = {
    update: XOR<CountryUpdateWithoutInterestedStudentInput, CountryUncheckedUpdateWithoutInterestedStudentInput>
    create: XOR<CountryCreateWithoutInterestedStudentInput, CountryUncheckedCreateWithoutInterestedStudentInput>
    where?: CountryWhereInput
  }

  export type CountryUpdateToOneWithWhereWithoutInterestedStudentInput = {
    where?: CountryWhereInput
    data: XOR<CountryUpdateWithoutInterestedStudentInput, CountryUncheckedUpdateWithoutInterestedStudentInput>
  }

  export type CountryUpdateWithoutInterestedStudentInput = {
    country_name?: StringFieldUpdateOperationsInput | string
    Region?: RegionUpdateManyWithoutCountryNestedInput
    School?: SchoolUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateWithoutInterestedStudentInput = {
    country_id?: IntFieldUpdateOperationsInput | number
    country_name?: StringFieldUpdateOperationsInput | string
    Region?: RegionUncheckedUpdateManyWithoutCountryNestedInput
    School?: SchoolUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type EventUpsertWithoutInterestedStudentsInput = {
    update: XOR<EventUpdateWithoutInterestedStudentsInput, EventUncheckedUpdateWithoutInterestedStudentsInput>
    create: XOR<EventCreateWithoutInterestedStudentsInput, EventUncheckedCreateWithoutInterestedStudentsInput>
    where?: EventWhereInput
  }

  export type EventUpdateToOneWithWhereWithoutInterestedStudentsInput = {
    where?: EventWhereInput
    data: XOR<EventUpdateWithoutInterestedStudentsInput, EventUncheckedUpdateWithoutInterestedStudentsInput>
  }

  export type EventUpdateWithoutInterestedStudentsInput = {
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    School?: SchoolUpdateOneRequiredWithoutEventNestedInput
    User?: UserUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutInterestedStudentsInput = {
    event_id?: IntFieldUpdateOperationsInput | number
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    school_id?: IntFieldUpdateOperationsInput | number
    User?: UserUncheckedUpdateManyWithoutEventNestedInput
  }

  export type RegionUpsertWithoutInterestedStudentInput = {
    update: XOR<RegionUpdateWithoutInterestedStudentInput, RegionUncheckedUpdateWithoutInterestedStudentInput>
    create: XOR<RegionCreateWithoutInterestedStudentInput, RegionUncheckedCreateWithoutInterestedStudentInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutInterestedStudentInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutInterestedStudentInput, RegionUncheckedUpdateWithoutInterestedStudentInput>
  }

  export type RegionUpdateWithoutInterestedStudentInput = {
    region_name?: StringFieldUpdateOperationsInput | string
    County?: CountyUpdateManyWithoutRegionNestedInput
    country?: CountryUpdateOneRequiredWithoutRegionNestedInput
    School?: SchoolUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutInterestedStudentInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    County?: CountyUncheckedUpdateManyWithoutRegionNestedInput
    School?: SchoolUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type InterestedStudentsCreateWithoutCountryInput = {
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    Event: EventCreateNestedOneWithoutInterestedStudentsInput
    Region: RegionCreateNestedOneWithoutInterestedStudentInput
  }

  export type InterestedStudentsUncheckedCreateWithoutCountryInput = {
    intrest_id?: number
    event_id: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    region_id: number
  }

  export type InterestedStudentsCreateOrConnectWithoutCountryInput = {
    where: InterestedStudentsWhereUniqueInput
    create: XOR<InterestedStudentsCreateWithoutCountryInput, InterestedStudentsUncheckedCreateWithoutCountryInput>
  }

  export type InterestedStudentsCreateManyCountryInputEnvelope = {
    data: InterestedStudentsCreateManyCountryInput | InterestedStudentsCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type RegionCreateWithoutCountryInput = {
    region_name: string
    County?: CountyCreateNestedManyWithoutRegionInput
    InterestedStudent?: InterestedStudentsCreateNestedManyWithoutRegionInput
    School?: SchoolCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutCountryInput = {
    region_id?: number
    region_name: string
    County?: CountyUncheckedCreateNestedManyWithoutRegionInput
    InterestedStudent?: InterestedStudentsUncheckedCreateNestedManyWithoutRegionInput
    School?: SchoolUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutCountryInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutCountryInput, RegionUncheckedCreateWithoutCountryInput>
  }

  export type RegionCreateManyCountryInputEnvelope = {
    data: RegionCreateManyCountryInput | RegionCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type SchoolCreateWithoutCountryInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactCreateNestedManyWithoutSchoolInput
    Event?: EventCreateNestedManyWithoutSchoolInput
    city: CityCreateNestedOneWithoutSchoolInput
    county: CountyCreateNestedOneWithoutSchoolInput
    region: RegionCreateNestedOneWithoutSchoolInput
    User?: UserCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutCountryInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactUncheckedCreateNestedManyWithoutSchoolInput
    Event?: EventUncheckedCreateNestedManyWithoutSchoolInput
    User?: UserUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutCountryInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutCountryInput, SchoolUncheckedCreateWithoutCountryInput>
  }

  export type SchoolCreateManyCountryInputEnvelope = {
    data: SchoolCreateManyCountryInput | SchoolCreateManyCountryInput[]
    skipDuplicates?: boolean
  }

  export type InterestedStudentsUpsertWithWhereUniqueWithoutCountryInput = {
    where: InterestedStudentsWhereUniqueInput
    update: XOR<InterestedStudentsUpdateWithoutCountryInput, InterestedStudentsUncheckedUpdateWithoutCountryInput>
    create: XOR<InterestedStudentsCreateWithoutCountryInput, InterestedStudentsUncheckedCreateWithoutCountryInput>
  }

  export type InterestedStudentsUpdateWithWhereUniqueWithoutCountryInput = {
    where: InterestedStudentsWhereUniqueInput
    data: XOR<InterestedStudentsUpdateWithoutCountryInput, InterestedStudentsUncheckedUpdateWithoutCountryInput>
  }

  export type InterestedStudentsUpdateManyWithWhereWithoutCountryInput = {
    where: InterestedStudentsScalarWhereInput
    data: XOR<InterestedStudentsUpdateManyMutationInput, InterestedStudentsUncheckedUpdateManyWithoutCountryInput>
  }

  export type RegionUpsertWithWhereUniqueWithoutCountryInput = {
    where: RegionWhereUniqueInput
    update: XOR<RegionUpdateWithoutCountryInput, RegionUncheckedUpdateWithoutCountryInput>
    create: XOR<RegionCreateWithoutCountryInput, RegionUncheckedCreateWithoutCountryInput>
  }

  export type RegionUpdateWithWhereUniqueWithoutCountryInput = {
    where: RegionWhereUniqueInput
    data: XOR<RegionUpdateWithoutCountryInput, RegionUncheckedUpdateWithoutCountryInput>
  }

  export type RegionUpdateManyWithWhereWithoutCountryInput = {
    where: RegionScalarWhereInput
    data: XOR<RegionUpdateManyMutationInput, RegionUncheckedUpdateManyWithoutCountryInput>
  }

  export type RegionScalarWhereInput = {
    AND?: RegionScalarWhereInput | RegionScalarWhereInput[]
    OR?: RegionScalarWhereInput[]
    NOT?: RegionScalarWhereInput | RegionScalarWhereInput[]
    region_id?: IntFilter<"Region"> | number
    region_name?: StringFilter<"Region"> | string
    country_id?: IntFilter<"Region"> | number
  }

  export type SchoolUpsertWithWhereUniqueWithoutCountryInput = {
    where: SchoolWhereUniqueInput
    update: XOR<SchoolUpdateWithoutCountryInput, SchoolUncheckedUpdateWithoutCountryInput>
    create: XOR<SchoolCreateWithoutCountryInput, SchoolUncheckedCreateWithoutCountryInput>
  }

  export type SchoolUpdateWithWhereUniqueWithoutCountryInput = {
    where: SchoolWhereUniqueInput
    data: XOR<SchoolUpdateWithoutCountryInput, SchoolUncheckedUpdateWithoutCountryInput>
  }

  export type SchoolUpdateManyWithWhereWithoutCountryInput = {
    where: SchoolScalarWhereInput
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyWithoutCountryInput>
  }

  export type CountyCreateWithoutRegionInput = {
    county_name: string
    city?: CityCreateNestedManyWithoutCountyInput
    School?: SchoolCreateNestedManyWithoutCountyInput
  }

  export type CountyUncheckedCreateWithoutRegionInput = {
    county_id?: number
    county_name: string
    city?: CityUncheckedCreateNestedManyWithoutCountyInput
    School?: SchoolUncheckedCreateNestedManyWithoutCountyInput
  }

  export type CountyCreateOrConnectWithoutRegionInput = {
    where: CountyWhereUniqueInput
    create: XOR<CountyCreateWithoutRegionInput, CountyUncheckedCreateWithoutRegionInput>
  }

  export type CountyCreateManyRegionInputEnvelope = {
    data: CountyCreateManyRegionInput | CountyCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type InterestedStudentsCreateWithoutRegionInput = {
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    Country: CountryCreateNestedOneWithoutInterestedStudentInput
    Event: EventCreateNestedOneWithoutInterestedStudentsInput
  }

  export type InterestedStudentsUncheckedCreateWithoutRegionInput = {
    intrest_id?: number
    event_id: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    country_id: number
  }

  export type InterestedStudentsCreateOrConnectWithoutRegionInput = {
    where: InterestedStudentsWhereUniqueInput
    create: XOR<InterestedStudentsCreateWithoutRegionInput, InterestedStudentsUncheckedCreateWithoutRegionInput>
  }

  export type InterestedStudentsCreateManyRegionInputEnvelope = {
    data: InterestedStudentsCreateManyRegionInput | InterestedStudentsCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type CountryCreateWithoutRegionInput = {
    country_name: string
    InterestedStudent?: InterestedStudentsCreateNestedManyWithoutCountryInput
    School?: SchoolCreateNestedManyWithoutCountryInput
  }

  export type CountryUncheckedCreateWithoutRegionInput = {
    country_id?: number
    country_name: string
    InterestedStudent?: InterestedStudentsUncheckedCreateNestedManyWithoutCountryInput
    School?: SchoolUncheckedCreateNestedManyWithoutCountryInput
  }

  export type CountryCreateOrConnectWithoutRegionInput = {
    where: CountryWhereUniqueInput
    create: XOR<CountryCreateWithoutRegionInput, CountryUncheckedCreateWithoutRegionInput>
  }

  export type SchoolCreateWithoutRegionInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactCreateNestedManyWithoutSchoolInput
    Event?: EventCreateNestedManyWithoutSchoolInput
    city: CityCreateNestedOneWithoutSchoolInput
    country: CountryCreateNestedOneWithoutSchoolInput
    county: CountyCreateNestedOneWithoutSchoolInput
    User?: UserCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutRegionInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    county_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactUncheckedCreateNestedManyWithoutSchoolInput
    Event?: EventUncheckedCreateNestedManyWithoutSchoolInput
    User?: UserUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutRegionInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutRegionInput, SchoolUncheckedCreateWithoutRegionInput>
  }

  export type SchoolCreateManyRegionInputEnvelope = {
    data: SchoolCreateManyRegionInput | SchoolCreateManyRegionInput[]
    skipDuplicates?: boolean
  }

  export type CountyUpsertWithWhereUniqueWithoutRegionInput = {
    where: CountyWhereUniqueInput
    update: XOR<CountyUpdateWithoutRegionInput, CountyUncheckedUpdateWithoutRegionInput>
    create: XOR<CountyCreateWithoutRegionInput, CountyUncheckedCreateWithoutRegionInput>
  }

  export type CountyUpdateWithWhereUniqueWithoutRegionInput = {
    where: CountyWhereUniqueInput
    data: XOR<CountyUpdateWithoutRegionInput, CountyUncheckedUpdateWithoutRegionInput>
  }

  export type CountyUpdateManyWithWhereWithoutRegionInput = {
    where: CountyScalarWhereInput
    data: XOR<CountyUpdateManyMutationInput, CountyUncheckedUpdateManyWithoutRegionInput>
  }

  export type CountyScalarWhereInput = {
    AND?: CountyScalarWhereInput | CountyScalarWhereInput[]
    OR?: CountyScalarWhereInput[]
    NOT?: CountyScalarWhereInput | CountyScalarWhereInput[]
    county_id?: IntFilter<"County"> | number
    county_name?: StringFilter<"County"> | string
    region_id?: IntFilter<"County"> | number
  }

  export type InterestedStudentsUpsertWithWhereUniqueWithoutRegionInput = {
    where: InterestedStudentsWhereUniqueInput
    update: XOR<InterestedStudentsUpdateWithoutRegionInput, InterestedStudentsUncheckedUpdateWithoutRegionInput>
    create: XOR<InterestedStudentsCreateWithoutRegionInput, InterestedStudentsUncheckedCreateWithoutRegionInput>
  }

  export type InterestedStudentsUpdateWithWhereUniqueWithoutRegionInput = {
    where: InterestedStudentsWhereUniqueInput
    data: XOR<InterestedStudentsUpdateWithoutRegionInput, InterestedStudentsUncheckedUpdateWithoutRegionInput>
  }

  export type InterestedStudentsUpdateManyWithWhereWithoutRegionInput = {
    where: InterestedStudentsScalarWhereInput
    data: XOR<InterestedStudentsUpdateManyMutationInput, InterestedStudentsUncheckedUpdateManyWithoutRegionInput>
  }

  export type CountryUpsertWithoutRegionInput = {
    update: XOR<CountryUpdateWithoutRegionInput, CountryUncheckedUpdateWithoutRegionInput>
    create: XOR<CountryCreateWithoutRegionInput, CountryUncheckedCreateWithoutRegionInput>
    where?: CountryWhereInput
  }

  export type CountryUpdateToOneWithWhereWithoutRegionInput = {
    where?: CountryWhereInput
    data: XOR<CountryUpdateWithoutRegionInput, CountryUncheckedUpdateWithoutRegionInput>
  }

  export type CountryUpdateWithoutRegionInput = {
    country_name?: StringFieldUpdateOperationsInput | string
    InterestedStudent?: InterestedStudentsUpdateManyWithoutCountryNestedInput
    School?: SchoolUpdateManyWithoutCountryNestedInput
  }

  export type CountryUncheckedUpdateWithoutRegionInput = {
    country_id?: IntFieldUpdateOperationsInput | number
    country_name?: StringFieldUpdateOperationsInput | string
    InterestedStudent?: InterestedStudentsUncheckedUpdateManyWithoutCountryNestedInput
    School?: SchoolUncheckedUpdateManyWithoutCountryNestedInput
  }

  export type SchoolUpsertWithWhereUniqueWithoutRegionInput = {
    where: SchoolWhereUniqueInput
    update: XOR<SchoolUpdateWithoutRegionInput, SchoolUncheckedUpdateWithoutRegionInput>
    create: XOR<SchoolCreateWithoutRegionInput, SchoolUncheckedCreateWithoutRegionInput>
  }

  export type SchoolUpdateWithWhereUniqueWithoutRegionInput = {
    where: SchoolWhereUniqueInput
    data: XOR<SchoolUpdateWithoutRegionInput, SchoolUncheckedUpdateWithoutRegionInput>
  }

  export type SchoolUpdateManyWithWhereWithoutRegionInput = {
    where: SchoolScalarWhereInput
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyWithoutRegionInput>
  }

  export type CityCreateWithoutCountyInput = {
    city_name: string
    School?: SchoolCreateNestedManyWithoutCityInput
  }

  export type CityUncheckedCreateWithoutCountyInput = {
    city_id?: number
    city_name: string
    School?: SchoolUncheckedCreateNestedManyWithoutCityInput
  }

  export type CityCreateOrConnectWithoutCountyInput = {
    where: CityWhereUniqueInput
    create: XOR<CityCreateWithoutCountyInput, CityUncheckedCreateWithoutCountyInput>
  }

  export type CityCreateManyCountyInputEnvelope = {
    data: CityCreateManyCountyInput | CityCreateManyCountyInput[]
    skipDuplicates?: boolean
  }

  export type RegionCreateWithoutCountyInput = {
    region_name: string
    InterestedStudent?: InterestedStudentsCreateNestedManyWithoutRegionInput
    country: CountryCreateNestedOneWithoutRegionInput
    School?: SchoolCreateNestedManyWithoutRegionInput
  }

  export type RegionUncheckedCreateWithoutCountyInput = {
    region_id?: number
    region_name: string
    country_id: number
    InterestedStudent?: InterestedStudentsUncheckedCreateNestedManyWithoutRegionInput
    School?: SchoolUncheckedCreateNestedManyWithoutRegionInput
  }

  export type RegionCreateOrConnectWithoutCountyInput = {
    where: RegionWhereUniqueInput
    create: XOR<RegionCreateWithoutCountyInput, RegionUncheckedCreateWithoutCountyInput>
  }

  export type SchoolCreateWithoutCountyInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactCreateNestedManyWithoutSchoolInput
    Event?: EventCreateNestedManyWithoutSchoolInput
    city: CityCreateNestedOneWithoutSchoolInput
    country: CountryCreateNestedOneWithoutSchoolInput
    region: RegionCreateNestedOneWithoutSchoolInput
    User?: UserCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutCountyInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactUncheckedCreateNestedManyWithoutSchoolInput
    Event?: EventUncheckedCreateNestedManyWithoutSchoolInput
    User?: UserUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutCountyInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutCountyInput, SchoolUncheckedCreateWithoutCountyInput>
  }

  export type SchoolCreateManyCountyInputEnvelope = {
    data: SchoolCreateManyCountyInput | SchoolCreateManyCountyInput[]
    skipDuplicates?: boolean
  }

  export type CityUpsertWithWhereUniqueWithoutCountyInput = {
    where: CityWhereUniqueInput
    update: XOR<CityUpdateWithoutCountyInput, CityUncheckedUpdateWithoutCountyInput>
    create: XOR<CityCreateWithoutCountyInput, CityUncheckedCreateWithoutCountyInput>
  }

  export type CityUpdateWithWhereUniqueWithoutCountyInput = {
    where: CityWhereUniqueInput
    data: XOR<CityUpdateWithoutCountyInput, CityUncheckedUpdateWithoutCountyInput>
  }

  export type CityUpdateManyWithWhereWithoutCountyInput = {
    where: CityScalarWhereInput
    data: XOR<CityUpdateManyMutationInput, CityUncheckedUpdateManyWithoutCountyInput>
  }

  export type CityScalarWhereInput = {
    AND?: CityScalarWhereInput | CityScalarWhereInput[]
    OR?: CityScalarWhereInput[]
    NOT?: CityScalarWhereInput | CityScalarWhereInput[]
    city_id?: IntFilter<"City"> | number
    city_name?: StringFilter<"City"> | string
    county_id?: IntFilter<"City"> | number
  }

  export type RegionUpsertWithoutCountyInput = {
    update: XOR<RegionUpdateWithoutCountyInput, RegionUncheckedUpdateWithoutCountyInput>
    create: XOR<RegionCreateWithoutCountyInput, RegionUncheckedCreateWithoutCountyInput>
    where?: RegionWhereInput
  }

  export type RegionUpdateToOneWithWhereWithoutCountyInput = {
    where?: RegionWhereInput
    data: XOR<RegionUpdateWithoutCountyInput, RegionUncheckedUpdateWithoutCountyInput>
  }

  export type RegionUpdateWithoutCountyInput = {
    region_name?: StringFieldUpdateOperationsInput | string
    InterestedStudent?: InterestedStudentsUpdateManyWithoutRegionNestedInput
    country?: CountryUpdateOneRequiredWithoutRegionNestedInput
    School?: SchoolUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutCountyInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    InterestedStudent?: InterestedStudentsUncheckedUpdateManyWithoutRegionNestedInput
    School?: SchoolUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type SchoolUpsertWithWhereUniqueWithoutCountyInput = {
    where: SchoolWhereUniqueInput
    update: XOR<SchoolUpdateWithoutCountyInput, SchoolUncheckedUpdateWithoutCountyInput>
    create: XOR<SchoolCreateWithoutCountyInput, SchoolUncheckedCreateWithoutCountyInput>
  }

  export type SchoolUpdateWithWhereUniqueWithoutCountyInput = {
    where: SchoolWhereUniqueInput
    data: XOR<SchoolUpdateWithoutCountyInput, SchoolUncheckedUpdateWithoutCountyInput>
  }

  export type SchoolUpdateManyWithWhereWithoutCountyInput = {
    where: SchoolScalarWhereInput
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyWithoutCountyInput>
  }

  export type CountyCreateWithoutCityInput = {
    county_name: string
    region: RegionCreateNestedOneWithoutCountyInput
    School?: SchoolCreateNestedManyWithoutCountyInput
  }

  export type CountyUncheckedCreateWithoutCityInput = {
    county_id?: number
    county_name: string
    region_id: number
    School?: SchoolUncheckedCreateNestedManyWithoutCountyInput
  }

  export type CountyCreateOrConnectWithoutCityInput = {
    where: CountyWhereUniqueInput
    create: XOR<CountyCreateWithoutCityInput, CountyUncheckedCreateWithoutCityInput>
  }

  export type SchoolCreateWithoutCityInput = {
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactCreateNestedManyWithoutSchoolInput
    Event?: EventCreateNestedManyWithoutSchoolInput
    country: CountryCreateNestedOneWithoutSchoolInput
    county: CountyCreateNestedOneWithoutSchoolInput
    region: RegionCreateNestedOneWithoutSchoolInput
    User?: UserCreateNestedManyWithoutSchoolInput
  }

  export type SchoolUncheckedCreateWithoutCityInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    country_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
    Contact?: ContactUncheckedCreateNestedManyWithoutSchoolInput
    Event?: EventUncheckedCreateNestedManyWithoutSchoolInput
    User?: UserUncheckedCreateNestedManyWithoutSchoolInput
  }

  export type SchoolCreateOrConnectWithoutCityInput = {
    where: SchoolWhereUniqueInput
    create: XOR<SchoolCreateWithoutCityInput, SchoolUncheckedCreateWithoutCityInput>
  }

  export type SchoolCreateManyCityInputEnvelope = {
    data: SchoolCreateManyCityInput | SchoolCreateManyCityInput[]
    skipDuplicates?: boolean
  }

  export type CountyUpsertWithoutCityInput = {
    update: XOR<CountyUpdateWithoutCityInput, CountyUncheckedUpdateWithoutCityInput>
    create: XOR<CountyCreateWithoutCityInput, CountyUncheckedCreateWithoutCityInput>
    where?: CountyWhereInput
  }

  export type CountyUpdateToOneWithWhereWithoutCityInput = {
    where?: CountyWhereInput
    data: XOR<CountyUpdateWithoutCityInput, CountyUncheckedUpdateWithoutCityInput>
  }

  export type CountyUpdateWithoutCityInput = {
    county_name?: StringFieldUpdateOperationsInput | string
    region?: RegionUpdateOneRequiredWithoutCountyNestedInput
    School?: SchoolUpdateManyWithoutCountyNestedInput
  }

  export type CountyUncheckedUpdateWithoutCityInput = {
    county_id?: IntFieldUpdateOperationsInput | number
    county_name?: StringFieldUpdateOperationsInput | string
    region_id?: IntFieldUpdateOperationsInput | number
    School?: SchoolUncheckedUpdateManyWithoutCountyNestedInput
  }

  export type SchoolUpsertWithWhereUniqueWithoutCityInput = {
    where: SchoolWhereUniqueInput
    update: XOR<SchoolUpdateWithoutCityInput, SchoolUncheckedUpdateWithoutCityInput>
    create: XOR<SchoolCreateWithoutCityInput, SchoolUncheckedCreateWithoutCityInput>
  }

  export type SchoolUpdateWithWhereUniqueWithoutCityInput = {
    where: SchoolWhereUniqueInput
    data: XOR<SchoolUpdateWithoutCityInput, SchoolUncheckedUpdateWithoutCityInput>
  }

  export type SchoolUpdateManyWithWhereWithoutCityInput = {
    where: SchoolScalarWhereInput
    data: XOR<SchoolUpdateManyMutationInput, SchoolUncheckedUpdateManyWithoutCityInput>
  }

  export type ContactCreateManySchoolInput = {
    contact_id?: number
    contact_email: string
    contact_name?: string | null
    contact_phone?: string | null
    contact_note?: string | null
    createdAt?: Date | string
    active: boolean
    active_by: string
  }

  export type EventCreateManySchoolInput = {
    event_id?: number
    event_name: string
    create_date?: Date | string
    closing_date: Date | string
    event_year: number
    semester: string
    on_duty: string
    event_type: string
    estimated_student: number
    note?: string | null
    slug: string
  }

  export type ContactUpdateWithoutSchoolInput = {
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutSchoolInput = {
    contact_id?: IntFieldUpdateOperationsInput | number
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateManyWithoutSchoolInput = {
    contact_id?: IntFieldUpdateOperationsInput | number
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
  }

  export type EventUpdateWithoutSchoolInput = {
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    User?: UserUpdateManyWithoutEventNestedInput
    InterestedStudents?: InterestedStudentsUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutSchoolInput = {
    event_id?: IntFieldUpdateOperationsInput | number
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    User?: UserUncheckedUpdateManyWithoutEventNestedInput
    InterestedStudents?: InterestedStudentsUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutSchoolInput = {
    event_id?: IntFieldUpdateOperationsInput | number
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutSchoolInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Contact?: ContactUpdateManyWithoutUserNestedInput
    Event?: EventUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutSchoolInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Contact?: ContactUncheckedUpdateManyWithoutUserNestedInput
    Event?: EventUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutSchoolInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
  }

  export type UserUpdateWithoutContactInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Event?: EventUpdateManyWithoutUserNestedInput
    School?: SchoolUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutContactInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Event?: EventUncheckedUpdateManyWithoutUserNestedInput
    School?: SchoolUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutContactInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
  }

  export type ContactUpdateWithoutUserInput = {
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    School?: SchoolUpdateOneWithoutContactNestedInput
  }

  export type ContactUncheckedUpdateWithoutUserInput = {
    contact_id?: IntFieldUpdateOperationsInput | number
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    school_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type ContactUncheckedUpdateManyWithoutUserInput = {
    contact_id?: IntFieldUpdateOperationsInput | number
    contact_email?: StringFieldUpdateOperationsInput | string
    contact_name?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    contact_note?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    school_id?: NullableIntFieldUpdateOperationsInput | number | null
  }

  export type EventUpdateWithoutUserInput = {
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    School?: SchoolUpdateOneRequiredWithoutEventNestedInput
    InterestedStudents?: InterestedStudentsUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateWithoutUserInput = {
    event_id?: IntFieldUpdateOperationsInput | number
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    school_id?: IntFieldUpdateOperationsInput | number
    InterestedStudents?: InterestedStudentsUncheckedUpdateManyWithoutEventNestedInput
  }

  export type EventUncheckedUpdateManyWithoutUserInput = {
    event_id?: IntFieldUpdateOperationsInput | number
    event_name?: StringFieldUpdateOperationsInput | string
    create_date?: DateTimeFieldUpdateOperationsInput | Date | string
    closing_date?: DateTimeFieldUpdateOperationsInput | Date | string
    event_year?: IntFieldUpdateOperationsInput | number
    semester?: StringFieldUpdateOperationsInput | string
    on_duty?: StringFieldUpdateOperationsInput | string
    event_type?: StringFieldUpdateOperationsInput | string
    estimated_student?: IntFieldUpdateOperationsInput | number
    note?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    school_id?: IntFieldUpdateOperationsInput | number
  }

  export type SchoolUpdateWithoutUserInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUpdateManyWithoutSchoolNestedInput
    Event?: EventUpdateManyWithoutSchoolNestedInput
    city?: CityUpdateOneRequiredWithoutSchoolNestedInput
    country?: CountryUpdateOneRequiredWithoutSchoolNestedInput
    county?: CountyUpdateOneRequiredWithoutSchoolNestedInput
    region?: RegionUpdateOneRequiredWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutUserInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUncheckedUpdateManyWithoutSchoolNestedInput
    Event?: EventUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateManyWithoutUserInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
  }

  export type InterestedStudentsCreateManyEventInput = {
    intrest_id?: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    country_id: number
    region_id: number
  }

  export type UserUpdateWithoutEventInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Contact?: ContactUpdateManyWithoutUserNestedInput
    School?: SchoolUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutEventInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    Contact?: ContactUncheckedUpdateManyWithoutUserNestedInput
    School?: SchoolUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateManyWithoutEventInput = {
    user_id?: StringFieldUpdateOperationsInput | string
    user_name?: StringFieldUpdateOperationsInput | string
    nationality?: StringFieldUpdateOperationsInput | string
    user_phone?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    on_duty?: UserUpdateon_dutyInput | number[]
    passwordHash?: StringFieldUpdateOperationsInput | string
    userAuthToken?: StringFieldUpdateOperationsInput | string
    resetToken?: NullableStringFieldUpdateOperationsInput | string | null
    resetTokenExpiry?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
  }

  export type InterestedStudentsUpdateWithoutEventInput = {
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    Country?: CountryUpdateOneRequiredWithoutInterestedStudentNestedInput
    Region?: RegionUpdateOneRequiredWithoutInterestedStudentNestedInput
  }

  export type InterestedStudentsUncheckedUpdateWithoutEventInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type InterestedStudentsUncheckedUpdateManyWithoutEventInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type InterestedStudentsCreateManyCountryInput = {
    intrest_id?: number
    event_id: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    region_id: number
  }

  export type RegionCreateManyCountryInput = {
    region_id?: number
    region_name: string
  }

  export type SchoolCreateManyCountryInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
  }

  export type InterestedStudentsUpdateWithoutCountryInput = {
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    Event?: EventUpdateOneRequiredWithoutInterestedStudentsNestedInput
    Region?: RegionUpdateOneRequiredWithoutInterestedStudentNestedInput
  }

  export type InterestedStudentsUncheckedUpdateWithoutCountryInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type InterestedStudentsUncheckedUpdateManyWithoutCountryInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    region_id?: IntFieldUpdateOperationsInput | number
  }

  export type RegionUpdateWithoutCountryInput = {
    region_name?: StringFieldUpdateOperationsInput | string
    County?: CountyUpdateManyWithoutRegionNestedInput
    InterestedStudent?: InterestedStudentsUpdateManyWithoutRegionNestedInput
    School?: SchoolUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateWithoutCountryInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
    County?: CountyUncheckedUpdateManyWithoutRegionNestedInput
    InterestedStudent?: InterestedStudentsUncheckedUpdateManyWithoutRegionNestedInput
    School?: SchoolUncheckedUpdateManyWithoutRegionNestedInput
  }

  export type RegionUncheckedUpdateManyWithoutCountryInput = {
    region_id?: IntFieldUpdateOperationsInput | number
    region_name?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolUpdateWithoutCountryInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUpdateManyWithoutSchoolNestedInput
    Event?: EventUpdateManyWithoutSchoolNestedInput
    city?: CityUpdateOneRequiredWithoutSchoolNestedInput
    county?: CountyUpdateOneRequiredWithoutSchoolNestedInput
    region?: RegionUpdateOneRequiredWithoutSchoolNestedInput
    User?: UserUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutCountryInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUncheckedUpdateManyWithoutSchoolNestedInput
    Event?: EventUncheckedUpdateManyWithoutSchoolNestedInput
    User?: UserUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateManyWithoutCountryInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CountyCreateManyRegionInput = {
    county_id?: number
    county_name: string
  }

  export type InterestedStudentsCreateManyRegionInput = {
    intrest_id?: number
    event_id: number
    intrest_count: number
    grade: string
    applied: boolean
    work_title: string
    channel: string
    status: string
    country_id: number
  }

  export type SchoolCreateManyRegionInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    county_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
  }

  export type CountyUpdateWithoutRegionInput = {
    county_name?: StringFieldUpdateOperationsInput | string
    city?: CityUpdateManyWithoutCountyNestedInput
    School?: SchoolUpdateManyWithoutCountyNestedInput
  }

  export type CountyUncheckedUpdateWithoutRegionInput = {
    county_id?: IntFieldUpdateOperationsInput | number
    county_name?: StringFieldUpdateOperationsInput | string
    city?: CityUncheckedUpdateManyWithoutCountyNestedInput
    School?: SchoolUncheckedUpdateManyWithoutCountyNestedInput
  }

  export type CountyUncheckedUpdateManyWithoutRegionInput = {
    county_id?: IntFieldUpdateOperationsInput | number
    county_name?: StringFieldUpdateOperationsInput | string
  }

  export type InterestedStudentsUpdateWithoutRegionInput = {
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    Country?: CountryUpdateOneRequiredWithoutInterestedStudentNestedInput
    Event?: EventUpdateOneRequiredWithoutInterestedStudentsNestedInput
  }

  export type InterestedStudentsUncheckedUpdateWithoutRegionInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
  }

  export type InterestedStudentsUncheckedUpdateManyWithoutRegionInput = {
    intrest_id?: IntFieldUpdateOperationsInput | number
    event_id?: IntFieldUpdateOperationsInput | number
    intrest_count?: IntFieldUpdateOperationsInput | number
    grade?: StringFieldUpdateOperationsInput | string
    applied?: BoolFieldUpdateOperationsInput | boolean
    work_title?: StringFieldUpdateOperationsInput | string
    channel?: StringFieldUpdateOperationsInput | string
    status?: StringFieldUpdateOperationsInput | string
    country_id?: IntFieldUpdateOperationsInput | number
  }

  export type SchoolUpdateWithoutRegionInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUpdateManyWithoutSchoolNestedInput
    Event?: EventUpdateManyWithoutSchoolNestedInput
    city?: CityUpdateOneRequiredWithoutSchoolNestedInput
    country?: CountryUpdateOneRequiredWithoutSchoolNestedInput
    county?: CountyUpdateOneRequiredWithoutSchoolNestedInput
    User?: UserUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutRegionInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUncheckedUpdateManyWithoutSchoolNestedInput
    Event?: EventUncheckedUpdateManyWithoutSchoolNestedInput
    User?: UserUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateManyWithoutRegionInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
  }

  export type CityCreateManyCountyInput = {
    city_id?: number
    city_name: string
  }

  export type SchoolCreateManyCountyInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    city_id: number
    country_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
  }

  export type CityUpdateWithoutCountyInput = {
    city_name?: StringFieldUpdateOperationsInput | string
    School?: SchoolUpdateManyWithoutCityNestedInput
  }

  export type CityUncheckedUpdateWithoutCountyInput = {
    city_id?: IntFieldUpdateOperationsInput | number
    city_name?: StringFieldUpdateOperationsInput | string
    School?: SchoolUncheckedUpdateManyWithoutCityNestedInput
  }

  export type CityUncheckedUpdateManyWithoutCountyInput = {
    city_id?: IntFieldUpdateOperationsInput | number
    city_name?: StringFieldUpdateOperationsInput | string
  }

  export type SchoolUpdateWithoutCountyInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUpdateManyWithoutSchoolNestedInput
    Event?: EventUpdateManyWithoutSchoolNestedInput
    city?: CityUpdateOneRequiredWithoutSchoolNestedInput
    country?: CountryUpdateOneRequiredWithoutSchoolNestedInput
    region?: RegionUpdateOneRequiredWithoutSchoolNestedInput
    User?: UserUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutCountyInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUncheckedUpdateManyWithoutSchoolNestedInput
    Event?: EventUncheckedUpdateManyWithoutSchoolNestedInput
    User?: UserUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateManyWithoutCountyInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    city_id?: IntFieldUpdateOperationsInput | number
    country_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
  }

  export type SchoolCreateManyCityInput = {
    school_id?: number
    om_id?: string | null
    school_name: string
    zip_code: string
    address: string
    dir_name?: string | null
    dir_phone?: string | null
    school_email: string
    website?: string | null
    school_type?: SchoolCreateschool_typeInput | string[]
    coop?: boolean | null
    note?: string | null
    country_id: number
    county_id: number
    region_id: number
    duty?: SchoolCreatedutyInput | string[]
    active: boolean
    active_by: string
    basic: boolean
    medior: boolean
    high: boolean
  }

  export type SchoolUpdateWithoutCityInput = {
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUpdateManyWithoutSchoolNestedInput
    Event?: EventUpdateManyWithoutSchoolNestedInput
    country?: CountryUpdateOneRequiredWithoutSchoolNestedInput
    county?: CountyUpdateOneRequiredWithoutSchoolNestedInput
    region?: RegionUpdateOneRequiredWithoutSchoolNestedInput
    User?: UserUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateWithoutCityInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
    Contact?: ContactUncheckedUpdateManyWithoutSchoolNestedInput
    Event?: EventUncheckedUpdateManyWithoutSchoolNestedInput
    User?: UserUncheckedUpdateManyWithoutSchoolNestedInput
  }

  export type SchoolUncheckedUpdateManyWithoutCityInput = {
    school_id?: IntFieldUpdateOperationsInput | number
    om_id?: NullableStringFieldUpdateOperationsInput | string | null
    school_name?: StringFieldUpdateOperationsInput | string
    zip_code?: StringFieldUpdateOperationsInput | string
    address?: StringFieldUpdateOperationsInput | string
    dir_name?: NullableStringFieldUpdateOperationsInput | string | null
    dir_phone?: NullableStringFieldUpdateOperationsInput | string | null
    school_email?: StringFieldUpdateOperationsInput | string
    website?: NullableStringFieldUpdateOperationsInput | string | null
    school_type?: SchoolUpdateschool_typeInput | string[]
    coop?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note?: NullableStringFieldUpdateOperationsInput | string | null
    country_id?: IntFieldUpdateOperationsInput | number
    county_id?: IntFieldUpdateOperationsInput | number
    region_id?: IntFieldUpdateOperationsInput | number
    duty?: SchoolUpdatedutyInput | string[]
    active?: BoolFieldUpdateOperationsInput | boolean
    active_by?: StringFieldUpdateOperationsInput | string
    basic?: BoolFieldUpdateOperationsInput | boolean
    medior?: BoolFieldUpdateOperationsInput | boolean
    high?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}