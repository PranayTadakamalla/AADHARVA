import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Schema for rural challenges
export const ruralChallenges = pgTable("rural_challenges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  category: text("category").notNull(), // water, agriculture, education, etc.
  description: text("description").notNull(),
  progress: integer("progress").default(0), // percentage of deployment
  communities: integer("communities").default(0),
  growth: integer("growth").default(0),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const insertRuralChallengeSchema = createInsertSchema(ruralChallenges).pick({
  name: true,
  category: true,
  description: true,
  progress: true,
  communities: true,
  growth: true,
});

// Schema for solution deployments
export const deployments = pgTable("deployments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  location: text("location").notNull(),
  lat: text("lat").notNull(),
  lng: text("lng").notNull(),
  type: text("type").notNull(), // water, agriculture, education, etc.
  details: text("details"),
  region: text("region").notNull(),
  active: boolean("active").default(true),
  metrics: jsonb("metrics").default({}),
  created_at: text("created_at").notNull(),
  updated_at: text("updated_at").notNull(),
});

export const insertDeploymentSchema = createInsertSchema(deployments).pick({
  name: true,
  location: true,
  lat: true,
  lng: true,
  type: true,
  details: true,
  region: true,
  active: true,
  metrics: true,
});

// Schema for chat history
export const chatHistory = pgTable("chat_history", {
  id: serial("id").primaryKey(),
  user_message: text("user_message").notNull(),
  assistant_response: text("assistant_response").notNull(),
  timestamp: text("timestamp").notNull(),
});

export const insertChatSchema = createInsertSchema(chatHistory).pick({
  user_message: true,
  assistant_response: true,
  timestamp: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type RuralChallenge = typeof ruralChallenges.$inferSelect;
export type InsertRuralChallenge = z.infer<typeof insertRuralChallengeSchema>;
export type Deployment = typeof deployments.$inferSelect;
export type InsertDeployment = z.infer<typeof insertDeploymentSchema>;
export type ChatEntry = typeof chatHistory.$inferSelect;
export type InsertChatEntry = z.infer<typeof insertChatSchema>;
