import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrderPlain = t.Object(
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
);

export const OrderRelations = t.Object(
  {
    user: t.Object(
      {
        id: t.Integer(),
        email: t.String(),
        name: __nullable__(t.String()),
        password: t.String(),
        birth: __nullable__(t.Date()),
        gender: __nullable__(t.String()),
        phone: __nullable__(t.String()),
        googleId: __nullable__(t.String()),
        role: t.Union([t.Literal("USER"), t.Literal("ADMIN")], {
          additionalProperties: false,
        }),
        profileImage: __nullable__(t.String()),
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
          price: t.Number(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    payments: t.Array(
      t.Object(
        {
          id: t.Integer(),
          orderId: t.Integer(),
          amount: t.Number(),
          type: t.Union(
            [
              t.Literal("FULL_PAYMENT"),
              t.Literal("DEPOSIT"),
              t.Literal("REMAINING_BALANCE"),
            ],
            { additionalProperties: false },
          ),
          status: t.Union(
            [
              t.Literal("PENDING"),
              t.Literal("APPROVED"),
              t.Literal("REJECTED"),
            ],
            { additionalProperties: false },
          ),
          slipUrl: __nullable__(t.String()),
          transacRef: __nullable__(t.String()),
          paidAt: __nullable__(t.Date()),
          createdAt: t.Date(),
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
    status: t.Optional(
      t.Union(
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
    ),
    totalPrice: t.Number(),
    depositAmount: t.Optional(__nullable__(t.Number())),
    shippingAddress: t.String(),
  },
  { additionalProperties: false },
);

export const OrderPlainInputUpdate = t.Object(
  {
    status: t.Optional(
      t.Union(
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
    ),
    totalPrice: t.Optional(t.Number()),
    depositAmount: t.Optional(__nullable__(t.Number())),
    shippingAddress: t.Optional(t.String()),
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
    payments: t.Optional(
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
      payments: t.Partial(
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
          depositAmount: t.Number(),
          isDepositPaid: t.Boolean(),
          shippingAddress: t.String(),
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
              depositAmount: t.Number(),
              isDepositPaid: t.Boolean(),
              shippingAddress: t.String(),
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
      status: t.Boolean(),
      totalPrice: t.Boolean(),
      depositAmount: t.Boolean(),
      isDepositPaid: t.Boolean(),
      shippingAddress: t.Boolean(),
      items: t.Boolean(),
      payments: t.Boolean(),
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
      payments: t.Boolean(),
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
      depositAmount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isDepositPaid: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      shippingAddress: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
