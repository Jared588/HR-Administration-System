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

    createEmployee: publicProcedure
        .input(z.object({
            firstName: z.string(),
            lastName: z.string(),
            tel: z.string(),
            email: z.string(),
            manager: z.string(),
            status: z.enum(['Active', 'Inactive']),
        }))
        .mutation(async ({ ctx, input }) => {
            const { firstName, lastName, tel, email, manager, status } = input;
            await ctx.db.employee.create({
                data: { firstName, lastName, tel, email, manager, status },
            })
            await ctx.db.user.create({
                data: { name: `${firstName} ${lastName}`, email: email, password: "Password123#", type: "employee" },
            })

            return { success: true }
        }),

    getEmployee: publicProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ ctx, input }) => {
            const { id } = input;

            const employee = await ctx.db.employee.findUnique({
                where: { id },
            })

            return employee;
        }),

    updateEmployee: publicProcedure
        .input(z.object({
            id: z.string(),
            firstName: z.string(),
            lastName: z.string(),
            tel: z.string(),
            email: z.string(),
            manager: z.string(),
            status: z.enum(['Active', 'Inactive']),
        }))
        .mutation(async ({ ctx, input }) => {
            const { id, firstName, lastName, tel, email, manager, status } = input;
            await ctx.db.employee.update({
                where: { id },
                data: { firstName, lastName, tel, email, manager, status },
            })

            return { success: true }
        }),
});

