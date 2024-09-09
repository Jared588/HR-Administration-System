import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
} from "~/server/api/trpc";

export const employeeRouter = createTRPCRouter({
    updateStatus: publicProcedure
        .input(z.object({ id: z.string(), status: z.enum(['Active', 'Inactive']) }))
        .mutation(async ({ ctx, input }) => {
            const { id, status } = input;

            await ctx.db.employee.update({
                where: { id },
                data: { status },
            })

            return { success: true }
        }),

    getAll: publicProcedure.query(async ({ ctx }) => {
        const employees = await ctx.db.employee.findMany({
            orderBy: { firstName: "asc" },
        });

        return employees;
    }),
});
