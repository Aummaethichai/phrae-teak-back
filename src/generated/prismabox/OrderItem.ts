import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrderItemPlain = t.Object(
  {
    id: t.Integer(),
    orderId: t.Integer(),
    productId: t.Integer(),
    quantity: t.Integer(),
    price: t.Integer(),
  },
  { additionalProperties: false },
);

export const OrderItemRelations = t.Object(
  {
    order: t.Object(
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
    product: t.Object(
      {
        id: t.Integer(),
        name: t.String(),
        description: __nullable__(t.String()),
        price: t.Integer(),
        imageUrl: __nullable__(t.String()),
        stock: t.Integer(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const OrderItemPlainInputCreate = t.Object(
  { quantity: t.Integer(), price: t.Integer() },
  { additionalProperties: false },
);

export const OrderItemPlainInputUpdate = t.Object(
  { quantity: t.Optional(t.Integer()), price: t.Optional(t.Integer()) },
  { additionalProperties: false },
);

export const OrderItemRelationsInputCreate = t.Object(
  {
    order: t.Object(
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
    product: t.Object(
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

export const OrderItemRelationsInputUpdate = t.Partial(
  t.Object(
    {
      order: t.Object(
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
      product: t.Object(
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

export const OrderItemWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          orderId: t.Integer(),
          productId: t.Integer(),
          quantity: t.Integer(),
          price: t.Integer(),
        },
        { additionalProperties: false },
      ),
    { $id: "OrderItem" },
  ),
);

export const OrderItemWhereUnique = t.Recursive(
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
              orderId: t.Integer(),
              productId: t.Integer(),
              quantity: t.Integer(),
              price: t.Integer(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "OrderItem" },
);

export const OrderItemSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      orderId: t.Boolean(),
      order: t.Boolean(),
      productId: t.Boolean(),
      product: t.Boolean(),
      quantity: t.Boolean(),
      price: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const OrderItemInclude = t.Partial(
  t.Object(
    { order: t.Boolean(), product: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const OrderItemOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      orderId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      productId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      quantity: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      price: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const OrderItem = t.Composite([OrderItemPlain, OrderItemRelations], {
  additionalProperties: false,
});

export const OrderItemInputCreate = t.Composite(
  [OrderItemPlainInputCreate, OrderItemRelationsInputCreate],
  { additionalProperties: false },
);

export const OrderItemInputUpdate = t.Composite(
  [OrderItemPlainInputUpdate, OrderItemRelationsInputUpdate],
  { additionalProperties: false },
);
