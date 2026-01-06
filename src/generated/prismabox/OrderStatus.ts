import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const OrderStatus = t.Union(
  [
    t.Literal("PENDING_PAYMENT"),
    t.Literal("PENDING_DEPOSIT"),
    t.Literal("IN_PRODUCTION"),
    t.Literal("READY_TO_SHIP"),
    t.Literal("COMPLETED"),
    t.Literal("CANCELLED"),
  ],
  { additionalProperties: false },
);
