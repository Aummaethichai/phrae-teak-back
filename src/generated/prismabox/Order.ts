import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrderPlain = t.Object(
  {
    id: t.Integer(),
    userId: t.Integer(),
    totalPrice: t.Integer(),
    status: t.Union(
      [
        t.Literal("PENDING"),
        t.Literal("PAID"),
        t.Literal("SHIPPED"),
        t.Literal("DELIVERED"),
        t.Literal("CANCELLED"),
      ],
      { additionalProperties: false },
    ),
    createdAt: t.Date(),
    updatedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const OrderRelations = t.Object(
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
    items: t.Array(
      t.Object(
        {
          id: t.Integer(),
          orderId: t.Integer(),
          productId: t.Integer(),
          quantity: t.Integer(),
          price: t.Integer(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const OrderPlainInputCreate = t.Object(
  {
    totalPrice: t.Integer(),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PENDING"),
          t.Literal("PAID"),
          t.Literal("SHIPPED"),
          t.Literal("DELIVERED"),
          t.Literal("CANCELLED"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const OrderPlainInputUpdate = t.Object(
  {
    totalPrice: t.Optional(t.Integer()),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PENDING"),
          t.Literal("PAID"),
          t.Literal("SHIPPED"),
          t.Literal("DELIVERED"),
          t.Literal("CANCELLED"),
        ],
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const OrderRelationsInputCreate = t.Object(
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
    items: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.Integer({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const OrderRelationsInputUpdate = t.Partial(
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
      items: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.Integer({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const OrderWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          userId: t.Integer(),
          totalPrice: t.Integer(),
          status: t.Union(
            [
              t.Literal("PENDING"),
              t.Literal("PAID"),
              t.Literal("SHIPPED"),
              t.Literal("DELIVERED"),
              t.Literal("CANCELLED"),
            ],
            { additionalProperties: false },
          ),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Order" },
  ),
);

export const OrderWhereUnique = t.Recursive(
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
              userId: t.Integer(),
              totalPrice: t.Integer(),
              status: t.Union(
                [
                  t.Literal("PENDING"),
                  t.Literal("PAID"),
                  t.Literal("SHIPPED"),
                  t.Literal("DELIVERED"),
                  t.Literal("CANCELLED"),
                ],
                { additionalProperties: false },
              ),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Order" },
);

export const OrderSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      user: t.Boolean(),
      totalPrice: t.Boolean(),
      status: t.Boolean(),
      items: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const OrderInclude = t.Partial(
  t.Object(
    {
      user: t.Boolean(),
      status: t.Boolean(),
      items: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const OrderOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      totalPrice: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Order = t.Composite([OrderPlain, OrderRelations], {
  additionalProperties: false,
});

export const OrderInputCreate = t.Composite(
  [OrderPlainInputCreate, OrderRelationsInputCreate],
  { additionalProperties: false },
);

export const OrderInputUpdate = t.Composite(
  [OrderPlainInputUpdate, OrderRelationsInputUpdate],
  { additionalProperties: false },
);
