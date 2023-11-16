import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>


export const lineItemSchema = z.object({
  id: z.string(),
  imageURL: z.string(),
  size: z.string(),
  color: z.string(),
  price: z.string(),
  count: z.string(),
})
export type LineItem = z.infer<typeof lineItemSchema>