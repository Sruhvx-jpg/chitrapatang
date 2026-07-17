import { z } from "../../schema";
import { userService } from "../../services";
import {
  registerUserInputModel,
  registerUserOutputModel,
  loginUserInputModel,
  loginUserOutputModel,
  verifyEmailInputModel,
  verifyEmailOutputModel,
} from "@repo/services/user/model";
import { publicProcedure, router } from "../../trpc";
import { generatePath } from "../../server-utils/path-generator";
import { setAuthToken } from "../../server-utils/cookie";
import { SendWelcomeMail } from "@repo/utils";
import { TRPCError } from "@trpc/server";

const TAGS = ["Authentication"];
const getPath = generatePath("/authentication");

export const authRouter = router({
  register: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/register"), tags: TAGS } })
    .input(registerUserInputModel)
    .output(registerUserOutputModel)
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await userService.registerUser(input);
        
        await SendWelcomeMail({
          receiver: result.user.email,
          username: result.user.fullName,
        });

        setAuthToken(ctx, result.accessToken);
        return {
          id: result.user.id,
          username: result.user.fullName,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message || "Failed to register user",
        });
      }
    }),

  login: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/login"), tags: TAGS } })
    .input(loginUserInputModel)
    .output(loginUserOutputModel)
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await userService.loginUser(input);

        if (result.emailVerified && result.accessToken) {
          setAuthToken(ctx, result.accessToken);
        }

        return {
          emailVerified: result.emailVerified,
          fullName: result.fullName,
          email: result.email,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: error.message || "Failed to login user",
        });
      }
    }),

  verifyEmail: publicProcedure
    .meta({ openapi: { method: "POST", path: getPath("/verify-email"), tags: TAGS } })
    .input(verifyEmailInputModel)
    .output(verifyEmailOutputModel)
    .mutation(async ({ input, ctx }) => {
      try {
        const result = await userService.verifyEmail(input);

        if (result.accessToken) {
          setAuthToken(ctx, result.accessToken);
        }

        return {
          fullName: result.fullName,
          email: result.email,
        };
      } catch (error: any) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: error.message || "Failed to verify email",
        });
      }
    }),

  //end 
});
