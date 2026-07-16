import { z } from "../../schema";
import { userService } from "../../services";
import { registerUserInputModel, registerUserOutputModel } from "@repo/services/user/model";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../server-utils/path-generator";
import { setAuthToken } from "../../server-utils/cookie";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  register: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/register"), tags: TAGS } })
    .input(registerUserInputModel)
    .output(registerUserOutputModel)
    .mutation(async ({ input, ctx }) => {
      const result = await userService.registerUser(input);
      setAuthToken(ctx, result.accessToken);
      return result;
    }),
});
