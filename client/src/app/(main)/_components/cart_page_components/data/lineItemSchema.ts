import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const lineItemSchema = z.object({
  id: z.number(),
  product_name: z.string(),
  imageURL: z.string(),
  size: z.string(),
  color: z.string(),
  price: z.string(),
  quanity: z.string(),
})
export type LineItem = z.infer<typeof lineItemSchema>