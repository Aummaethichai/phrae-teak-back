import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const CategoryProductPlain = t.Object(
  {
    id: t.Integer(),
    productId: t.Integer(),
    categoryId: t.Integer(),
    sortOrder: t.Integer(),
    assignedAt: t.Date(),
  },
  { additionalProperties: false },
);

export const CategoryProductRelations = t.Object(
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
        sortOrder: t.Integer(),
        isFeatured: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        isActive: t.Boolean(),
      },
      { additionalProperties: false },
    ),
    category: t.Object(
      {
        id: t.Integer(),
        name: t.String(),
        slug: t.String(),
        isActive: t.Boolean(),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const CategoryProductPlainInputCreate = t.Object(
  { sortOrder: t.Optional(t.Integer()), assignedAt: t.Optional(t.Date()) },
  { additionalProperties: false },
);

export const CategoryProductPlainInputUpdate = t.Object(
  { sortOrder: t.Optional(t.Integer()), assignedAt: t.Optional(t.Date()) },
  { additionalProperties: false },
);

export const CategoryProductRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const CategoryProductRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const CategoryProductWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.Integer(),
          productId: t.Integer(),
          categoryId: t.Integer(),
          sortOrder: t.Integer(),
          assignedAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "CategoryProduct" },
  ),
);

export const CategoryProductWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            {
              id: t.Integer(),
              productId_categoryId: t.Object(
                { productId: t.Integer(), categoryId: t.Integer() },
                { additionalProperties: false },
              ),
            },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [
            t.Object({ id: t.Integer() }),
            t.Object({
              productId_categoryId: t.Object(
                { productId: t.Integer(), categoryId: t.Integer() },
                { additionalProperties: false },
              ),
            }),
          ],
          { additionalProperties: false },
        ),
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
              categoryId: t.Integer(),
              sortOrder: t.Integer(),
              assignedAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "CategoryProduct" },
);

export const CategoryProductSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      productId: t.Boolean(),
      product: t.Boolean(),
      categoryId: t.Boolean(),
      category: t.Boolean(),
      sortOrder: t.Boolean(),
      assignedAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const CategoryProductInclude = t.Partial(
  t.Object(
    { product: t.Boolean(), category: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const CategoryProductOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      productId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      sortOrder: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      assignedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const CategoryProduct = t.Composite(
  [CategoryProductPlain, CategoryProductRelations],
  { additionalProperties: false },
);

export const CategoryProductInputCreate = t.Composite(
  [CategoryProductPlainInputCreate, CategoryProductRelationsInputCreate],
  { additionalProperties: false },
);

export const CategoryProductInputUpdate = t.Composite(
  [CategoryProductPlainInputUpdate, CategoryProductRelationsInputUpdate],
  { additionalProperties: false },
);
