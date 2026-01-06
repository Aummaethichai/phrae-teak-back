import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PaymentType = t.Union(
  [
    t.Literal("FULL_PAYMENT"),
    t.Literal("DEPOSIT"),
    t.Literal("REMAINING_BALANCE"),
  ],
  { additionalProperties: false },
);
