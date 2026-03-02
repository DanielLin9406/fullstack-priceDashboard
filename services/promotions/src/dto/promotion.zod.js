import { z } from 'zod';

export const createPromotionSchema = {
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    start_date: z.string().datetime().optional(), // Or check valid date string
    end_date: z.string().datetime().optional(),
    on_live: z.enum(['onLive', 'queue']).optional(),
    items: z.array(z.object({
      sku: z.string().min(1),
      price: z.number().optional(), // Assuming price might be part of item, checking usage
      // Add other item fields as needed based on actual usage
    })).min(1, 'At least one item is required')
  })
};

export const updatePromotionSchema = {
  params: z.object({
    id: z.string().min(1)
  }),
  body: z.object({
    name: z.string().min(1).optional(),
    start_date: z.string().datetime().optional(),
    end_date: z.string().datetime().optional(),
    items: z.array(z.object({
      sku: z.string().min(1),
    })).optional()
  })
};
