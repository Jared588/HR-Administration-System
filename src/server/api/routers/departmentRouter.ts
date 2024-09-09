import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const departmentRouter = createTRPCRouter({
    updateStatus: publicProcedure
        .input(z.object({ id: z.string(), status: z.enum(['Active', 'Inactive']) }))
        .mutation(async ({ ctx, input }) => {
            const { id, status } = input;

            await ctx.db.department.update({
                where: { id },
                data: { status },
            })

            return { success: true }
        }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const departments = await ctx.db.department.findMany({
            orderBy: { name: "asc" },
        });

        return departments;
    }),
});
