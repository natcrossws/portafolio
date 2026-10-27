import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProjectDetail from "@/components/ProjectDetail";
import { getProjectContentLocales } from "@/lib/projectContent.server";
import { getProject, projects } from "@/lib/projects";

type PageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ id: project.id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = getProject(id);
  if (!project) return { title: "Proyecto" };
  return {
    title: `${project.title.es} — Nataly Melo`,
    description: project.description.es,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { id } = await params;
  const project = getProject(id);
  if (!project) notFound();
  const bodyByLocale = getProjectContentLocales(id);
  return <ProjectDetail project={project} bodyByLocale={bodyByLocale} />;
}
