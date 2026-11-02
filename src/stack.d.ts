import type { OxlintConfig } from "oxlint";

export type StackName = "nodejs" | "react" | "fastify" | "node";

export function stack(...names: StackName[]): OxlintConfig[];
