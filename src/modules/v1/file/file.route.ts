import { Elysia, t } from "elysia";
import { FileController } from "./file.controller";

const fileController = new FileController();

export const fileRoutes = new Elysia({ prefix: "/files" })
    .get("/:id", async (context) => {
        return fileController.getFile({
            params: context.params,
            set: context.set,
            headers: context.headers as Record<string, string>
        });
    }, {
        params: t.Object({ id: t.String() }),
    });
