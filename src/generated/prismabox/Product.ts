import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProductPlain = t.Object(
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
);

export const ProductRelations = t.Object(
  {
    cartItems: t.Array(
      t.Object(
        {
          id: t.Integer(),
          quantity: t.Integer(),
          userId: t.Integer(),
          productId: t.Integer(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    orderItems: t.Array(
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

export const ProductPlainInputCreate = t.Object(
  {
    name: t.String(),
    description: t.Optional(__nullable__(t.String())),
    price: t.Integer(),
    imageUrl: t.Optional(__nullable__(t.String())),
    stock: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const ProductPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
    price: t.Optional(t.Integer()),
    imageUrl: t.Optional(__nullable__(t.String())),
    stock: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const ProductRelationsInputCreate = t.Object(
  {
    cartItems: t.Optional(
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
    orderItems: t.Optional(
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

export const ProductRelationsInputUpdate = t.Partial(
  t.Object(
    {
      cartItems: t.Partial(
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
      orderItems: t.Partial(
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

export const ProductWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          name: t.String(),
          description: t.String(),
          price: t.Integer(),
          imageUrl: t.String(),
          stock: t.Integer(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Product" },
  ),
);

export const ProductWhereUnique = t.Recursive(
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
              name: t.String(),
              description: t.String(),
              price: t.Integer(),
              imageUrl: t.String(),
              stock: t.Integer(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Product" },
);

export const ProductSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      name: t.Boolean(),
      description: t.Boolean(),
      price: t.Boolean(),
      imageUrl: t.Boolean(),
      stock: t.Boolean(),
      cartItems: t.Boolean(),
      orderItems: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProductInclude = t.Partial(
  t.Object(
    { cartItems: t.Boolean(), orderItems: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ProductOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      name: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      price: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      imageUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      stock: t.Union([t.Literal("asc"), t.Literal("desc")], {
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

export const Product = t.Composite([ProductPlain, ProductRelations], {
  additionalProperties: false,
});

export const ProductInputCreate = t.Composite(
  [ProductPlainInputCreate, ProductRelationsInputCreate],
  { additionalProperties: false },
);

export const ProductInputUpdate = t.Composite(
  [ProductPlainInputUpdate, ProductRelationsInputUpdate],
  { additionalProperties: false },
);
