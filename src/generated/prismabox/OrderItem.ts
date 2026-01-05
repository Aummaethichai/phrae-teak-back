import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrderItemPlain = t.Object(
  {
    id: t.Integer(),
    orderId: t.Integer(),
    productId: t.Integer(),
    quantity: t.Integer(),
    price: t.Number(),
  },
  { additionalProperties: false },
);

export const OrderItemRelations = t.Object(
  {
    order: t.Object(
      {
        id: t.Integer(),
        userId: t.Integer(),
        status: t.Union(
          [
            t.Literal("PENDING_PAYMENT"),
            t.Literal("PENDING_DEPOSIT"),
            t.Literal("IN_PRODUCTION"),
            t.Literal("READY_TO_SHIP"),
            t.Literal("COMPLETED"),
            t.Literal("CANCELLED"),
          ],
          { additionalProperties: false },
        ),
        totalPrice: t.Number(),
        depositAmount: __nullable__(t.Number()),
        isDepositPaid: t.Boolean(),
        shippingAddress: t.String(),
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
        price: t.Number(),
        stock: t.Integer(),
        isPreorder: t.Boolean(),
        leadTime: __nullable__(t.Integer()),
        categoryId: t.Integer(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        isActive: t.Boolean(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const OrderItemPlainInputCreate = t.Object(
  { quantity: t.Integer(), price: t.Number() },
  { additionalProperties: false },
);

export const OrderItemPlainInputUpdate = t.Object(
  { quantity: t.Optional(t.Integer()), price: t.Optional(t.Number()) },
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
          price: t.Number(),
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
              price: t.Number(),
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
