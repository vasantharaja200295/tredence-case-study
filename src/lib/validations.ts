import { z } from "zod";

// Validation schema for Assignee
export const assigneeSchema = z.object({
  name: z.string().min(1, "Assignee name is required"),
  image: z.string().url("Invalid image URL").or(z.literal("")),
});

// Validation schema for Approver
export const approverSchema = z.object({
  name: z.string().min(1, "Approver name is required"),
  image: z.string().url("Invalid image URL").or(z.literal("")),
});

// Validation schema for Auto Approval Config
export const autoApprovalConfigSchema = z.object({
  isActive: z.boolean(),
  threshold: z.number().min(0, "Threshold must be a positive number"),
});

// Validation schema for Action Parameter
export const actionParameterSchema = z.object({
  name: z.string().min(1, "Parameter name is required"),
  value: z.string().min(1, "Parameter value is required"),
});

// Validation schema for Automation Action
export const automationActionSchema = z.object({
  name: z.string().min(1, "Action name is required"),
  params: z.array(actionParameterSchema),
});

// Start Node Validation Schema
export const startNodeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
});

// Task Node Validation Schema
export const taskNodeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),
  assignee: assigneeSchema.refine((data) => data.name !== "", {
    message: "Please select an assignee",
  }),
  dueDate: z.number().refine((date) => date > Date.now(), {
    message: "Due date must be in the future",
  }),
});

// Approval Node Validation Schema
export const approvalNodeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  approver: approverSchema.refine((data) => data.name !== "", {
    message: "Please select an approver",
  }),
  approverRole: z.string().min(1, "Approver role is required"),
  autoApprove: autoApprovalConfigSchema,
});

// Automation Node Validation Schema
export const automationNodeSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),
  action: automationActionSchema.refine((data) => data.name !== "", {
    message: "Please select an action",
  }),
});

// End Node Validation Schema
export const endNodeSchema = z.object({
  message: z
    .string()
    .min(1, "Exit message is required")
    .max(200, "Message must be less than 200 characters"),
  summary: z.boolean(),
});

// Export types inferred from schemas
export type StartNodeFormData = z.infer<typeof startNodeSchema>;
export type TaskNodeFormData = z.infer<typeof taskNodeSchema>;
export type ApprovalNodeFormData = z.infer<typeof approvalNodeSchema>;
export type AutomationNodeFormData = z.infer<typeof automationNodeSchema>;
export type EndNodeFormData = z.infer<typeof endNodeSchema>;
