import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProductPlain = t.Object(
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
  },
  { additionalProperties: false },
);

export const ProductRelations = t.Object(
  {
    category: t.Object(
      {
        id: t.Integer(),
        name: t.String(),
        slug: t.String(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    images: t.Array(
      t.Object(
        {
          id: t.Integer(),
          productId: t.Integer(),
          url: t.String(),
          sortOrder: t.Integer(),
          isMain: t.Boolean(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
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
          price: t.Number(),
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
    price: t.Number(),
    stock: t.Optional(t.Integer()),
    isPreorder: t.Optional(t.Boolean()),
    leadTime: t.Optional(__nullable__(t.Integer())),
  },
  { additionalProperties: false },
);

export const ProductPlainInputUpdate = t.Object(
  {
    name: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
    price: t.Optional(t.Number()),
    stock: t.Optional(t.Integer()),
    isPreorder: t.Optional(t.Boolean()),
    leadTime: t.Optional(__nullable__(t.Integer())),
  },
  { additionalProperties: false },
);

export const ProductRelationsInputCreate = t.Object(
  {
    category: t.Object(
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
    images: t.Optional(
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
      category: t.Object(
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
      images: t.Partial(
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
          price: t.Number(),
          stock: t.Integer(),
          isPreorder: t.Boolean(),
          leadTime: t.Integer(),
          categoryId: t.Integer(),
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
              price: t.Number(),
              stock: t.Integer(),
              isPreorder: t.Boolean(),
              leadTime: t.Integer(),
              categoryId: t.Integer(),
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
      stock: t.Boolean(),
      isPreorder: t.Boolean(),
      leadTime: t.Boolean(),
      categoryId: t.Boolean(),
      category: t.Boolean(),
      images: t.Boolean(),
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
    {
      category: t.Boolean(),
      images: t.Boolean(),
      cartItems: t.Boolean(),
      orderItems: t.Boolean(),
      _count: t.Boolean(),
    },
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
      stock: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isPreorder: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      leadTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")], {
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
