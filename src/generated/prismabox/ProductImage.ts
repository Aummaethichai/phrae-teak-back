import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProductImagePlain = t.Object(
  {
    id: t.Integer(),
    productId: t.Integer(),
    url: t.String(),
    sortOrder: t.Integer(),
    isMain: t.Boolean(),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ProductImageRelations = t.Object(
  {
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

export const ProductImagePlainInputCreate = t.Object(
  {
    url: t.String(),
    sortOrder: t.Optional(t.Integer()),
    isMain: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const ProductImagePlainInputUpdate = t.Object(
  {
    url: t.Optional(t.String()),
    sortOrder: t.Optional(t.Integer()),
    isMain: t.Optional(t.Boolean()),
  },
  { additionalProperties: false },
);

export const ProductImageRelationsInputCreate = t.Object(
  {
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

export const ProductImageRelationsInputUpdate = t.Partial(
  t.Object(
    {
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

export const ProductImageWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          productId: t.Integer(),
          url: t.String(),
          sortOrder: t.Integer(),
          isMain: t.Boolean(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "ProductImage" },
  ),
);

export const ProductImageWhereUnique = t.Recursive(
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
              productId: t.Integer(),
              url: t.String(),
              sortOrder: t.Integer(),
              isMain: t.Boolean(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "ProductImage" },
);

export const ProductImageSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      productId: t.Boolean(),
      product: t.Boolean(),
      url: t.Boolean(),
      sortOrder: t.Boolean(),
      isMain: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProductImageInclude = t.Partial(
  t.Object(
    { product: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ProductImageOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      productId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      url: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      sortOrder: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isMain: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const ProductImage = t.Composite(
  [ProductImagePlain, ProductImageRelations],
  { additionalProperties: false },
);

export const ProductImageInputCreate = t.Composite(
  [ProductImagePlainInputCreate, ProductImageRelationsInputCreate],
  { additionalProperties: false },
);

export const ProductImageInputUpdate = t.Composite(
  [ProductImagePlainInputUpdate, ProductImageRelationsInputUpdate],
  { additionalProperties: false },
);
