import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const UserAddressPlain = t.Object(
  {
    id: t.Integer(),
    street: t.String(),
    city: t.String(),
    state: t.String(),
    country: t.String(),
    zipCode: t.String(),
    userId: t.Integer(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const UserAddressRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.Integer(),
        email: t.String(),
        name: t.String(),
        password: t.String(),
        birth: __nullable__(t.Date()),
        gender: __nullable__(t.String()),
        phone: __nullable__(t.String()),
        googleId: __nullable__(t.String()),
        role: t.Union([t.Literal("USER"), t.Literal("ADMIN")], {
          additionalProperties: false,
        }),
        profile_image: __nullable__(t.String()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const UserAddressPlainInputCreate = t.Object(
  {
    street: t.String(),
    city: t.String(),
    state: t.String(),
    country: t.String(),
    zipCode: t.String(),
  },
  { additionalProperties: false },
);

export const UserAddressPlainInputUpdate = t.Object(
  {
    street: t.Optional(t.String()),
    city: t.Optional(t.String()),
    state: t.Optional(t.String()),
    country: t.Optional(t.String()),
    zipCode: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const UserAddressRelationsInputCreate = t.Object(
  {
    user: t.Object(
      {
        connect: t.Object(
          {
            id: t.Integer({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const UserAddressRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
        {
          connect: t.Object(
            {
              id: t.Integer({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const UserAddressWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          street: t.String(),
          city: t.String(),
          state: t.String(),
          country: t.String(),
          zipCode: t.String(),
          userId: t.Integer(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "UserAddress" },
  ),
);

export const UserAddressWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.Integer() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.Integer() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              street: t.String(),
              city: t.String(),
              state: t.String(),
              country: t.String(),
              zipCode: t.String(),
              userId: t.Integer(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "UserAddress" },
);

export const UserAddressSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      street: t.Boolean(),
      city: t.Boolean(),
      state: t.Boolean(),
      country: t.Boolean(),
      zipCode: t.Boolean(),
      userId: t.Boolean(),
      user: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const UserAddressInclude = t.Partial(
  t.Object(
    { user: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const UserAddressOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      street: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      city: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      state: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      country: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      zipCode: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const UserAddress = t.Composite(
  [UserAddressPlain, UserAddressRelations],
  { additionalProperties: false },
);

export const UserAddressInputCreate = t.Composite(
  [UserAddressPlainInputCreate, UserAddressRelationsInputCreate],
  { additionalProperties: false },
);

export const UserAddressInputUpdate = t.Composite(
  [UserAddressPlainInputUpdate, UserAddressRelationsInputUpdate],
  { additionalProperties: false },
);
