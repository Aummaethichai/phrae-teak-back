import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PaymentPlain = t.Object(
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
      [t.Literal("PENDING"), t.Literal("APPROVED"), t.Literal("REJECTED")],
      { additionalProperties: false },
    ),
    slipUrl: __nullable__(t.String()),
    transacRef: __nullable__(t.String()),
    paidAt: __nullable__(t.Date()),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const PaymentRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const PaymentPlainInputCreate = t.Object(
  {
    amount: t.Number(),
    type: t.Union(
      [
        t.Literal("FULL_PAYMENT"),
        t.Literal("DEPOSIT"),
        t.Literal("REMAINING_BALANCE"),
      ],
      { additionalProperties: false },
    ),
    status: t.Optional(
      t.Union(
        [t.Literal("PENDING"), t.Literal("APPROVED"), t.Literal("REJECTED")],
        { additionalProperties: false },
      ),
    ),
    slipUrl: t.Optional(__nullable__(t.String())),
    transacRef: t.Optional(__nullable__(t.String())),
    paidAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PaymentPlainInputUpdate = t.Object(
  {
    amount: t.Optional(t.Number()),
    type: t.Optional(
      t.Union(
        [
          t.Literal("FULL_PAYMENT"),
          t.Literal("DEPOSIT"),
          t.Literal("REMAINING_BALANCE"),
        ],
        { additionalProperties: false },
      ),
    ),
    status: t.Optional(
      t.Union(
        [t.Literal("PENDING"), t.Literal("APPROVED"), t.Literal("REJECTED")],
        { additionalProperties: false },
      ),
    ),
    slipUrl: t.Optional(__nullable__(t.String())),
    transacRef: t.Optional(__nullable__(t.String())),
    paidAt: t.Optional(__nullable__(t.Date())),
  },
  { additionalProperties: false },
);

export const PaymentRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const PaymentRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const PaymentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          slipUrl: t.String(),
          transacRef: t.String(),
          paidAt: t.Date(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Payment" },
  ),
);

export const PaymentWhereUnique = t.Recursive(
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
              slipUrl: t.String(),
              transacRef: t.String(),
              paidAt: t.Date(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Payment" },
);

export const PaymentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      orderId: t.Boolean(),
      order: t.Boolean(),
      amount: t.Boolean(),
      type: t.Boolean(),
      status: t.Boolean(),
      slipUrl: t.Boolean(),
      transacRef: t.Boolean(),
      paidAt: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PaymentInclude = t.Partial(
  t.Object(
    {
      order: t.Boolean(),
      type: t.Boolean(),
      status: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PaymentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      orderId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      amount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      slipUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      transacRef: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      paidAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Payment = t.Composite([PaymentPlain, PaymentRelations], {
  additionalProperties: false,
});

export const PaymentInputCreate = t.Composite(
  [PaymentPlainInputCreate, PaymentRelationsInputCreate],
  { additionalProperties: false },
);

export const PaymentInputUpdate = t.Composite(
  [PaymentPlainInputUpdate, PaymentRelationsInputUpdate],
  { additionalProperties: false },
);
